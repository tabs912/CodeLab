#!/usr/bin/env bash
set -u
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "Not inside a Git repository." >&2; exit 1; }
echo "Root: $(git rev-parse --show-toplevel)"
echo "Branch: $(git branch --show-current 2>/dev/null || true)"
echo "Origin: $(git remote get-url origin 2>/dev/null || echo NOT_CONFIGURED)"
git status -sb
