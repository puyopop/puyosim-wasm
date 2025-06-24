# Rust Tooling Guide

## Overview

This document outlines the default and recommended linting and formatting tools for Rust projects as of 2024.

## Core Tools

### rustfmt - Code Formatter

**rustfmt** is the official Rust code formatter that enforces consistent code style across your codebase.

#### Features
- Comes pre-installed with Rust when installed via rustup
- Reformats code according to community standards
- Changes only code style, not semantics
- Widely adopted across the Rust ecosystem

#### Usage
```bash
# Format entire project
cargo fmt

# Check formatting without making changes
cargo fmt -- --check

# Format specific file
rustfmt src/main.rs
```

#### Configuration
Create a `rustfmt.toml` or `.rustfmt.toml` file in your project root:
```toml
max_width = 100
hard_tabs = false
tab_spaces = 4
```

### Clippy - Linter

**Clippy** is the official Rust linter that catches common mistakes and suggests improvements.

#### Features
- Collection of over 600 lints for code quality
- Catches common mistakes and anti-patterns
- Suggests idiomatic Rust code patterns
- Can automatically apply some fixes
- Integrated with cargo and rust-analyzer

#### Usage
```bash
# Run clippy on entire project
cargo clippy

# Run clippy with all targets
cargo clippy --all-targets

# Apply automatic fixes
cargo clippy --fix

# Run with specific lint levels
cargo clippy -- -D warnings
```

#### Configuration
Create a `clippy.toml` or `.clippy.toml` file:
```toml
# Set clippy configuration
avoid-breaking-exported-api = false
msrv = "1.70.0"
```

## Testing

### Built-in Test Framework

Rust comes with a built-in test framework accessed via `cargo test`.

#### Usage
```bash
# Run all tests
cargo test

# Run tests with output
cargo test -- --nocapture

# Run specific test
cargo test test_name

# Run tests in release mode
cargo test --release
```

## GitHub Actions Integration

### Recommended Workflow Structure

```yaml
name: Rust CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions-rs/toolchain@v1
      with:
        toolchain: stable
        components: rustfmt, clippy
    
    - name: Run tests
      run: cargo test
    
    - name: Check formatting
      run: cargo fmt -- --check
    
    - name: Run clippy
      run: cargo clippy -- -D warnings
```

## IDE Integration

### VS Code
- Install the "rust-analyzer" extension
- Enable clippy in settings: set `rust-analyzer.check.command` to "clippy"
- Format on save: enable `editor.formatOnSave`

### Configuration Files Summary

| File | Purpose |
|------|---------|
| `rustfmt.toml` | rustfmt configuration |
| `clippy.toml` | Clippy lint configuration |
| `Cargo.toml` | Project metadata and dependencies |

## Best Practices

1. **Always run `cargo fmt`** before committing code
2. **Fix clippy warnings** - they often prevent bugs
3. **Use `cargo clippy -- -D warnings`** in CI to fail on warnings
4. **Configure your editor** to run formatting and linting on save
5. **Keep toolchain updated** with `rustup update`

## Common Commands Summary

```bash
# Format code
cargo fmt

# Check formatting
cargo fmt -- --check

# Run linter
cargo clippy

# Run linter with strict warnings
cargo clippy -- -D warnings

# Run tests
cargo test

# Run all checks (for CI)
cargo fmt -- --check && cargo clippy -- -D warnings && cargo test
```