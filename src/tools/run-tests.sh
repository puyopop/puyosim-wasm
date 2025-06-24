#!/bin/bash

# PuyoP Parser Test Runner Script
# Usage: ./run-tests.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEST_PATH="$SCRIPT_DIR/puyop-parser.test.js"

echo "Running PuyoP Parser Tests..."
echo "=============================="

# Check if deno is available
if ! command -v deno &> /dev/null; then
    echo "Error: Deno is not installed. Please install Deno first."
    echo "Visit: https://deno.land/manual/getting_started/installation"
    exit 1
fi

# Run the tests
deno run --allow-net "$TEST_PATH"