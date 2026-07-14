#!/usr/bin/env python3
"""Validate the static site structure used by the Azure Pipeline."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"

if not INDEX.exists():
    print("Missing index.html", file=sys.stderr)
    sys.exit(1)

html = INDEX.read_text(encoding="utf-8")
required_files = [
    "styles/normalize.css",
    "styles/small.css",
    "styles/larger.css",
    "scripts/navigation.js",
    "scripts/date.js",
    "scripts/course.js",
]

missing = []
for rel_path in required_files:
    if not (ROOT / rel_path).exists():
        missing.append(rel_path)

if missing:
    print("Missing required files:", ", ".join(missing), file=sys.stderr)
    sys.exit(1)

for rel_path in required_files:
    expected_reference = rel_path.replace("/", "/")
    if rel_path.startswith("styles/"):
        pattern = rf'href="{re.escape(rel_path)}"'
    else:
        pattern = rf'src="{re.escape(rel_path)}"'

    if not re.search(pattern, html):
        print(f"Index.html is missing a reference to {rel_path}", file=sys.stderr)
        sys.exit(1)

required_markers = [
    "<title>",
    "<header>",
    "<main>",
    "<footer>",
    "id=\"courses\"",
    "id=\"credits\"",
]

for marker in required_markers:
    if marker not in html:
        print(f"Index.html is missing expected content: {marker}", file=sys.stderr)
        sys.exit(1)

print("Site validation passed")
