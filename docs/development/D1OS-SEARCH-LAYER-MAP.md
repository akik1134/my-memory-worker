# D1OS Search Layer Map

Version: 1.0

---

## 目的

worker.js内のSearch Layerを整理し、検索関連処理をモジュールとして扱いやすい構造にする。

---

## 1. Search Functions

| Function | Route | Status |
|----------|-------|--------|
| searchMemory | /search | Active |
| searchTitle | /title | Duplicate Candidate |
| searchSummary | /summary | Duplicate Candidate |
| searchTag | /tag | Duplicate Candidate |
| searchTags | /tags | Duplicate Candidate |
| searchCategory | /category | Duplicate Candidate |
| searchDate | /date | Duplicate Candidate |
| searchPriority | /priority | Active |

---

## 2. Search Helper

- GatewaySearchHelper
- GatewaySimpleGetter

これらは検索処理の補助関数として扱う。

---

## 3. Duplicate Investigation

### 前半 Search Layer
- 1477〜1653付近

### 後半 Search Layer
- 4750〜4969付近

### 現状判定

- 完全一致ではない
- 実装差異あり
- 削除禁止
- 今後統合対象

---

## 4. Target Structure

検索関連は、次のような構成を目指す。

- gateway: リクエスト入口
- search: 検索本体
- utils: 共通補助関数
- runtime: 実行時の制御

---

## 5. Refactoring Policy

- 動作変更はしない
- 既存呼び出しは維持する
- 重複処理は確認後に統合する
- 1段階ずつ分離する