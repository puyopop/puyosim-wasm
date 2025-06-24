# JavaScript/TypeScript Tooling Guide

## Overview

This document outlines the default and recommended linting and formatting tools
for JavaScript and TypeScript projects as of 2024.

## Core Tools

### ESLint - Linter

**ESLint** is the standard linting tool for JavaScript and TypeScript that finds
and fixes problems in your code.

#### Features

- Detects coding standard violations and potential bugs
- Supports JavaScript, TypeScript, and JSX
- Highly configurable with extensive plugin ecosystem
- Can automatically fix many issues
- Integrated with most editors and build tools

#### Installation

```bash
# For JavaScript projects
npm install --save-dev eslint

# For TypeScript projects
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# For React projects
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks
```

#### Usage

```bash
# Initialize ESLint configuration
npx eslint --init

# Lint files
npx eslint src/

# Fix auto-fixable issues
npx eslint src/ --fix

# Lint specific file
npx eslint src/app.js
```

#### Configuration (eslint.config.js - ESLint 9 flat config)

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

### Prettier - Code Formatter

**Prettier** is an opinionated code formatter that enforces consistent style
across your codebase.

#### Features

- Automatic code formatting with minimal configuration
- Supports JavaScript, TypeScript, CSS, HTML, Markdown, and more
- Integrates with ESLint to prevent conflicts
- Consistent formatting regardless of original code style
- Editor integration for format-on-save

#### Installation

```bash
# Install Prettier
npm install --save-dev prettier

# Install ESLint integration
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

#### Usage

```bash
# Format files
npx prettier --write src/

# Check formatting
npx prettier --check src/

# Format specific file
npx prettier --write src/app.js
```

#### Configuration (.prettierrc.json)

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

#### ESLint Integration

Update your ESLint config to work with Prettier:

```javascript
// eslint.config.js
import prettierConfig from 'eslint-config-prettier';

export default [
  // ... other configs
  prettierConfig, // This should be last
];
```

## Testing

### Popular Testing Frameworks

#### Jest (Most Common)

```bash
npm install --save-dev jest @types/jest

# For TypeScript
npm install --save-dev ts-jest
```

#### Vitest (Modern Alternative)

```bash
npm install --save-dev vitest
```

#### Usage

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "format:check": "prettier --check src/",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "check-all": "npm run lint && npm run format:check && npm run test"
  }
}
```

## GitHub Actions Integration

### Recommended Workflow Structure

```yaml
name: Node.js CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Check formatting
        run: npm run format:check

      - name: Run tests
        run: npm test
```

## IDE Integration

### VS Code

Install recommended extensions:

- ESLint
- Prettier - Code formatter

#### Settings (.vscode/settings.json)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Configuration Files Summary

| File               | Purpose                       |
| ------------------ | ----------------------------- |
| `eslint.config.js` | ESLint configuration (v9+)    |
| `.eslintrc.json`   | ESLint configuration (legacy) |
| `.prettierrc.json` | Prettier configuration        |
| `.prettierignore`  | Files to ignore in formatting |
| `package.json`     | Dependencies and scripts      |
| `tsconfig.json`    | TypeScript configuration      |

## Best Practices

1. **Use ESLint and Prettier together** - they complement each other
2. **Configure format-on-save** in your editor
3. **Run linting and formatting in CI** to enforce standards
4. **Use type-aware linting** for TypeScript projects
5. **Keep dependencies updated** regularly
6. **Use consistent configuration** across team members

## Common Commands Summary

```bash
# Install tools
npm install --save-dev eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Run tests
npm test

# Run all checks
npm run check-all
```

## Node.js Runtime Considerations

For projects using Deno (like the current puyop-parser.js):

```bash
# Deno has built-in formatting and linting
deno fmt                    # Format code
deno lint                   # Lint code
deno test                   # Run tests
deno check src/main.ts      # Type check
```

Deno provides these tools out of the box without additional configuration,
making it simpler for single-file scripts and small projects.
