#!/usr/bin/env bash
set -euo pipefail
project="${1:-}"
[[ -d "$project" ]] || { echo "Project folder not found." >&2; exit 1; }
echo "Framework updates are centralized under Framework/. No project code was changed."
