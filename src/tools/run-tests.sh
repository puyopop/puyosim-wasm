#!/bin/bash

# PuyoP Parser Test Runner Script
# Usage: ./run-tests.sh [--verbose|-v]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEST_PATH="$SCRIPT_DIR/puyop-parser.test.js"

# Parse command line arguments
VERBOSE_FLAG=""
for arg in "$@"; do
    case $arg in
        --verbose|-v)
            VERBOSE_FLAG="--verbose"
            shift
            ;;
    esac
done

if [[ -n "$VERBOSE_FLAG" ]]; then
    echo "Running PuyoP Parser Tests (Verbose Mode)..."
    echo "============================================="
else
    echo "Running PuyoP Parser Tests (Quiet Mode)..."
    echo "==========================================="
fi

# Check if deno is available
if ! command -v deno &> /dev/null; then
    echo "Error: Deno is not installed. Please install Deno first."
    echo "Visit: https://deno.land/manual/getting_started/installation"
    exit 1
fi

# Run the tests with optional verbose flag
if [[ -n "$VERBOSE_FLAG" ]]; then
    deno run --allow-net "$TEST_PATH" --verbose
else
    deno run --allow-net "$TEST_PATH"
fi