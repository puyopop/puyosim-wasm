# Local GitHub Actions Testing Guide

## Overview

This guide covers tools and methods for testing GitHub Actions workflows locally, allowing you to debug and validate your CI/CD pipelines before pushing to GitHub.

## Primary Tools

### 1. Act (nektos/act) - Recommended

**Act** is the most popular and comprehensive tool for running GitHub Actions locally using Docker containers.

#### Installation

```bash
# macOS (Homebrew)
brew install act

# Linux (using curl)
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | bash

# Windows (using winget)
winget install nektos.act

# Or download from GitHub releases
# https://github.com/nektos/act/releases
```

#### Basic Usage

```bash
# Run all workflows
act

# Run specific workflow
act -W .github/workflows/rust.yml

# Run specific job
act -j test

# List available workflows
act -l

# Run with specific event
act push
act pull_request
```

#### Configuration

Create `.actrc` file in your project root:

```bash
# Use larger Docker images for better compatibility
-P ubuntu-latest=catthehacker/ubuntu:act-latest
-P ubuntu-22.04=catthehacker/ubuntu:act-22.04
-P ubuntu-20.04=catthehacker/ubuntu:act-20.04

# Pass secrets
--secret-file .act.secrets

# Set environment variables
--env-file .act.env
```

#### Secrets and Environment Variables

Create `.act.secrets` file:
```
GITHUB_TOKEN=your_token_here
CODECOV_TOKEN=your_codecov_token
```

Create `.act.env` file:
```
CI=true
GITHUB_ACTIONS=true
CARGO_TERM_COLOR=always
```

#### Docker Images

Act supports different Docker image sizes:

- **Micro** (~200MB): Basic shell and filesystem
- **Medium** (~500MB): Includes common tools
- **Large** (~17GB): Full GitHub Actions runner environment

For Rust and Deno projects, medium images are usually sufficient:

```bash
# Use medium images
act -P ubuntu-latest=catthehacker/ubuntu:act-latest-medium
```

### 2. GitHub Local Action (@github/local-action)

Official GitHub tool for testing JavaScript/TypeScript actions locally.

#### Installation

```bash
npm install -g @github/local-action
```

#### Usage

```bash
# Test a JavaScript action
local-action run .

# Test with inputs
local-action run . --input param1=value1 --input param2=value2
```

**Limitations**: Only supports JavaScript/TypeScript actions, not full workflows.

## Debugging Strategies

### 1. Interactive SSH Access (tmate)

Add this step to your workflow for interactive debugging:

```yaml
- name: Setup tmate session
  uses: mxschmitt/action-tmate@v3
  if: failure()
```

### 2. Debug Mode

Enable verbose logging by setting repository secrets:
- `ACTIONS_RUNNER_DEBUG`: `true`
- `ACTIONS_STEP_DEBUG`: `true`

### 3. Local Debug Scripts

Create debug scripts that mirror CI behavior:

```bash
#!/bin/bash
# debug-ci.sh
set -e

echo "🔍 Running local CI debug..."

# Simulate Rust workflow
if [ -f "Cargo.toml" ]; then
    echo "📦 Testing Rust project..."
    cargo fmt -- --check
    cargo clippy --all-targets --all-features -- -D warnings
    cargo test
fi

# Simulate Deno workflow
if [ -f "deno.json" ] || ls *.js *.ts &>/dev/null; then
    echo "🦕 Testing Deno project..."
    deno fmt --check
    deno lint
    deno test --allow-all
fi

echo "✅ Local CI debug completed!"
```

## Project-Specific Setup

### For This Deno-based Project

#### 1. Install Act

```bash
brew install act
```

#### 2. Create Act Configuration

Create `.actrc`:
```
-P ubuntu-latest=catthehacker/ubuntu:act-latest
--container-daemon-socket -
```

#### 3. Create Environment File

Create `.act.env`:
```
CI=true
GITHUB_ACTIONS=true
DENO_DIR=/tmp/.deno
```

#### 4. Test Commands

```bash
# Test Deno workflow
act -W .github/workflows/javascript.yml

# Test specific job
act -j deno

# Test with verbose output
act -v -W .github/workflows/javascript.yml

# Dry run to see what would execute
act --dryrun
```

### Local Development Workflow

#### 1. Pre-commit Testing

```bash
#!/bin/bash
# pre-commit-test.sh

echo "🧪 Running pre-commit tests..."

# Format check
echo "📝 Checking formatting..."
deno fmt --check || { echo "❌ Format check failed"; exit 1; }

# Lint check
echo "🔍 Running linter..."
deno lint || { echo "❌ Lint check failed"; exit 1; }

# Run tests
echo "🧪 Running tests..."
if [ -f "src/tools/run-tests.sh" ]; then
    chmod +x src/tools/run-tests.sh
    ./src/tools/run-tests.sh
else
    deno test --allow-all
fi

echo "✅ All pre-commit tests passed!"
```

#### 2. GitHub Actions Simulation

```bash
#!/bin/bash
# simulate-ci.sh

echo "🚀 Simulating GitHub Actions locally..."

# Use act to run workflows
echo "📦 Testing Deno workflow..."
act -W .github/workflows/javascript.yml -j deno

echo "🦀 Testing Rust workflow (if Rust files exist)..."
if [ -f "Cargo.toml" ]; then
    act -W .github/workflows/rust.yml
else
    echo "⏭️  Skipping Rust workflow (no Cargo.toml found)"
fi

echo "✅ CI simulation completed!"
```

## VS Code Integration

### Extensions

Install these VS Code extensions:

1. **GitHub Actions** - Syntax highlighting and validation
2. **GitHub Local Actions** - Run act commands from VS Code
3. **GitHub Copilot** - AI assistance for workflow creation

### VS Code Tasks

Create `.vscode/tasks.json`:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Act: Run All Workflows",
            "type": "shell",
            "command": "act",
            "group": "test",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            }
        },
        {
            "label": "Act: Run Deno Workflow",
            "type": "shell",
            "command": "act",
            "args": ["-W", ".github/workflows/javascript.yml", "-j", "deno"],
            "group": "test"
        },
        {
            "label": "Act: List Workflows",
            "type": "shell",
            "command": "act",
            "args": ["-l"],
            "group": "test"
        }
    ]
}
```

## Troubleshooting

### Common Issues

#### 1. Docker Permission Issues

```bash
# Add user to docker group (Linux)
sudo usermod -aG docker $USER
# Then log out and back in

# Or use sudo with act
sudo act
```

#### 2. Missing Dependencies

```bash
# Use fuller Docker images
act -P ubuntu-latest=catthehacker/ubuntu:act-latest-full
```

#### 3. Network Issues

```bash
# Allow network access
act --privileged
```

#### 4. File Permission Issues

```bash
# Fix permissions in workflow
- name: Fix permissions
  run: |
    chmod +x ./scripts/*.sh
    chmod +x ./src/tools/*.sh
```

### Debugging Tips

1. **Use verbose mode**: `act -v` for detailed output
2. **Run specific jobs**: `act -j job-name` to isolate issues
3. **Use dry run**: `act --dryrun` to see execution plan
4. **Check Docker logs**: `docker logs <container-id>`
5. **Interactive mode**: Add `tmate` action for SSH access

## Performance Optimization

### Docker Image Caching

```bash
# Pre-pull images
docker pull catthehacker/ubuntu:act-latest

# Use local registry for faster access
# Set up local Docker registry if needed
```

### Act Configuration Optimization

```bash
# .actrc optimizations
-P ubuntu-latest=catthehacker/ubuntu:act-latest
--container-daemon-socket -
--use-gitignore=false
--artifact-server-path /tmp/artifacts
```

## Integration with CI/CD

### Git Hooks

Create `.git/hooks/pre-push`:

```bash
#!/bin/bash
echo "🔍 Running GitHub Actions validation..."
act --dryrun
if [ $? -ne 0 ]; then
    echo "❌ GitHub Actions validation failed"
    exit 1
fi
echo "✅ GitHub Actions validation passed"
```

### Make Integration

Add to `Makefile`:

```makefile
.PHONY: test-ci
test-ci:
	@echo "Testing GitHub Actions locally..."
	act -W .github/workflows/javascript.yml

.PHONY: validate-workflows
validate-workflows:
	@echo "Validating workflows..."
	act --dryrun
```

## Security Considerations

1. **Never commit secrets**: Use `.act.secrets` and add to `.gitignore`
2. **Use read-only tokens**: Limit GitHub token permissions
3. **Isolate network**: Use `--network none` when possible
4. **Review third-party actions**: Check action sources before using

## Cost Savings

Using local testing can significantly reduce GitHub Actions usage:

- **Development time**: 70-90% reduction in debug cycles
- **GitHub Actions minutes**: Save on unnecessary runs
- **Faster feedback**: 5-20 seconds vs 2-5 minutes for cloud runs
- **Offline development**: Work without internet connection

## Summary

Act provides the most comprehensive solution for local GitHub Actions testing, especially for mixed Rust/Deno projects like this one. Combined with proper debugging techniques and VS Code integration, it enables efficient CI/CD development and validation.