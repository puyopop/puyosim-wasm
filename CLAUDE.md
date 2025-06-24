# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `puyosim-wasm` - a WebAssembly-based Puyo Puyo simulator project. The repository is currently in early development stage with minimal files.

## Current State

The repository contains only a basic README.md file and is in the initial setup phase. No build system, dependencies, or source code has been established yet.

## Development Notes

- This appears to be a fresh repository setup for a Puyo Puyo game simulator using WebAssembly
- No package.json, Cargo.toml, or other build configuration files are present yet
- The project structure and build system are yet to be defined
- Common next steps would likely involve setting up either:
  - Rust + wasm-pack for WebAssembly compilation
  - Or another WebAssembly toolchain depending on the chosen implementation language

## Tools Available

### PuyoP.com Parser
- `puyop_parser.js` - Parses puyop.com simulator URLs and converts field data to plain text
- `test_parser.js` - Test script for the parser functionality

Usage:
```bash
# Run the parser directly
deno run --allow-net puyop_parser.js "https://www.puyop.com/s/?_=000"

# Run tests
deno run --allow-net test_parser.js

# Make executable and run (optional)
chmod +x puyop_parser.js
./puyop_parser.js "https://www.puyop.com/s/?_=000"
```

The parser converts encoded field data into plain text format using these symbols:
- `.` = Empty cell
- `R` = Red puyo
- `G` = Green puyo  
- `B` = Blue puyo
- `Y` = Yellow puyo
- `P` = Purple puyo
- `O` = Ojama (garbage)

## Future Development

When the project structure is established, this file should be updated with:
- Build commands and development workflow
- Testing procedures
- Code architecture and module organization
- WebAssembly compilation and optimization steps