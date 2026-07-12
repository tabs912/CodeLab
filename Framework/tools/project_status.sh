#!/usr/bin/env bash
set -u
project="${1:-}"
[[ -n "$project" ]] || { echo "Usage: ./Framework/tools/project_status.sh Project_Name"; exit 1; }
echo "Project: $project"
for d in Current_Production Reports Audit_Summary spec prompts scripts Archive; do
  [[ -d "$project/$d" ]] && echo "OK   $project/$d/" || echo "WARN Missing $project/$d/"
done
