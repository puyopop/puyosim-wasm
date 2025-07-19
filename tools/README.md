# PuyoP Parser Tools

This directory contains tools for parsing PuyoP.com simulator URLs and
converting field data to plain text format.

## Files

- `puyop-parser.js` - Main parser implementation
- `puyop-parser.test.js` - Test suite for the parser
- `puyop-parser.spec.md` - Detailed specification document
- `run-puyop-parser.sh` - Convenient script to run the parser
- `run-tests.sh` - Script to run all tests

## Usage

### Direct Usage with Deno

```bash
# Parse a single URL
deno run --allow-net puyop-parser.js "https://www.puyop.com/s/1"

# Run tests
deno run --allow-net puyop-parser.test.js
```

### Using Convenience Scripts

```bash
# Parse a URL
./run-puyop-parser.sh "https://www.puyop.com/s/1"

# Run all tests
./run-tests.sh
```

## Output Format

The parser converts encoded field data into plain text format using these
symbols:

- `.` = Empty cell
- `R` = Red puyo
- `G` = Green puyo
- `B` = Blue puyo
- `Y` = Yellow puyo
- `P` = Purple puyo
- `O` = Ojama (garbage)

## Examples

```bash
# Single red puyo at bottom right
./run-puyop-parser.sh "https://www.puyop.com/s/1"

# Horizontal pair
./run-puyop-parser.sh "https://www.puyop.com/s/9"

# Complex field
./run-puyop-parser.sh "https://www.puyop.com/s/pg0ra09i0"
```
