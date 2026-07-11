#!/usr/bin/env bash
set -u

failures=0
warnings=0

ok()   { printf 'OK   %s\n' "$1"; }
warn() { printf 'WARN %s\n' "$1"; warnings=$((warnings + 1)); }
fail() { printf 'FAIL %s\n' "$1"; failures=$((failures + 1)); }

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  fail "Current directory is not inside a Git repository."
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root" || exit 1

printf '\nCodeLab maintenance check\n=========================\n\n'

if git fsck --no-progress >/tmp/codelab_git_fsck.log 2>&1; then
  ok "Git object database passed integrity check."
else
  fail "Git integrity check reported problems. Review /tmp/codelab_git_fsck.log"
fi

if git fetch --all --prune; then
  ok "Fetched remotes and pruned stale references."
else
  warn "Remote fetch/prune failed."
fi

for item in README.md AGENTS.md; do
  [[ -f "$item" ]] && ok "$item exists." || fail "$item is missing."
done

for item in spec General Archive_To_Move; do
  [[ -d "$item" ]] && ok "$item/ exists." || warn "$item/ is missing."
done

binary_pattern='\.(pdf|xlsx|xls|docx|pptx|png|jpg|jpeg|gif|zip)$'
tracked_binaries="$(git ls-files | grep -Ei "$binary_pattern" || true)"
if [[ -z "$tracked_binaries" ]]; then
  ok "No tracked binary files matched the binary policy."
else
  warn "Tracked binary files found:"
  printf '%s\n' "$tracked_binaries"
fi

conflicts="$(git diff --name-only --diff-filter=U)"
if [[ -z "$conflicts" ]]; then
  ok "No merge conflicts."
else
  fail "Merge conflicts detected:"
  printf '%s\n' "$conflicts"
fi

printf '\nBranch summary\n'
git branch -vv || warn "Unable to display branch summary."

printf '\nWorktree status\n'
git status -sb

printf '\nSummary\n-------\nFailures: %s\nWarnings: %s\n' "$failures" "$warnings"
[[ "$failures" -gt 0 ]] && exit 1
exit 0
