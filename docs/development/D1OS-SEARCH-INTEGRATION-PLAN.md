# D1OS Search Layer 統合設計

Version: 1.0

---

# 目的

Search Layer を安全に統合し、
検索機能を一元管理できる構造へ移行する。

---

# 現状

Search系関数は worker.js 内に複数存在する。

確認済み

- searchTitle
- searchSummary
- searchTag
- searchTags
- searchCategory
- searchDate

同名関数が存在するが、
完全一致ではなく実装差異が確認されている。

---

# Source of Truth

統合時は次を正本とする。

・Gatewayから実際に呼ばれている実装
・最新コメント付き実装
・Deploy実績がある実装

この3条件を満たすものを正式版とする。

---

# 統合ルール

1. 動作変更は禁止
2. 完全一致のみ削除候補
3. 差異がある場合は比較後に統合
4. Deploy成功後のみ削除
5. Git Commitを必須とする

---

# 今後の対象

Priority 1
searchTitle

Priority 2
searchSummary

Priority 3
searchTag

Priority 4
searchTags

Priority 5
searchCategory

Priority 6
searchDate