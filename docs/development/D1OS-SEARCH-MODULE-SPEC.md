# D1OS Search Module Specification

Version: 1.0

---

## 目的

worker.js内の検索系関数をSearch Moduleへ分離する。

現段階では設計のみ行い、
worker.jsは変更しない。

---

## 対象関数

searchMemory()

searchTitle()

searchTag()

searchTags()

searchCategory()

searchSummary()

searchDate()

searchPriority()

---

## モジュール構成

modules/

└── search/

    ├── searchMemory.js

    ├── searchTitle.js

    ├── searchTag.js

    ├── searchTags.js

    ├── searchCategory.js

    ├── searchSummary.js

    ├── searchDate.js

    └── searchPriority.js

---

## 分離条件

1.

worker.jsと同じ動作を維持する

2.

Gateway側の呼び出しを変更しない

3.

Runtimeとの互換性を維持する

4.

Registryへ影響を与えない

---

## 実装順

① searchMemory

② searchTitle

③ searchTag

④ searchTags

⑤ searchCategory

⑥ searchSummary

⑦ searchDate

⑧ searchPriority

---

## 備考

重複関数は削除せず、

実際の利用状況を確認後に統合する。