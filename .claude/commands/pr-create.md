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