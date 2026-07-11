#!/usr/bin/env bash
set -euo pipefail
project="${1:-}"
[[ -n "$project" ]] || { echo "Usage: ./tools/review_project.sh Project_Name"; exit 1; }
echo "Project: $project"
for d in Current_Production Reports Audit_Summary spec scripts Archive; do
  [[ -d "$project/$d" ]] && echo "OK   $project/$d/" || echo "WARN Missing $project/$d/"
done
