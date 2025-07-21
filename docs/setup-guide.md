# セットアップガイド

## 前提条件

### 必要なツール

1. **Git** (2.19以降、git worktree対応)
2. **GitHub CLI** (`gh`)
3. **Claude Code** (最新版)
4. **Node.js/npm** (プロジェクトに応じて)

### 認証設定

```bash
# GitHub CLIの認証
gh auth login

# SSH設定確認
ssh -T git@github.com
```

## 初期セットアップ

### 1. プロジェクト構造の作成

```bash
# プロジェクトルートで実行
mkdir -p .claude/commands
mkdir -p worktrees
mkdir -p doc

# GitHubリポジトリとの接続確認
gh repo view
```

### 2. Claude Codeカスタムコマンドの配置

以下のディレクトリ構造を作成します：

```
.claude/
└── commands/
    ├── issue-start.md
    ├── issue-read.md
    ├── issue-sync.md
    ├── commit-smart.md
    ├── pr-create.md
    ├── cleanup-worktree.md
    ├── test-issue.md
    ├── lint-fix.md
    ├── commit-push-smart.md
    ├── amend-push.md
    ├── quick-commit.md
    ├── check-ci.md
    ├── trigger-deploy.md
    ├── full-check.md
    ├── pre-commit-setup.md
    ├── hotfix-start.md
    └── rollback.md
```

### 3. プロジェクト固有設定

#### 3.1 CLAUDE.mdの更新

```markdown
# CLAUDE.md

## Custom Commands

### Issue Management
- `/project:issue-start [issue_number]` - 新しいIssueの作業開始
- `/project:issue-read [issue_number]` - Issue情報の読み込み
- `/project:issue-sync` - 現在作業中のIssueと同期

### Development Support
- `/project:commit-smart` - インテリジェントコミット
- `/project:pr-create` - Pull Request作成
- `/project:cleanup-worktree` - 完了したworktreeの整理

### Quality Assurance
- `/project:test-issue` - Issue関連テスト実行
- `/project:lint-fix` - コードスタイル修正
- `/project:full-check` - 包括的品質チェック

### Automation
- `/project:commit-push-smart` - コミット&プッシュ自動化
- `/project:check-ci` - CI/CD状況確認
- `/project:hotfix-start [description]` - 緊急修正開始
```

#### 3.2 .gitignoreの更新

```bash
# .gitignoreに追加
echo "worktrees/" >> .gitignore
echo ".claude/cache/" >> .gitignore
```

## 使用方法

### 基本的なワークフロー

1. **Issue作成** (GitHub上で)
2. **作業開始**
   ```
   /project:issue-start 123
   ```
3. **開発作業** (Claude Codeでコーティング)
4. **品質チェック**
   ```
   /project:full-check
   ```
5. **コミット&プッシュ**
   ```
   /project:commit-push-smart
   ```
6. **PR作成**
   ```
   /project:pr-create
   ```
7. **完了後整理**
   ```
   /project:cleanup-worktree
   ```

### 並列開発の例

```bash
# 複数Issueを同時進行
/project:issue-start 123    # Issue #123の作業開始
/project:issue-start 456    # Issue #456の作業開始

# 各worktreeで独立して作業
cd worktrees/issue-123      # Issue #123に集中
cd worktrees/issue-456      # Issue #456に集中
```

## トラブルシューティング

### よくある問題

#### 1. worktreeが作成できない

**症状**: `fatal: 'worktrees/issue-123' already exists`

**解決**:
```bash
# 既存worktreeの確認
git worktree list

# 不要なworktreeの削除
git worktree remove worktrees/issue-123
```

#### 2. ブランチ競合

**症状**: `fatal: A branch named 'feature/issue-123' already exists`

**解決**:
```bash
# 既存ブランチの確認
git branch -a

# 古いブランチの削除（注意）
git branch -D feature/issue-123
```

#### 3. GitHub CLI認証エラー

**症状**: `gh: authentication required`

**解決**:
```bash
# 認証状態の確認
gh auth status

# 再認証
gh auth login
```

### 高度な設定

#### カスタムエイリアス

```bash
# ~/.gitconfigに追加
[alias]
    wt-list = worktree list
    wt-add = worktree add
    wt-remove = worktree remove
    issue-log = log --oneline --grep="^[a-z]*([#0-9]*)"
```

#### 環境変数

```bash
# ~/.bashrc or ~/.zshrcに追加
export GITHUB_TOKEN="your_token_here"
export CLAUDE_PROJECT_ROOT="$(pwd)"
```

## 最適化のヒント

### パフォーマンス向上

1. **worktreeの定期的な整理**
   ```
   /project:cleanup-worktree
   ```

2. **ブランチの整理**
   ```bash
   git branch --merged | grep -v main | xargs -n 1 git branch -d
   ```

3. **リモートの同期**
   ```bash
   git remote prune origin
   ```

### セキュリティ

1. **機密情報チェック**
   - pre-commitフックでAPI キーの検出
   - .gitignoreの適切な設定

2. **権限管理**
   - GitHub Personal Access Tokenの適切な権限設定
   - 定期的なトークンの更新

これらの設定により、効率的で安全なClaude Code × GitHub Issue連携開発環境が構築できます。