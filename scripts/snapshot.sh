#!/usr/bin/env bash
# Snapshot the target site's HTML for every route in scripts/routes.txt into
# reference/raw/.
#
# These snapshots are the primary source material for the port: section order, copy,
# and — when the target ships utility classes in its markup — the class names and
# breakpoints too. Read them rather than guessing from screenshots.
#
# Output is gitignored and reproducible. Re-run whenever the target changes.
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

TARGET="$(origin)"
OUT="$ROOT/reference/raw"
ROUTES="$ROOT/scripts/routes.txt"

routes="$(read_list "$ROUTES")"
if [ -z "$routes" ]; then
  echo "scripts/routes.txt is empty — inventory the target's routes first (docs/routes.md)." >&2
  exit 1
fi

mkdir -p "$OUT"
fail=0
total=0

while read -r route; do
  [ -z "$route" ] && continue
  total=$((total + 1))
  file="$OUT/$(route_slug "$route").html"

  code=$(curl -sS -o "$file" -w '%{http_code}' "$TARGET$route")
  bytes=$(wc -c <"$file" | tr -d ' ')

  if [ "$code" != "200" ] || [ "$bytes" -lt 1000 ]; then
    printf '  FAIL %-4s %-9s %s\n' "$code" "$bytes" "$route"
    fail=$((fail + 1))
  else
    printf '  ok   %-4s %-9s %s\n' "$code" "$bytes" "$route"
  fi
done <<<"$routes"

echo
echo "Snapshotted $((total - fail))/$total routes from $TARGET into reference/raw/"
[ "$fail" -eq 0 ] || {
  echo "$fail route(s) failed" >&2
  exit 1
}
