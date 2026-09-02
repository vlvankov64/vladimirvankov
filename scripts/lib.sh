# Shared helpers for the scripts in this directory. Sourced, not executed.
#
# Everything site-specific comes from site.config.json at the repo root — pointing the
# framework at a different target is one edit to that file.

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG="$ROOT/site.config.json"

# Read one top-level string field out of site.config.json. python3 ships with macOS;
# jq does not, so it is not assumed.
config_value() {
  python3 -c 'import json,sys; print(json.load(open(sys.argv[1])).get(sys.argv[2], ""))' \
    "$CONFIG" "$1"
}

# Origin of the site being cloned. Overridable for a one-off run: ORIGIN=… ./scripts/…
origin() {
  if [ -n "${ORIGIN:-}" ]; then
    echo "$ORIGIN"
    return
  fi
  local value
  value="$(config_value origin)"
  if [ -z "$value" ]; then
    echo "site.config.json has no \"origin\" — set it before scraping." >&2
    exit 1
  fi
  echo "$value"
}

# Strip blank lines and # comments from a list file (routes.txt, assets.txt).
read_list() {
  sed -e 's/[[:space:]]*#.*$//' -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' "$1" |
    grep -v '^$' || true
}

# /products/some-thing -> products__some-thing ; / -> index
route_slug() {
  if [ "$1" = "/" ]; then
    echo index
  else
    echo "${1#/}" | tr '/' '_' | sed 's/_/__/g'
  fi
}
