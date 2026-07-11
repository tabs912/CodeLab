#!/usr/bin/env bash
set -u
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "Not inside a Git repository." >&2; exit 1; }
root="$(git rev-parse --show-toplevel)"; cd "$root" || exit 1
git fsck --no-progress
git fetch --all --prune
pattern='\.(pdf|xlsx|xls|docx|pptx|png|jpg|jpeg|gif|zip)$'
git ls-files | grep -Ei "$pattern" | grep -Ev '(^|/)Reports/' | grep -Ev '(^|/)Audit_Summary/' | grep -Ev '(^|/)Archive_To_Move/' || true
git branch -vv
git status -sb
