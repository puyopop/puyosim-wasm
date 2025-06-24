# Claude Code × GitHub Issues 開発ワークフロー

## 概要

GitHub Issuesを起点としたClaude Code活用の開発ワークフローです。git worktreeを利用して各Issueごとに独立した作業環境を構築し、並列開発を可能にします。

## ワークフロー設計

### 基本フロー

1. **Issue作成**: GitHub上でIssueを作成
2. **Worktree作成**: Issue番号に基づいてworktreeを作成
3. **Claude連携**: IssueをClaude Codeに読み込ませて作業開始
4. **並列開発**: 複数のIssueを同時進行
5. **完了処理**: 適切なコミットメッセージでコミット・PR作成

### ディレクトリ構成

```
project-root/
├── .claude/
│   └── commands/           # プロジェクト固有のカスタムコマンド
├── worktrees/
│   ├── issue-123/         # Issue #123の作業ディレクトリ
│   ├── issue-456/         # Issue #456の作業ディレクトリ
│   └── ...
├── main branch (メイン開発ブランチ)
└── other files...
```

### Git Worktree活用

- **メインブランチ**: 常に本体のコードベースを維持
- **Issue別ブランチ**: 各Issue専用のブランチとworktreeを作成
- **並列開発**: 複数のIssueを同時に進行可能
- **独立性**: 各作業環境が独立し、相互に影響しない

## カスタムコマンド設計

### Issue連携系コマンド

#### `/project:issue-start [issue_number]`
- GitHub IssueからWorktreeを作成し、Claude Codeに読み込み
- Issue内容を解析してタスクを整理
- 作業開始の準備を自動化

#### `/project:issue-read [issue_number]`
- 指定されたIssueの内容をClaude Codeに読み込み
- 現在のworktreeでの作業内容と関連付け

#### `/project:issue-sync`
- 現在のworktreeに関連するIssueの最新情報を取得
- コメントや変更内容を確認

### 開発支援系コマンド

#### `/project:commit-smart`
- 現在の変更内容を分析
- 適切なコミットメッセージを自動生成
- Issue番号を含むコミット作成

#### `/project:pr-create`
- 現在のworktreeから自動的にPull Request作成
- Issue情報を基にPR説明を生成
- 適切なラベルやレビュアーを設定

#### `/project:cleanup-worktree`
- 完了したIssueのworktreeを整理
- マージ済みブランチの削除
- 作業環境のクリーンアップ

### 品質管理系コマンド

#### `/project:test-issue`
- 現在のIssue作業でのテスト実行
- 変更内容に関連するテストの特定と実行

#### `/project:lint-fix`
- 現在のworktreeでのリント実行と自動修正
- コードスタイルの統一

## メリット

1. **並列開発**: 複数のIssueを同時進行可能
2. **独立性**: 各作業が相互に影響しない
3. **効率性**: Issue情報の自動読み込みでコンテキスト切り替えが高速
4. **品質**: 自動化されたコミット・PR作成で一貫性を保持
5. **管理性**: worktreeごとの作業でファイル競合を回避

## 実装方針

- Claude Codeのカスタムコマンド機能を最大限活用
- GitHub CLI (`gh`)を組み合わせた自動化
- git worktreeの効率的な管理
- Issue駆動開発のベストプラクティス適用