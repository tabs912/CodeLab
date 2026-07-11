#!/usr/bin/env bash
set -euo pipefail
name="${1:-}"
[[ -n "$name" ]] || { echo "Usage: ./Framework/tools/create_project.sh Project_Name"; exit 1; }
for d in Current_Production Reports Audit_Summary spec prompts scripts Archive; do mkdir -p "$name/$d"; done
cp Framework/Templates/Project_README_Template.md "$name/README.md"
echo "Created $name/"
