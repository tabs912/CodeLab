#!/usr/bin/env bash
set -u
project="${1:-}"
[[ -n "$project" ]] || { echo "Usage: ./Framework/tools/review_project.sh Project_Name"; exit 1; }
./Framework/tools/project_status.sh "$project"
echo "Use Framework/prompts/Reviews/Standard_Review.md or a project-specific prompt."
