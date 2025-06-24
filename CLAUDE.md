# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is `puyosim-wasm` - a WebAssembly-based Puyo Puyo simulator project. The repository contains a Deno-based development environment with GitHub Actions CI/CD setup.

## Development Environment

**Primary Runtime: Deno**

- This project uses Deno as the primary JavaScript/TypeScript runtime
- Deno provides built-in formatting, linting, and testing capabilities
- No npm or package.json required for basic development

## Development Workflow

### GitHub Issues × Claude Code Integration

This project uses a structured workflow combining GitHub Issues with Claude Code custom commands for efficient development:

#### Custom Commands Available

##### Issue Management
- `/project:issue-start [issue_number]` - 新しいIssueの作業開始
- `/project:issue-read [issue_number]` - Issue情報の読み込み
- `/project:issue-sync` - 現在作業中のIssueと同期

##### Development Support
- `/project:commit-smart` - インテリジェントコミット
- `/project:pr-create` - Pull Request作成
- `/project:cleanup-worktree` - 完了したworktreeの整理

##### Quality Assurance
- `/project:test-issue` - Issue関連テスト実行
- `/project:lint-fix` - コードスタイル修正
- `/project:full-check` - 包括的品質チェック

##### Automation
- `/project:commit-push-smart` - コミット&プッシュ自動化
- `/project:check-ci` - CI/CD状況確認
- `/project:hotfix-start [description]` - 緊急修正開始

#### Workflow Structure

1. **Issue作成**: GitHub上でIssueを作成
2. **作業開始**: `/project:issue-start [issue_number]` で専用worktreeを作成
3. **開発作業**: 独立した環境で開発を進行
4. **品質確認**: `/project:full-check` で包括的チェック
5. **コミット**: `/project:commit-push-smart` でスマートコミット&プッシュ
6. **PR作成**: `/project:pr-create` でPull Request作成
7. **完了処理**: `/project:cleanup-worktree` で環境整理

#### Directory Structure
```
project-root/
├── .claude/
│   └── commands/           # カスタムコマンド定義
├── worktrees/
│   ├── issue-123/         # Issue #123の作業ディレクトリ
│   └── issue-456/         # Issue #456の作業ディレクトリ
├── doc/                   # ワークフロー関連ドキュメント
└── [main development files]
```

## Development Notes

- This is a Puyo Puyo game simulator project with WebAssembly goals
- **Deno-first approach**: All JavaScript/TypeScript development uses Deno
  runtime
- GitHub Actions configured for automated testing, linting, and formatting
- Future WebAssembly components may use Rust + wasm-pack
- Documentation and tooling guides available in `doc/` directory

## Tools Available

### PuyoP.com Parser

- `src/tools/puyop-parser.js` - Parses puyop.com simulator URLs and converts
  field data to plain text
- `src/tools/puyop-parser.test.js` - Test script for the parser functionality
- `src/tools/run-tests.sh` - Test runner script

**Usage:**

```bash
# Run the parser directly
deno run --allow-net src/tools/puyop-parser.js "https://www.puyop.com/s/?_=000"

# Run tests
deno run --allow-net src/tools/puyop-parser.test.js

# Or use test runner
./src/tools/run-tests.sh

# Make executable and run (optional)
chmod +x src/tools/puyop-parser.js
./src/tools/puyop-parser.js "https://www.puyop.com/s/?_=000"
```

The parser converts encoded field data into plain text format using these
symbols:

- `.` = Empty cell
- `R` = Red puyo
- `G` = Green puyo
- `B` = Blue puyo
- `Y` = Yellow puyo
- `P` = Purple puyo
- `O` = Ojama (garbage)

## Development Workflow

### Deno Commands

**Formatting and Linting:**

```bash
# Check formatting
deno fmt --check

# Apply formatting
deno fmt

# Run linter
deno lint

# Type checking (TypeScript files)
deno check **/*.ts
```

**Testing:**

```bash
# Run all tests
deno test --allow-all

# Run specific test file
deno test --allow-net src/tools/puyop-parser.test.js

# Run with coverage
deno test --allow-all --coverage=coverage
deno coverage coverage --lcov --output=coverage.lcov
```

### GitHub Actions

The repository is configured with automated CI/CD:

- **Deno CI** (`.github/workflows/javascript.yml`): Runs formatting, linting,
  type checking, and tests
- **Rust CI** (`.github/workflows/rust.yml`): Will handle Rust/WebAssembly
  components when added
- **Local Testing**: Use `act` tool for local GitHub Actions testing (see
  `doc/local-github-actions-testing.md`)

**Trigger workflows locally:**

```bash
# Install act (if not already installed)
brew install act

# Run Deno workflow locally  
act -W .github/workflows/javascript.yml

# Run specific job
act -j deno
```

### Configuration Files

- `deno.json` - Deno configuration for formatting, linting, and testing
- `.github/workflows/` - GitHub Actions workflows
- `doc/` - Development guides and tooling documentation

## Future Development

**Planned features:**

- Rust + WebAssembly core engine
- Extended Puyo Puyo simulation capabilities
- Web interface for game simulation
- Performance optimization and benchmarking
