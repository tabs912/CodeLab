#!/usr/bin/env bash
set -e

echo "Removing binary files from staged changes..."

git restore --staged '*.pdf' 2>/dev/null || true
git restore --staged '*.xlsx' 2>/dev/null || true
git restore --staged '*.xlsm' 2>/dev/null || true
git restore --staged '*.docx' 2>/dev/null || true
git restore --staged '*.pptx' 2>/dev/null || true
git restore --staged '*.png' 2>/dev/null || true
git restore --staged '*.jpg' 2>/dev/null || true
git restore --staged '*.jpeg' 2>/dev/null || true
git restore --staged '*.zip' 2>/dev/null || true

echo
echo "Remaining staged files:"
git diff --cached --name-only
