# D1OS worker.js Structure Map

Version: 1.0

---

## 目的

worker.jsの構造を可視化し、モジュール分離や改修作業の対象を明確にする。

---

## Core Blocks

1. Export / Entry
   - worker.jsの入口
   - 外部公開用のエクスポート処理

2. Gateway Builder
   - Gatewayの生成と初期化
   - リクエスト処理の入口

3. Runtime Context
   - 実行時のコンテキスト管理
   - 状態や実行環境の保持

4. Action Registry
   - アクションの登録管理
   - 呼び出し対象の整理

5. Registry Loader
   - レジストリの読み込み処理

6. Full Update Memory
   - メモリ更新や状態反映処理

7. Request Context
   - リクエスト単位の情報保持

8. Response Builder
   - レスポンスの生成

9. Validation
   - 入力検証や整合性チェック

10. Search Functions
   - 検索系のロジック

11. Gateway Helper
   - Gateway処理の補助関数

12. Handler Registry
   - Handlerの登録管理

13. Registry Diagnostics
   - レジストリ状態の確認・診断

14. Runtime Engine
   - 実行エンジン本体

15. CRUD API
   - データ作成・読み取り・更新・削除系

16. Search API (Legacy Bridge)
   - 既存の検索API互換橋渡し

---

## 改修方針

優先順位は次のとおりとする。

1. 重複関数整理
2. Search Layer統合
3. CRUD Layer整理
4. Registry整理
5. Runtime整理
6. Module化

---

## モジュール化の方針

- 入口部分は gateway へ寄せる
- 検索処理は search モジュールへ寄せる
- データ操作は database / handlers へ寄せる
- 共通処理は utils へ寄せる
- Runtime関連は runtime モジュールへ寄せる