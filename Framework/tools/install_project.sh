#!/usr/bin/env bash
set -euo pipefail
project="${1:-}"
[[ -d "$project" ]] || { echo "Project folder not found." >&2; exit 1; }
mkdir -p "$project/prompts" "$project/spec"
echo "Project prepared to inherit CodeLab Framework standards."
