#!/usr/bin/env bash
set -euo pipefail
project="${1:-}"; version="${2:-}"
[[ -n "$project" && -n "$version" ]] || { echo "Usage: ./tools/new_release.sh Project_Name vX.XX.XX"; exit 1; }
mkdir -p "$project/Audit_Summary"
file="$project/Audit_Summary/Release_Notes_${version}.md"
[[ -f Templates/Release_Notes_Template.md ]] && cp Templates/Release_Notes_Template.md "$file" || touch "$file"
sed -i "s/<Version>/$version/g" "$file" 2>/dev/null || true
echo "Created: $file"
