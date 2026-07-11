#!/usr/bin/env bash
set -u

failures=0
warnings=0

ok()   { printf 'OK   %s\n' "$1"; }
warn() { printf 'WARN %s\n' "$1"; warnings=$((warnings + 1)); }
fail() { printf 'FAIL %s\n' "$1"; failures=$((failures + 1)); }

printf '\nCodeLab startup check\n'
printf '=====================\n\n'

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  fail "Current directory is not inside a Git repository."
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
repo_name="$(basename "$repo_root")"
current_branch="$(git branch --show-current 2>/dev/null || true)"
origin_url="$(git remote get-url origin 2>/dev/null || true)"

ok "Repository root: $repo_root"
ok "Repository name: $repo_name"
[[ -n "$current_branch" ]] && ok "Current branch: $current_branch" || warn "Detached HEAD or branch unknown."
[[ -n "$origin_url" ]] && ok "Origin: $origin_url" || warn "No origin remote is configured."

for item in README.md AGENTS.md; do
  [[ -f "$repo_root/$item" ]] && ok "Required file exists: $item" || fail "Missing required file: $item"
done

for item in spec General Archive_To_Move; do
  [[ -d "$repo_root/$item" ]] && ok "Expected directory exists: $item/" || warn "Missing expected directory: $item/"
done

if git diff --quiet && git diff --cached --quiet; then
  ok "No modified tracked files."
else
  warn "Tracked files have uncommitted changes."
fi

untracked_count="$(git ls-files --others --exclude-standard | wc -l | tr -d ' ')"
[[ "$untracked_count" -eq 0 ]] && ok "No untracked files." || warn "$untracked_count untracked file(s) found."

conflicts="$(git diff --name-only --diff-filter=U)"
if [[ -z "$conflicts" ]]; then
  ok "No merge conflicts."
else
  fail "Merge conflicts detected:"
  printf '%s\n' "$conflicts"
fi

if git rev-parse --verify '@{upstream}' >/dev/null 2>&1; then
  upstream="$(git rev-parse --abbrev-ref '@{upstream}')"
  counts="$(git rev-list --left-right --count HEAD..."$upstream" 2>/dev/null || echo '0 0')"
  ahead="$(awk '{print $1}' <<<"$counts")"
  behind="$(awk '{print $2}' <<<"$counts")"
  ok "Upstream: $upstream"
  [[ "$ahead" -gt 0 ]] && warn "Local branch is ahead by $ahead commit(s)."
  [[ "$behind" -gt 0 ]] && warn "Local branch is behind by $behind commit(s)."
else
  warn "Current branch has no upstream tracking branch."
fi

printf '\nSummary\n-------\nFailures: %s\nWarnings: %s\n' "$failures" "$warnings"
[[ "$failures" -gt 0 ]] && exit 1
exit 0
