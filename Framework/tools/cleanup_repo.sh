#!/usr/bin/env bash
set -u
echo "Safe cleanup report only."
git status -sb
git remote prune origin --dry-run 2>/dev/null || true
echo "No files, branches, or commits were changed."
