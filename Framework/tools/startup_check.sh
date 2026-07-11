#!/usr/bin/env bash
set -u
failures=0; warnings=0
ok(){ printf 'OK   %s\n' "$1"; }
warn(){ printf 'WARN %s\n' "$1"; warnings=$((warnings+1)); }
fail(){ printf 'FAIL %s\n' "$1"; failures=$((failures+1)); }

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { fail "Not inside a Git repository."; exit 1; }
root="$(git rev-parse --show-toplevel)"
branch="$(git branch --show-current 2>/dev/null || true)"
origin="$(git remote get-url origin 2>/dev/null || true)"
ok "Repository root: $root"
[[ -n "$branch" ]] && ok "Current branch: $branch" || warn "Detached HEAD."
[[ -n "$origin" ]] && ok "Origin: $origin" || warn "No origin remote."
for f in README.md AGENTS.md; do [[ -f "$root/$f" ]] && ok "$f exists." || fail "$f missing."; done
for d in Framework General Archive_To_Move; do [[ -d "$root/$d" ]] && ok "$d/ exists." || warn "$d/ missing."; done
git diff --quiet && git diff --cached --quiet && ok "No modified tracked files." || warn "Tracked files have changes."
printf 'Failures: %s\nWarnings: %s\n' "$failures" "$warnings"
[[ "$failures" -gt 0 ]] && exit 1
