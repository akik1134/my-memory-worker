# D1OS Search Module Specification

Version: 1.0

---

## 目的

worker.js内の検索系関数をSearch Moduleへ分離する。

現段階では設計のみ行い、worker.jsは変更しない。

---

## 1. 対象関数

- searchMemory()
- searchTitle()
- searchTag()
- searchTags()
- searchCategory()
- searchSummary()
- searchDate()
- searchPriority()

---

## 2. モジュール構成

```text
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
```

---

## 3. 役割分担

- searchMemory(): メモリや記憶内容に基づく検索
- searchTitle(): タイトル検索
- searchTag(): 単一タグ検索
- searchTags(): 複数タグ検索
- searchCategory(): カテゴリ検索
- searchSummary(): 要約検索
- searchDate(): 日付検索
- searchPriority(): 優先度検索

---

## 4. 分離条件

1. worker.jsと同じ動作を維持する
2. Gateway側の呼び出しを変更しない
3. Runtimeとの互換性を維持する
4. Registryへ影響を与えない

---

## 5. 実装順

1. searchMemory
2. searchTitle
3. searchTag
4. searchTags
5. searchCategory
6. searchSummary
7. searchDate
8. searchPriority

---

## 6. 実装方針

- 各関数は独立したモジュールとして実装する
- 共通処理は utils 側へ集約する
- 既存の呼び出し元との互換性を優先する
- 初期実装では機能移行のみ行い、挙動変更はしない

---

## 7. 備考

重複関数は削除せず、実際の利用状況を確認後に統合する。