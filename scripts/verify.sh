#!/usr/bin/env bash
set -euo pipefail

echo "=== Running verification ==="
echo ""

if npm test; then
  echo ""
  echo "✅  VERIFY PASS — all tests green"
  exit 0
else
  echo ""
  echo "❌  VERIFY FAIL — tests did not pass"
  exit 1
fi
