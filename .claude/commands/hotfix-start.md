# 緊急修正: "$ARGUMENTS" のためのhotfixを開始します

!git checkout main
!git pull origin main
!gh issue create --title "🚨 Hotfix: $ARGUMENTS" --body "緊急修正が必要です。詳細: $ARGUMENTS" --label "hotfix,priority:high"

緊急修正のセットアップを実行してください:

1. **メインブランチの更新**
   - 最新状態に同期
   - クリーンな状態を確認

2. **緊急Issue作成**
   - 高優先度ラベルを付与
   - 緊急度を明示

3. **Hotfixブランチとworktree作成**
   - hotfix/緊急修正内容 形式のブランチ
   - 専用worktreeで作業環境準備

4. **チーム通知**
   - 緊急修正開始の通知準備
   - レビュアーのアサイン準備

緊急修正: $ARGUMENTS