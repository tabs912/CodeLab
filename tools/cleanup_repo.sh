#!/usr/bin/env bash
set -u
echo "Safe cleanup report only. No files will be deleted."
git status -sb
echo
echo "Ignored files:"
git status --ignored --short
echo
echo "Stale remote branches:"
git remote prune origin --dry-run 2>/dev/null || true
echo
echo "No reset, clean, delete, or branch removal was performed."
