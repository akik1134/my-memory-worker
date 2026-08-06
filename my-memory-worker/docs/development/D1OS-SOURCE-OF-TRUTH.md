# D1OS Source of Truth

Version: 1.0

---

## 目的

worker.js の正本（Source of Truth）を定義し、重複整理時の判断基準を統一する。

---

## 1. Source of Truth の定義

以下を、D1OSの標準的な正本とする。

- Gatewayから実際に呼ばれている実装
- 現在運用中の実装
- Deploy実績がある実装
- 最新コメント付きの実装

この条件を満たすものを正式版として扱う。

---

## 2. Search Layer の判定

### 正本（Primary）

対象箇所:

- Lines 1482〜1653

対象関数:

- searchTitle
- searchSummary
- searchTag
- searchTags
- searchCategory
- searchDate

理由:

- Gatewayから直接参照されている
- Action Registryから参照されている
- 現在運用中の実装である

### Legacy候補

対象箇所:

- Lines 4754〜4969

対象関数:

- searchTitle
- searchSummary
- searchTag
- searchTags
- searchCategory
- searchDate

状態:

- Legacy Candidate
- 削除禁止

---

## 3. 削除条件

以下をすべて満たした場合のみ削除可能とする。

- 呼び出し元が存在しない
- Deploy成功確認済み
- Git Commit済み
- Runtime Exportへ記録済み

---

## 4. D1OS標準ルール

Source of Truth を変更する場合は、次の3点を必須とする。

1. GitHub更新
2. Deploy確認
3. Runtime Export更新

---

## 5. 運用上の注意

- 変更前に正本を確認する
- 複数候補がある場合は、呼び出し元と実運用状況を優先する
- 推測による置き換えは禁止する


## Search Layer統合判断

Date:
2026-08-02

Status:
Confirmed

Primary:
1482-1653 Search Layer

Legacy:
4754-4969 Search Layer

Action:
Legacy保留

Reason:
Runtime影響防止のため、
完全利用確認後に削除判断する。