#!/usr/bin/env bash
set -euo pipefail
url="${1:-}"
[[ -n "$url" ]] || { echo "Usage: ./Framework/tools/update_remote.sh <url>"; exit 1; }
git remote get-url origin >/dev/null 2>&1 && git remote set-url origin "$url" || git remote add origin "$url"
git ls-remote --exit-code origin HEAD >/dev/null
git remote -v
