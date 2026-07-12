#!/usr/bin/env bash
set -u
for p in README.md AGENTS.md Framework Framework/spec Framework/prompts Framework/tools; do
  [[ -e "$p" ]] && echo "OK   $p" || echo "WARN Missing $p"
done
git status -sb
