#!/usr/bin/env bash
set -u

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  printf 'Not inside a Git repository.\n' >&2
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
branch="$(git branch --show-current 2>/dev/null || true)"
origin="$(git remote get-url origin 2>/dev/null || true)"
upstream="$(git rev-parse --abbrev-ref '@{upstream}' 2>/dev/null || true)"
last_commit="$(git log -1 --pretty=format:'%h %ad %s' --date=short 2>/dev/null || true)"

printf '\nRepository status\n=================\n'
printf 'Root:        %s\n' "$repo_root"
printf 'Branch:      %s\n' "${branch:-DETACHED}"
printf 'Origin:      %s\n' "${origin:-NOT CONFIGURED}"
printf 'Upstream:    %s\n' "${upstream:-NOT CONFIGURED}"
printf 'Last commit: %s\n\n' "${last_commit:-NONE}"

git status -sb
