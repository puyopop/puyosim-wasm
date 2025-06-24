# Issue #$ARGUMENTS の作業を開始します

!gh issue view $ARGUMENTS --json title,body,labels,assignees
!git worktree add worktrees/issue-$ARGUMENTS -b feature/issue-$ARGUMENTS
!cd worktrees/issue-$ARGUMENTS

Issue内容を分析してタスクリストを作成し、開発の準備を整えてください。以下の情報を基に作業計画を立案してください:

1. Issue番号: #$ARGUMENTS
2. 作業ディレクトリ: worktrees/issue-$ARGUMENTS
3. ブランチ名: feature/issue-$ARGUMENTS

TodoWriteツールを使用してタスクを整理し、体系的に作業を進めてください。