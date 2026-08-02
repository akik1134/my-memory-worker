# D1OS worker.js リファクタリング計画

Version: 1.0

---

## 目的

worker.js（約5000行）の可読性・保守性・拡張性を向上させる。

機能を変更することなく、構造を整理し、安全にモジュール化できる状態を作る。

---

## 基本方針

- 動作変更は禁止
- 1STEPにつき1ブロックのみ整理する
- Deploy成功後のみ次工程へ進める
- Git Commitを必須とする
- Runtime Exportへ変更履歴を残す

---

## 整理優先順位

1. Search Layer
2. CRUD Layer
3. Gateway Helper
4. Registry Layer
5. Runtime Layer
6. Diagnostics

---

## 重複整理ルール

1. 完全一致のみ削除対象とする
2. 動作差異がある場合は削除しない
3. Gatewayから参照される関数を優先する
4. Legacy関数はBridge化して段階的に削除する
5. Deploy成功確認後のみ削除する

---

## 1STEPの最大変更量

- 1ブロックのみ
- 100〜300行以内
- Deploy成功必須
- Git Commit必須

---

## 実行フェーズ

### Phase 1: Search Layer

- 検索系関数を整理する
- Search Moduleへの移行準備を行う

### Phase 2: CRUD Layer

- CRUD関連関数を整理する
- データアクセスの責務を明確にする

### Phase 3: Gateway Helper

- Gateway側の補助関数を整理する
- 呼び出し関係を明確にする

### Phase 4: Registry Layer

- Registry関連の責務を整理する
- 登録・参照の流れを整理する

### Phase 5: Runtime Layer

- Runtime関連の責務を整理する
- 実行制御を分離する

### Phase 6: Diagnostics

- 診断・監視用の処理を整理する
- 保守性を高める

---

## 完了条件

- Search Layerが整理済み
- CRUD Layerが整理済み
- Registryが整理済み
- Runtimeが整理済み
- worker.jsの構造がモジュール化しやすい状態になっている