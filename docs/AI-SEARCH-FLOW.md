# D1OS AI Search Flow

Version: 1.0

目的：

AIがD1OS Knowledge Baseから必要な情報を取得するときの参照順序を固定する。

---

# 基本検索フロー

## Step 1

Runtime Export確認

場所：

migration/

確認内容：

- 現在位置
- Version
- Next Action
- Open Issues

目的：

現在の開発状態を理解する。

---

## Step 2

AI-REFERENCE確認

場所：

docs/AI-REFERENCE.md

確認内容：

- 重要資料
- 基本ルール
- 参照先

---

## Step 3

AI-INDEX確認

場所：

docs/AI-INDEX.md

確認内容：

資料一覧。

---

## Step 4

Knowledge Map確認

場所：

docs/KNOWLEDGE-MAP.md

確認内容：

目的別の資料場所。

---

## Step 5

Tag検索

場所：

docs/development/AI-TAGS.md

確認内容：

関連タグ。

---

## Step 6

詳細資料確認

対象：

- DOC
- Architecture
- Development
- History

---

# 禁止事項

AIは、

- 不明な情報を推測しない
- 最新状態を確認せず変更しない
- 過去設計を勝手に変更しない

---

# 開発再開条件

以下を確認後、作業開始。

□ Current State確認

□ Decision確認

□ Next Action確認

□ 必要資料確認

---

# Version管理

Version:

1.0

変更時は差分更新する。