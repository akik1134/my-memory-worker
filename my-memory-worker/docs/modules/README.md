# D1OS Modules

Version: 1.0

---

## 目的

worker.jsを安全にモジュール化するための配置先を定義する。

---

## モジュール構成

### gateway

- Gateway処理
- リクエストの入口関数
- ルーティングの責務

### registry

- Action Registry
- Handler Registry
- ルールや処理対象の登録管理

### handlers

- Action Handler群
- ビジネスロジックの実行部

### search

- 検索API
- Knowledge Baseや文書検索に関する処理

### database

- CRUD
- D1 Database操作
- 永続化周りの実装

### runtime

- Runtime
- Policy
- Decision
- 実行時の判断と制御

### utils

- 共通関数
- 文字列処理、補助関数、共通ユーティリティ

---

## 運用方針

- 1モジュール = 1責務を基本とする
- 依存関係はできるだけ単純にする
- 共通処理は utils に集約する
- 新しい機能は必要なモジュールへ追加する