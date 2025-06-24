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