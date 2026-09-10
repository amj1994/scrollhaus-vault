#!/usr/bin/env bash
# Extract a scroll-scrub frame sequence from a source take.
# Usage: ./scripts/extract-frames.sh path/to/source.mp4 [fps] [width]
set -euo pipefail

SRC="${1:?usage: extract-frames.sh <source.mp4> [fps] [width]}"
FPS="${2:-18}"
WIDTH="${3:-1600}"
OUT="frames"

[ -f "$SRC" ] || { echo "No such file: $SRC" >&2; exit 1; }
command -v ffmpeg >/dev/null || { echo "ffmpeg not found" >&2; exit 1; }

rm -rf "$OUT"; mkdir -p "$OUT"
ffmpeg -hide_banner -loglevel error -i "$SRC" \
  -vf "fps=${FPS},scale=${WIDTH}:-2" -qscale:v 4 "$OUT/f_%03d.jpg"

COUNT=$(find "$OUT" -name 'f_*.jpg' | wc -l | tr -d ' ')
echo "Wrote $COUNT frames to $OUT/ ($(du -sh "$OUT" | cut -f1))"
echo "Now set  var TOTAL = $COUNT;  in index.html"
