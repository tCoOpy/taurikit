#!/usr/bin/env bash
set -euo pipefail

SCAFFOLD_DIR="${1:?Usage: ./scripts/upload-template.sh <scaffold-dir> [version]}"
VERSION="${2:-0.1.0}"
TARBALL="taurikit-${VERSION}.tar.gz"
R2_KEY="templates/${VERSION}.tar.gz"

echo "Packaging scaffold from ${SCAFFOLD_DIR}..."

tar czf "/tmp/${TARBALL}" \
  -C "${SCAFFOLD_DIR}" \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='target' \
  --exclude='.claude' \
  --exclude='MEMORY.md' \
  base auth ui manifest.toml

echo "Uploading to R2 as ${R2_KEY}..."
wrangler r2 object put "taurikit-templates/${R2_KEY}" --file="/tmp/${TARBALL}"

echo "Done — template v${VERSION} uploaded."
rm "/tmp/${TARBALL}"
