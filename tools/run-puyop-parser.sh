#!/bin/bash

# PuyoP Parser Runner Script
# Usage: ./run-puyop-parser.sh <puyop_url>
# Example: ./run-puyop-parser.sh "https://www.puyop.com/s/1"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARSER_PATH="$SCRIPT_DIR/puyop-parser.js"

if [ $# -eq 0 ]; then
    echo "Usage: $0 <puyop_url>"
    echo "Example: $0 \"https://www.puyop.com/s/1\""
    exit 1
fi

# Check if deno is available
if ! command -v deno &> /dev/null; then
    echo "Error: Deno is not installed. Please install Deno first."
    echo "Visit: https://deno.land/manual/getting_started/installation"
    exit 1
fi

# Run the parser
deno run --allow-net "$PARSER_PATH" "$1"