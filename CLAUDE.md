# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `puyosim-wasm` - a WebAssembly-based Puyo Puyo simulator project. The repository is currently in early development stage with minimal files.

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