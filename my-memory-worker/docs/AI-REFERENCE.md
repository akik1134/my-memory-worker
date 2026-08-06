# AI Reference

## 目的

この文書は、AIがGitHubシステム内の情報を探すための入口である。

---

## 1. AI読込優先順位

AIは、次の順番で情報を読み取る。

1. migration/D1OS-RUNTIME-EXPORT-001.md
   - 現在の開発状態
   - Runtime Export
   - Next Action

2. docs/AI-REFERENCE.md
   - 参照の入口
   - 基本ルール

3. docs/AI-INDEX.md
   - 全体の目次
   - 主要文書への入口

4. docs/development/
   - 開発手順
   - 運用ルール
   - Knowledge Base

5. README.md
   - プロジェクト概要

この順序で不足する場合のみ、必要最小限の確認をユーザーへ行う。推測による補完は行わない。

---

## 2. 基本ルール

- 現在状態は migration を優先する。
- 詳細な知識は docs を参照する。
- 不明な事項は推測せず Unknown として扱う。
- 過去の履歴より最新の Runtime Export を優先する。

---

## 3. 参照テンプレート

### 3.1 依頼内容

- 目的：
- 対象範囲：
- 期待結果：

### 3.2 参照先

- 主要文書：
- 関連ルール：
- 必要な実行環境：

### 3.3 作業前確認

- 現在の状態を確認したか
- 既存ルールに矛盾しないか
- 重要な変更は文書化したか

---

## 4. 使い方

AIは、この文書を参照したうえで、必要な情報だけを読み取り、作業内容を実行する。


---

# AI読込優先順位

AIは次の順番で情報を参照する。

1. migration/D1OS-RUNTIME-EXPORT-001.md
2. docs/AI-REFERENCE.md
3. docs/AI-INDEX.md
4. docs/development/
5. README.md

この順序で不足する場合のみ、ユーザーへ必要最小限の確認を行う。
推測による補完は行わない。