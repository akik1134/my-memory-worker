# D1OS-GH-003

# GitHubシステム運用ルール

Version: 1.0

---

## 1. 目的

GitHubをD1OS開発の長期知識基盤として運用する。

ChatGPTのスレッド容量に依存せず、設計・知識・運用ルールを継続して利用できる状態を維持する。

---

## 2. 各システムの役割

### ChatGPT

- 思考整理
- 設計支援
- コード作成
- レビュー
- Migration Export作成

### GitHub

- コード原本
- Knowledge Base
- 設計資料
- 運用ルール
- Migration保管

### Cloudflare

- Worker実行
- D1 Database
- 動作確認

### PowerShell

- Git操作
- Cloudflare操作
- 動作確認

---

## 3. 標準開発フロー

1. ChatGPTで設計・実装する
2. GitHubへ知識・文書を保存する
3. Gitでコミットする
4. GitHubへPushする
5. Migration Exportを更新する
6. 次のスレッドへ引き継ぐ

---

## 4. 基本原則

- GitHubを知識の原本（Source of Truth）とする
- Migration Exportは現在状態のみを保持する
- 長期利用する知識はGitHubへ保存する
- 未検証の内容はKnowledge Baseへ登録しない
- 同じ情報を重複保存しない

---

## 5. 知識の扱い

新しいノウハウやテンプレートを得た場合は、まず「複数回利用するか」を判断する。

- 複数回利用する場合はKnowledge Baseへ登録する
- 一時的な情報はMigration Exportまたはスレッド内のみで扱う

---

## 6. 運用ルール

- 変更内容は必ずGitHubに反映する
- 重要な変更は文書として残す
- 作業ごとに目的を明確にする
- 変更前後の状態を確認してから保存する

---

## 7. 運用開始

本書の作成をもって、D1OS GitHubシステムを正式運用開始とする。