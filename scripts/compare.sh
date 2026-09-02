#!/usr/bin/env bash
# Screenshot the target site next to the local rebuild and write a comparison sheet
# to reference/compare/index.html.
#
#   ./scripts/compare.sh                 # every route in scripts/routes.txt
#   ./scripts/compare.sh /about/vision   # one route
#   ./scripts/compare.sh /about /news    # several
#
# Needs the dev server up (./bin/dev up) — the screenshot container reaches it over
# the compose network as http://web:3000.
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"
cd "$ROOT"

TARGET="$(origin)"

if ! docker compose ps --status running --services 2>/dev/null | grep -qx web; then
  echo "Dev server is not running. Start it with ./bin/dev up" >&2
  exit 1
fi

mkdir -p reference/compare

if [ "$#" -gt 0 ]; then
  echo "Comparing $* against ${TARGET}…"
else
  echo "Comparing all $(read_list scripts/routes.txt | grep -c . || true) routes against ${TARGET}…"
fi

docker compose --profile tools run --rm -e "ORIGIN=$TARGET" shots node scripts/compare.mjs "$@"

echo
echo "Open: reference/compare/index.html"
