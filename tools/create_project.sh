#!/usr/bin/env bash
set -euo pipefail
name="${1:-}"
[[ -n "$name" ]] || { echo "Usage: ./tools/create_project.sh Project_Name"; exit 1; }
for d in Current_Production Reports Audit_Summary spec scripts Archive; do mkdir -p "$name/$d"; done
[[ -f Templates/Project_README_Template.md ]] && cp Templates/Project_README_Template.md "$name/README.md" || touch "$name/README.md"
echo "Created project structure: $name/"
