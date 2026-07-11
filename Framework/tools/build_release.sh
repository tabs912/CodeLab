#!/usr/bin/env bash
set -euo pipefail
version="${1:-}"
[[ -n "$version" ]] || { echo "Usage: ./Framework/tools/build_release.sh vX.XX.XX"; exit 1; }
out="CodeLab_Framework_${version}.zip"
zip -r "$out" Framework >/dev/null
echo "Created $out"
