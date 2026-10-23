#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
resume_build_dir="$(mktemp -d)"

cleanup() {
  rm -rf -- "$resume_build_dir"
}
trap cleanup EXIT

cd "$repo_root/resume"

pdflatex \
  -interaction=nonstopmode \
  -halt-on-error \
  -output-directory="$resume_build_dir" \
  main.tex
pdflatex \
  -interaction=nonstopmode \
  -halt-on-error \
  -output-directory="$resume_build_dir" \
  main.tex
pdflatex \
  -interaction=nonstopmode \
  -halt-on-error \
  -output-directory="$resume_build_dir" \
  main.tex

install -m 0644 "$resume_build_dir/main.pdf" "$repo_root/public/kacem-mathlouthi-resume.pdf"

echo "Updated public/kacem-mathlouthi-resume.pdf"
