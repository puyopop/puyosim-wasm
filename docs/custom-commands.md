# Claude Code カスタムコマンド仕様

## 概要

GitHub Issues × git worktree連携開発のためのClaude Codeカスタムコマンド群です。効率的な並列開発とIssue駆動開発を実現します。

## Issue連携系コマンド

### `/project:issue-start [issue_number]`

**目的**: 新しいIssueの作業を開始する

**機能**:
- 指定されたIssue番号の情報をGitHubから取得
- `worktrees/issue-{number}` ディレクトリにworktreeを作成
- Issue内容を分析してタスクリストを作成
- 作業ブランチ `feature/issue-{number}` を作成

**使用例**:
```
/project:issue-start 123
```

**実装内容**:
```markdown
# Issue #$ARGUMENTS の作業を開始します

!gh issue view $ARGUMENTS --json title,body,labels,assignees
!git worktree add worktrees/issue-$ARGUMENTS -b feature/issue-$ARGUMENTS
!cd worktrees/issue-$ARGUMENTS

Issue内容を分析してタスクリストを作成し、開発の準備を整えてください。以下の情報を基に作業計画を立案してください:

1. Issue番号: #$ARGUMENTS
2. 作業ディレクトリ: worktrees/issue-$ARGUMENTS
3. ブランチ名: feature/issue-$ARGUMENTS

TodoWriteツールを使用してタスクを整理し、体系的に作業を進めてください。
```

### `/project:issue-read [issue_number]`

**目的**: 既存のIssue情報を読み込み・更新

**機能**:
- Issue内容とコメントを再取得
- 現在の作業内容と照合
- 追加要件や変更点を確認

**実装内容**:
```markdown
# Issue #$ARGUMENTS の最新情報を取得します

!gh issue view $ARGUMENTS --json title,body,labels,assignees,comments --comments

Issue情報を分析し、現在の作業内容と比較してください:
1. 新しい要件や変更点の確認
2. コメントでの追加指示の確認
3. 必要に応じてタスクリストの更新

現在の作業進捗と照らし合わせて、次の作業項目を整理してください。
```

### `/project:issue-sync`

**目的**: 現在のworktreeに関連するIssueを同期

**機能**:
- ブランチ名からIssue番号を自動抽出
- Issue状態とコメントを確認
- 作業の方向性を再確認

**実装内容**:
```markdown
# 現在のworktreeに関連するIssueを同期します

!git branch --show-current
!gh issue list --state open --json number,title,labels

現在のブランチ名からIssue番号を特定し、関連するIssue情報を取得してください。作業の進捗状況と要件の整合性を確認し、必要に応じて作業計画を調整してください。
```

## 開発支援系コマンド

### `/project:commit-smart`

**目的**: インテリジェントなコミット作成

**機能**:
- 変更内容を分析してコミットメッセージを生成
- Issue番号を自動的に含める
- Conventional Commitsに準拠

**実装内容**:
```markdown
# 現在の変更内容を分析してスマートコミットを作成します

!git status
!git diff --cached
!git branch --show-current

変更内容を分析して以下の形式でコミットを作成してください:

1. Conventional Commits形式のメッセージ生成
2. Issue番号の自動挿入 (ブランチ名から取得)
3. 変更の性質に応じた適切なプレフィックス選択

コミットメッセージ形式例:
- `feat(#123): add user authentication feature`
- `fix(#456): resolve API timeout issue`
- `docs(#789): update installation guide`

コミット実行前に内容を確認し、承認を得てからコミットしてください。
```

### `/project:pr-create`

**目的**: Pull Request自動作成

**機能**:
- Issue情報を基にPR説明を生成
- 適切なテンプレートを適用
- レビュアーとラベルを設定

**実装内容**:
```markdown
# 現在のブランチからPull Requestを作成します

!git branch --show-current
!git log main..HEAD --oneline
!git diff main...HEAD --stat

以下の手順でPull Requestを作成してください:

1. ブランチ名からIssue番号を特定
2. Issue情報を基にPR説明を生成
3. 変更内容のサマリーを作成
4. テスト計画とチェックリストを含める

PR説明テンプレート:
```
## 概要
Closes #[issue_number]

## 変更内容
- [変更点1]
- [変更点2]

## テスト
- [ ] 単体テスト実行
- [ ] 統合テスト実行
- [ ] 手動テスト完了

## チェックリスト
- [ ] コードレビュー準備完了
- [ ] ドキュメント更新
- [ ] 破壊的変更の確認
```

gh pr createコマンドでPRを作成し、URLを提供してください。
```

### `/project:cleanup-worktree`

**目的**: 完了したworktreeの整理

**機能**:
- マージ済みブランチの特定
- worktreeの削除
- ローカルブランチのクリーンアップ

**実装内容**:
```markdown
# 完了したworktreeを整理します

!git branch --merged main
!ls worktrees/
!gh pr list --state merged --json number,headRefName

マージ済みのPull Requestに対応するworktreeを特定し、以下の整理を行ってください:

1. マージ済みブランチの一覧表示
2. 対応するworktreeの特定
3. 安全な削除の確認
4. worktreeとブランチの削除実行

削除前に重要な変更が失われないことを確認してください。
```

## 品質管理系コマンド

### `/project:test-issue`

**目的**: Issue関連のテスト実行

**機能**:
- 変更されたファイルに関連するテストを特定
- テストの実行と結果の確認
- カバレッジの確認

**実装内容**:
```markdown
# 現在のIssue作業に関連するテストを実行します

!git diff --name-only main...HEAD
!find . -name "*.test.*" -o -name "*_test.*" -o -name "test_*"

変更されたファイルに関連するテストを特定し、実行してください:

1. 変更ファイルの一覧取得
2. 関連テストファイルの特定
3. テスト実行とレポート生成
4. 失敗したテストの分析

テスト結果を分析し、Issue要件との整合性を確認してください。
```

### `/project:lint-fix`

**目的**: コードスタイルの統一と修正

**機能**:
- 利用可能なリンターの検出
- 自動修正の実行
- スタイルガイドの適用

**実装内容**:
```markdown
# コードスタイルをチェックし、自動修正を実行します

!find . -name "package.json" -o -name "Cargo.toml" -o -name "pyproject.toml" | head -5
!git diff --name-only --cached

プロジェクトの設定ファイルを確認し、適切なリンター/フォーマッターを実行してください:

1. プロジェクトタイプの特定
2. 利用可能なツールの確認 (eslint, prettier, rustfmt, black等)
3. 自動修正の実行
4. 修正内容の確認

修正後は変更内容を確認し、意図しない変更がないことを確認してください。
```

## コマンド管理

### インストール方法

```bash
# コマンドディレクトリの作成
mkdir -p .claude/commands

# 各コマンドファイルの配置
# (実装時に個別のMarkdownファイルを作成)
```

### 命名規則

- Issue連携: `issue-{action}`
- 開発支援: `{action}-{target}`
- 品質管理: `{tool}-{action}`

### 拡張性

各コマンドは独立して動作し、プロジェクトの特性に応じてカスタマイズ可能です。追加のツールや要件に応じて新しいコマンドを容易に追加できます。