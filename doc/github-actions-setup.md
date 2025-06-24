# GitHub Actions Setup Guide

## Overview

This repository is configured with GitHub Actions workflows for automated testing, linting, and formatting of both Rust and JavaScript/TypeScript code.

## Workflows

### 1. Rust CI (`.github/workflows/rust.yml`)

**Triggers:** Push and Pull Request to `main` and `develop` branches

**Jobs:**
- **Test**: Runs tests on multiple Rust versions (stable, beta)
- **Lint**: Checks code formatting and runs Clippy linting
- **Security**: Runs `cargo audit` for dependency vulnerabilities
- **Coverage**: Generates code coverage reports using `cargo-tarpaulin`

**Features:**
- Cargo caching for faster builds
- Multiple Rust version testing
- Strict linting with warnings treated as errors
- Documentation generation check
- Security audit integration

### 2. JavaScript/TypeScript CI (`.github/workflows/javascript.yml`)

**Triggers:** Push and Pull Request to `main` and `develop` branches

**Jobs:**
- **Node.js**: Tests with multiple Node.js versions (18, 20, 22) - only if `package.json` exists
- **Deno**: Tests with Deno runtime for standalone scripts
- **Standalone Lint**: Linting for projects without `package.json`
- **Security**: Runs security scans including npm audit and Semgrep

**Features:**
- Multi-runtime support (Node.js and Deno)
- Conditional execution based on project structure
- Security scanning with multiple tools
- Coverage reporting integration

## Configuration Files

### Rust Configuration Files

Create these files in your project root as needed:

#### `rustfmt.toml`
```toml
max_width = 100
hard_tabs = false
tab_spaces = 4
edition = "2021"
```

#### `clippy.toml`
```toml
avoid-breaking-exported-api = false
msrv = "1.70.0"
```

### JavaScript/TypeScript Configuration Files

#### For Node.js Projects

**`package.json` scripts:**
```json
{
  "scripts": {
    "lint": "eslint src/ --ext .js,.ts,.tsx",
    "lint:fix": "eslint src/ --ext .js,.ts,.tsx --fix",
    "format": "prettier --write src/",
    "format:check": "prettier --check src/",
    "test": "jest",
    "test:coverage": "jest --coverage",
    "build": "tsc"
  }
}
```

**`eslint.config.js` (ESLint 9 flat config):**
```javascript
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
    },
  },
];
```

**`.prettierrc.json`:**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

#### For Deno Projects

Deno projects work out of the box with built-in tools:
- `deno fmt` for formatting
- `deno lint` for linting
- `deno test` for testing

Optional `deno.json` configuration:
```json
{
  "fmt": {
    "options": {
      "semiColons": true,
      "singleQuote": true
    }
  },
  "lint": {
    "rules": {
      "tags": ["recommended"]
    }
  }
}
```

## Secrets Configuration

### Required Secrets (Optional)

Set these in your GitHub repository settings under Secrets and variables > Actions:

- `CODECOV_TOKEN`: For code coverage reporting
- `SEMGREP_APP_TOKEN`: For enhanced security scanning

### Setting up Codecov

1. Visit [codecov.io](https://codecov.io) and sign up with your GitHub account
2. Add your repository
3. Copy the upload token to `CODECOV_TOKEN` secret

## Workflow Status Badges

Add these badges to your README.md:

```markdown
![Rust CI](https://github.com/your-username/your-repo/workflows/Rust%20CI/badge.svg)
![JavaScript CI](https://github.com/your-username/your-repo/workflows/JavaScript%2FTypeScript%20CI/badge.svg)
```

## Local Development Setup

### For Rust Projects

```bash
# Install Rust with rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add components
rustup component add rustfmt clippy

# Run locally (same as CI)
cargo fmt -- --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test
```

### For JavaScript/Node.js Projects

```bash
# Install dependencies
npm install

# Run checks locally
npm run lint
npm run format:check
npm run test
```

### For Deno Projects

```bash
# Install Deno
curl -fsSL https://deno.land/x/install/install.sh | sh

# Run checks locally
deno fmt --check
deno lint
deno test --allow-all
```

## Troubleshooting

### Common Issues

1. **Rust build fails with missing dependencies**
   - Ensure `Cargo.toml` is properly configured
   - Check if all required system dependencies are listed

2. **JavaScript workflow skips Node.js job**
   - The workflow only runs Node.js jobs if `package.json` exists
   - For Deno-only projects, this is expected behavior

3. **ESLint/Prettier conflicts**
   - Ensure `eslint-config-prettier` is included in your ESLint config
   - Run `npm run lint:fix` to automatically resolve fixable issues

4. **Coverage reports not uploading**
   - Verify `CODECOV_TOKEN` is set correctly
   - Check that test coverage is being generated

### Workflow Debugging

Enable debug logging by setting these repository secrets:
- `ACTIONS_RUNNER_DEBUG`: `true`
- `ACTIONS_STEP_DEBUG`: `true`

## Customization

### Modifying Rust Workflow

- **Add new Rust versions**: Update the `matrix.rust` array
- **Add new jobs**: Copy existing job structure and modify as needed
- **Change trigger branches**: Update the `on.push.branches` and `on.pull_request.branches` arrays

### Modifying JavaScript Workflow

- **Add Node.js versions**: Update the `matrix.node-version` array
- **Add new Deno versions**: Update the `matrix.deno-version` array
- **Modify conditional execution**: Update the `if` conditions in job definitions

## Performance Optimizations

Both workflows include several performance optimizations:

1. **Caching**: Dependencies and build artifacts are cached
2. **Matrix builds**: Multiple versions tested in parallel
3. **Conditional execution**: Jobs only run when relevant files exist
4. **Fail-fast**: Workflows stop early if critical checks fail

## Security Features

- **Dependency auditing**: Automatic vulnerability scanning
- **Code analysis**: Static analysis with Semgrep
- **Permission restrictions**: Workflows run with minimal permissions
- **Secret management**: Sensitive data handled through GitHub Secrets