#!/usr/bin/env bash
set -euo pipefail
ok(){ printf 'OK   %s\n' "$1"; }
warn(){ printf 'WARN %s\n' "$1"; }
fail(){ printf 'FAIL %s\n' "$1" >&2; }

printf '\nCodeLab workspace synchronization\n=================================\n\n'
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { fail "Not inside a Git repository."; exit 1; }
root="$(git rev-parse --show-toplevel)"; cd "$root"
branch="$(git branch --show-current)"
origin="$(git remote get-url origin 2>/dev/null || true)"
ok "Repository root: $root"
ok "Current branch: ${branch:-DETACHED}"
[[ -n "$origin" ]] || { fail "No origin configured."; exit 1; }
ok "Origin: $origin"
[[ -n "$branch" ]] || { fail "Detached HEAD."; exit 1; }

if ! git diff --quiet || ! git diff --cached --quiet; then
  warn "Tracked files contain uncommitted changes."
  git status -sb
  echo "Commit or stash tracked changes before syncing."
  exit 2
fi

git fetch origin --prune
ok "Remote references updated."
remote="origin/$branch"
git show-ref --verify --quiet "refs/remotes/$remote" || { fail "Remote branch $remote does not exist."; git branch -r; exit 3; }
counts="$(git rev-list --left-right --count HEAD..."$remote")"
ahead="$(awk '{print $1}' <<<"$counts")"
behind="$(awk '{print $2}' <<<"$counts")"
printf '\nAhead: %s\nBehind: %s\n' "$ahead" "$behind"
[[ "$ahead" -gt 0 && "$behind" -gt 0 ]] && { fail "Branches diverged."; exit 4; }
[[ "$ahead" -gt 0 ]] && { warn "Local branch is ahead. No pull needed."; exit 0; }
[[ "$behind" -eq 0 ]] && { ok "Workspace is already current."; exit 0; }
git merge --ff-only "$remote"
ok "Workspace updated successfully."
git status -sb
