# JavaScript/TypeScript Tooling Guide

## Overview

This document outlines the Deno-based tooling approach for JavaScript and TypeScript development in this project. This project uses **Deno exclusively** as the JavaScript/TypeScript runtime, which provides built-in formatting, linting, and testing capabilities without requiring additional dependencies or configuration.

## Core Philosophy

**Deno-First Approach**: This project uses Deno as the primary and only JavaScript/TypeScript runtime. Deno provides all necessary development tools out of the box, eliminating the need for external tools like ESLint, Prettier, Jest, or npm.

## Built-in Deno Tools

### Formatting - `deno fmt`

Deno includes a built-in code formatter that enforces consistent style across your codebase.

#### Features

- Zero configuration required
- Supports JavaScript, TypeScript, JSON, and Markdown
- Fast and consistent formatting
- Integrates seamlessly with the Deno ecosystem

#### Usage

```bash
# Format all files in project
deno fmt

# Check formatting without making changes
deno fmt --check

# Format specific files or directories
deno fmt src/
deno fmt tools/puyop-parser.js

# Format and exclude certain files (configured in deno.json)
deno fmt --exclude=doc/
```

#### Project Configuration

The project's formatting is configured in `deno.json`:

```json
{
  "fmt": {
    "semiColons": true,
    "singleQuote": true,
    "lineWidth": 80,
    "indentWidth": 2,
    "include": [
      "src/",
      "**/*.js",
      "**/*.ts"
    ],
    "exclude": [
      "node_modules/",
      "target/",
      ".git/",
      "doc/",
      "*.md"
    ]
  }
}
```

### Linting - `deno lint`

Deno includes a built-in linter that finds and reports problems in your JavaScript and TypeScript code.

#### Features

- No configuration needed for basic linting
- Supports JavaScript and TypeScript
- Fast static analysis
- Configurable rules and exclusions

#### Usage

```bash
# Lint all files in project
deno lint

# Lint specific files or directories
deno lint src/
deno lint tools/puyop-parser.js

# Lint with specific rules (configured in deno.json)
deno lint --rules-tags=recommended
```

#### Project Configuration

The project's linting is configured in `deno.json`:

```json
{
  "lint": {
    "rules": {
      "tags": ["recommended"]
    },
    "include": [
      "src/",
      "**/*.js",
      "**/*.ts"
    ],
    "exclude": [
      "node_modules/",
      "target/",
      ".git/",
      "doc/"
    ]
  }
}
```

### Testing - `deno test`

Deno includes a built-in test runner that supports modern testing patterns without additional frameworks.

#### Features

- Built-in assertions library
- Parallel test execution
- Code coverage reporting
- TypeScript support out of the box
- No additional dependencies required

#### Usage

```bash
# Run all tests
deno test

# Run tests with full permissions (for network/file access)
deno test --allow-all

# Run specific test file
deno test tools/puyop-parser.test.js

# Run tests with coverage
deno test --allow-all --coverage=coverage
deno coverage coverage --lcov --output=coverage.lcov

# Run tests matching a pattern
deno test --filter="parser"
```

#### Project Configuration

Test configuration in `deno.json`:

```json
{
  "test": {
    "include": [
      "src/",
      "**/*.test.{js,ts}"
    ]
  }
}
```

### Type Checking - `deno check`

Deno provides built-in TypeScript type checking without requiring a separate TypeScript installation.

#### Usage

```bash
# Type check all TypeScript files
deno check **/*.ts

# Type check specific file
deno check src/main.ts

# Type check with remote dependencies
deno check --reload src/main.ts
```

## Development Workflow

### Daily Commands

```bash
# Check formatting
deno fmt --check

# Apply formatting
deno fmt

# Run linter
deno lint

# Type check TypeScript files
deno check **/*.ts

# Run tests
deno test --allow-all

# Run all quality checks
deno fmt --check && deno lint && deno test --allow-all
```

### Running Project Tools

#### PuyoP.com Parser

```bash
# Run the parser directly
deno run --allow-net tools/puyop-parser.js "https://www.puyop.com/s/?_=000"

# Run parser tests
deno test --allow-net tools/puyop-parser.test.js

# Or use the test runner script
./tools/run-tests.sh

# Make executable and run (optional)
chmod +x tools/puyop-parser.js
./tools/puyop-parser.js "https://www.puyop.com/s/?_=000"
```

## GitHub Actions Integration

The project uses Deno in GitHub Actions for continuous integration:

```yaml
name: Deno CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Deno
        uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x

      - name: Run formatter check
        run: deno fmt --check

      - name: Run linter
        run: deno lint

      - name: Run type check
        run: deno check **/*.ts

      - name: Run tests
        run: deno test --allow-all
```

## IDE Integration

### VS Code

Install the official Deno extension:

- **Deno** (denoland.vscode-deno)

#### Settings (.vscode/settings.json)

```json
{
  "deno.enable": true,
  "deno.enablePaths": ["./src"],
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "denoland.vscode-deno",
  "[javascript]": {
    "editor.defaultFormatter": "denoland.vscode-deno"
  },
  "[typescript]": {
    "editor.defaultFormatter": "denoland.vscode-deno"
  }
}
```

## Project Configuration Files

| File        | Purpose                           |
| ----------- | --------------------------------- |
| `deno.json` | Deno configuration (fmt, lint, test) |

## Best Practices

1. **Use Deno's built-in tools exclusively** - no need for external formatters or linters
2. **Configure format-on-save** in your editor with the Deno extension
3. **Run all checks in CI** using Deno commands
4. **Keep deno.json configuration minimal** - Deno's defaults are well-designed
5. **Use `--allow-all` for tests** that need network or file system access
6. **Leverage TypeScript support** without additional configuration

## Common Commands Summary

```bash
# Format code
deno fmt

# Check formatting
deno fmt --check

# Lint code
deno lint

# Type check TypeScript
deno check **/*.ts

# Run tests
deno test --allow-all

# Run tests with coverage
deno test --allow-all --coverage=coverage

# Run all quality checks
deno fmt --check && deno lint && deno check **/*.ts && deno test --allow-all
```

## Advantages of Deno-Only Approach

1. **Zero Dependencies**: No need to install or manage external tools
2. **Consistent Tooling**: All tools work together seamlessly
3. **Fast Setup**: New developers can start immediately with just Deno installed
4. **Security**: Built-in permission system for safe script execution
5. **Modern Standards**: Native TypeScript support and ES modules
6. **Simplified CI/CD**: Single runtime handles all development tasks

## Migration from Node.js/npm

If you're familiar with Node.js tooling, here's the Deno equivalent:

| Node.js/npm Tool | Deno Equivalent |
| ---------------- | --------------- |
| `npm install`    | No installation needed |
| `eslint`         | `deno lint`     |
| `prettier`       | `deno fmt`      |
| `jest/mocha`     | `deno test`     |
| `tsc`            | `deno check`    |
| `node script.js` | `deno run script.js` |

This Deno-first approach eliminates the complexity of managing multiple tools and their configurations, providing a streamlined development experience focused on writing code rather than configuring tooling.