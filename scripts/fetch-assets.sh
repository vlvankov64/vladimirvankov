#!/usr/bin/env bash
# Download the target site's static media into public/.
#
# Two line forms are accepted in scripts/assets.txt:
#
#   /assets/photo.jpg                     same-origin path, mirrored verbatim to
#                                         public/assets/photo.jpg
#   https://cdn.example/x/photo.jpg?w=2500  absolute URL (a CDN-hosted site), saved to
#                                         public/assets/<basename> with the query
#                                         stripped from the name but used for the fetch
#
# The first form keeps ported markup working unchanged for a same-origin target; the
# second is what a Squarespace/Wix/Webflow target needs, where every image lives on an
# image CDN and the query string selects a rendition. Basenames must be unique — the
# script refuses to overwrite one file with another.
#
# Unlike the HTML snapshots these ARE committed — they are the real media the rebuilt
# site ships. Skips files already present; pass --force to re-download.
#
# The list lives in scripts/assets.txt. Regenerate it after each re-snapshot, widening
# the pattern to whatever path prefixes the target actually uses (a CMS tree such as
# /uploads/ is easy to miss when only the obvious /assets/ is grepped):
#
#   grep -ohE '(%2F|/)(assets|uploads|images|media|static)(%2F|/)[A-Za-z0-9._%/()+-]+' \
#     reference/raw/*.html | sed 's/%2F/\//g' | sort -u > scripts/assets.txt
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

TARGET="$(origin)"
OUT="$ROOT/public"
LIST="$ROOT/scripts/assets.txt"
FORCE="${1:-}"

assets="$(read_list "$LIST")"
if [ -z "$assets" ]; then
  echo "scripts/assets.txt is empty — derive it from the snapshots (see the header above)." >&2
  exit 1
fi

fail=0

declare -a seen_names=()

while read -r asset; do
  [ -z "$asset" ] && continue

  case "$asset" in
    http://* | https://*)
      url="$asset"
      # Strip the query, percent-decode, and reduce the basename to URL-safe characters.
      # The local name is ours to choose for a CDN-hosted file (nothing links to it by
      # path), and a name carrying %28 or a space is a trap in an <Image src>.
      name="$(python3 -c 'import os,re,sys,urllib.parse
raw = os.path.basename(urllib.parse.unquote(sys.argv[1].split("?")[0]))
stem, dot, ext = raw.rpartition(".")
safe = re.sub(r"-+", "-", re.sub(r"[^A-Za-z0-9._-]", "-", stem or raw)).strip("-.")
print(f"{safe}{dot}{ext.lower()}")' "$asset")"
      rel="/assets/$name"
      for prev in ${seen_names[@]+"${seen_names[@]}"}; do
        if [ "$prev" = "$name" ]; then
          echo "  FAIL basename collision: two sources both map to /assets/$name" >&2
          fail=$((fail + 1))
          continue 2
        fi
      done
      seen_names+=("$name")
      ;;
    /*)
      url="$TARGET$asset"
      rel="$asset"
      ;;
    *)
      echo "  FAIL not a path or URL: $asset" >&2
      fail=$((fail + 1))
      continue
      ;;
  esac

  file="$OUT$rel"

  if [ -s "$file" ] && [ "$FORCE" != "--force" ]; then
    printf '  skip %-9s %s\n' "$(wc -c <"$file" | tr -d ' ')" "$rel"
    continue
  fi

  mkdir -p "$(dirname "$file")"
  code=$(curl -sS -o "$file" -w '%{http_code}' "$url")
  bytes=$(wc -c <"$file" | tr -d ' ')

  if [ "$code" != "200" ] || [ "$bytes" -lt 100 ]; then
    printf '  FAIL %-4s %-9s %s\n' "$code" "$bytes" "$rel"
    rm -f "$file"
    fail=$((fail + 1))
  else
    printf '  ok   %-4s %-9s %s\n' "$code" "$bytes" "$rel"
  fi
done <<<"$assets"

echo
echo "Next: ./bin/dev optimize   (downscale and recompress what was just downloaded)"
printf 'public: %3s files  %s\n' \
  "$(find "$OUT" -type f 2>/dev/null | wc -l | tr -d ' ')" \
  "$(du -sh "$OUT" 2>/dev/null | cut -f1)"
[ "$fail" -eq 0 ] || {
  echo "$fail asset(s) failed" >&2
  exit 1
}
