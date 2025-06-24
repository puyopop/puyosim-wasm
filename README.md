# puyosim-wasm

![Deno CI](https://github.com/your-username/puyosim-wasm/workflows/Deno%20CI/badge.svg)
![Rust CI](https://github.com/your-username/puyosim-wasm/workflows/Rust%20CI/badge.svg)

A WebAssembly-based Puyo Puyo simulator project with Deno-powered development
tools.

## Features

- **PuyoP.com Parser**: Convert puyop.com simulator URLs to plain text field
  representations
- **Deno-first Development**: Modern JavaScript/TypeScript runtime with built-in
  tooling
- **GitHub Actions CI/CD**: Automated testing, linting, and formatting
- **Local Testing**: Support for local GitHub Actions testing with `act`

## Quick Start

### Prerequisites

- [Deno](https://deno.land/) - Primary runtime for JavaScript/TypeScript
- [Rust](https://rustup.rs/) - For future WebAssembly components (optional)
- [act](https://github.com/nektos/act) - Optional, for local CI testing
- [GitHub CLI](https://cli.github.com/) - Optional, for workflow management

### Installation

```bash
# Install Deno (if not already installed)
# macOS/Linux
curl -fsSL https://deno.land/x/install/install.sh | sh

# Windows
iwr https://deno.land/x/install/install.ps1 -useb | iex

# Or using package managers
# macOS: brew install deno
# Windows: winget install DenoLand.Deno

# Install optional tools
# GitHub CLI (for workflow management)
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: See https://github.com/cli/cli/blob/trunk/docs/install_linux.md

# act (for local CI testing)
# macOS: brew install act  
# Windows: winget install nektos.act
# Linux: curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | bash
```

### Usage

#### PuyoP.com Parser

```bash
# Parse a puyop.com URL
deno run --allow-net src/tools/puyop-parser.js "https://www.puyop.com/s/?_=000"

# Run tests
deno run --allow-net src/tools/puyop-parser.test.js

# Or use the test runner
chmod +x src/tools/run-tests.sh
./src/tools/run-tests.sh
```

#### Development Commands

```bash
# Format code
deno fmt

# Check formatting
deno fmt --check

# Run linter
deno lint

# Run all tests
deno test --allow-all

# Run tests with coverage
deno test --allow-all --coverage=coverage
deno coverage coverage --lcov --output=coverage.lcov
```

## Development

### Project Structure

```
├── .github/workflows/     # GitHub Actions workflows
├── doc/                   # Documentation and guides
├── src/tools/            # Development tools and utilities
├── deno.json             # Deno configuration
├── CLAUDE.md             # Development guidance for Claude Code
└── README.md
```

### Local CI Testing

This project supports local GitHub Actions testing using `act`:

```bash
# Install act
brew install act  # macOS
# or download from https://github.com/nektos/act/releases

# Run all workflows
act

# Run Deno workflow
act -W .github/workflows/javascript.yml

# Run specific job
act -j deno

# Dry run to see what would execute
act --dryrun
```

For detailed local testing setup, see
[`doc/local-github-actions-testing.md`](doc/local-github-actions-testing.md).

### GitHub Actions Management

Monitor and manage workflows using GitHub CLI:

```bash
# Authenticate with GitHub (first time only)
gh auth login

# List recent workflow runs
gh run list --repo your-username/puyosim-wasm

# View specific workflow run details
gh run view <run-id>

# View failed workflow logs
gh run view <run-id> --log-failed

# Re-run failed workflows
gh run rerun <run-id>
```

### GitHub Actions

The project includes comprehensive CI/CD workflows:

- **Deno CI**: Formatting, linting, type checking, testing, and security
  scanning
- **Rust CI**: Ready for future WebAssembly components
- **Matrix Testing**: Multiple Deno versions (v1.x, v2.x)
- **Security Scanning**: Dependency auditing and code analysis

## Documentation

- [`doc/rust-tooling.md`](doc/rust-tooling.md) - Rust development tools guide
- [`doc/javascript-tooling.md`](doc/javascript-tooling.md) -
  JavaScript/TypeScript tooling guide
- [`doc/github-actions-setup.md`](doc/github-actions-setup.md) - GitHub Actions
  configuration guide
- [`doc/local-github-actions-testing.md`](doc/local-github-actions-testing.md) -
  Local CI testing guide

## PuyoP.com Parser

The parser converts encoded field data from puyop.com URLs into human-readable
format:

| Symbol | Meaning         |
| ------ | --------------- |
| `.`    | Empty cell      |
| `R`    | Red puyo        |
| `G`    | Green puyo      |
| `B`    | Blue puyo       |
| `Y`    | Yellow puyo     |
| `P`    | Purple puyo     |
| `O`    | Ojama (garbage) |

Example:

```bash
deno run --allow-net src/tools/puyop-parser.js "https://www.puyop.com/s/?_=000"
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test locally:
   ```bash
   deno fmt --check
   deno lint
   deno test --allow-all
   ```
4. Run local CI validation:
   ```bash
   act -W .github/workflows/javascript.yml
   ```
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Create a Pull Request

## Future Plans

- **WebAssembly Core**: Rust-based Puyo Puyo game engine
- **Web Interface**: Browser-based game simulation
- **Advanced Parsing**: Support for more game states and formats
- **Performance Optimization**: Benchmarking and optimization tools

## License

This project is licensed under the MIT License - see the LICENSE file for
details.
