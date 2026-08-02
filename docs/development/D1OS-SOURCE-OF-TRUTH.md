# D1OS Source of Truth

Version: 1.0

---

# 目的

worker.js の正本（Source of Truth）を定義し、
重複整理時の判断基準を統一する。

---

# Search Layer

## 正本（Primary）

Lines

1482 ～ 1653

Functions

- searchTitle
- searchSummary
- searchTag
- searchTags
- searchCategory
- searchDate

理由

- Gatewayから直接参照されている
- Action Registryから参照されている
- 現在運用中の実装である

---

## Legacy候補

Lines

4754 ～ 4969

Functions

- searchTitle
- searchSummary
- searchTag
- searchTags
- searchCategory
- searchDate

状態

Legacy Candidate

削除禁止

---

# 削除条件

以下をすべて満たした場合のみ削除可能。

- 呼び出し元が存在しない
- Deploy成功確認済み
- Git Commit済み
- Runtime Exportへ記録済み

---

# D1OS標準ルール

Source of Truth を変更する場合は、

1. GitHub更新
2. Deploy確認
3. Runtime Export更新

この3点を必須とする。