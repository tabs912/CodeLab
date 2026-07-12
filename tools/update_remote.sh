#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  printf 'Not inside a Git repository.\n' >&2
  exit 1
fi

new_url="${1:-}"
if [[ -z "$new_url" ]]; then
  printf 'Usage:\n  ./tools/update_remote.sh https://github.com/OWNER/REPOSITORY.git\n'
  exit 1
fi

if git remote get-url origin >/dev/null 2>&1; then
  printf 'Current origin: %s\n' "$(git remote get-url origin)"
  git remote set-url origin "$new_url"
else
  printf 'No origin remote exists. Creating origin.\n'
  git remote add origin "$new_url"
fi

printf 'Updated origin: %s\n' "$(git remote get-url origin)"

if git ls-remote --exit-code origin HEAD >/dev/null 2>&1; then
  printf 'Remote access succeeded.\n'
else
  printf 'Warning: URL updated, but remote access could not be verified.\n' >&2
  exit 2
fi

git remote -v
