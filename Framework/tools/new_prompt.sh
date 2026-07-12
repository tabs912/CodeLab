#!/usr/bin/env bash
set -u
echo "Available prompt groups:"
find Framework/prompts -maxdepth 2 -type f -name '*.md' | sort
