# D1OS Knowledge Map

このファイルは、D1OSの知識がどこに保存されているかを一覧化するための目次である。

---

## 1. 保存場所一覧

### 1.1 開発環境

- [docs/development/DOC-001_X11開発環境構築ガイド.md](development/DOC-001_X11開発環境構築ガイド.md)
- 目的: PC環境構築、Cloudflare設定、GitHub同期

### 1.2 運用ルール

- [docs/development/DOC-002_GitHub知識ベース運用規約.md](development/DOC-002_GitHub知識ベース運用規約.md)
- 目的: GitHub運用、Knowledge Base、D1OS標準ルール

### 1.3 GitHub運用

- [docs/development/D1OS-GH-001_GitHub運用マニュアル.md](development/D1OS-GH-001_GitHub運用マニュアル.md)
- [docs/development/D1OS-GH-002_KnowledgeBase登録ルール.md](development/D1OS-GH-002_KnowledgeBase登録ルール.md)
- [docs/D1OS-GH-003_GitHubシステム運用ルール.md](../D1OS-GH-003_GitHubシステム運用ルール.md)
- 目的: GitHubの登録手順、運用ルール、システム運用

### 1.4 Migration / 引き継ぎ

- [migration/D1OS-RUNTIME-EXPORT-001.md](../migration/D1OS-RUNTIME-EXPORT-001.md)
- 目的: Current State、Decision、Knowledge Delta、Next Action

### 1.5 AI参照入口

- [docs/AI-INDEX.md](AI-INDEX.md)
- [docs/AI-REFERENCE.md](AI-REFERENCE.md)
- [docs/development/AI-TAGS.md](development/AI-TAGS.md)
- 目的: AIがどの文書を読むべきかを判断するための入口

---

## 2. 使い方

- まずは [docs/AI-INDEX.md](AI-INDEX.md) を確認する
- 必要に応じて [docs/AI-REFERENCE.md](AI-REFERENCE.md) を参照する
- 具体的な作業内容は [docs/development/](development/) 配下の文書を確認する
- 現在の状態は [migration/D1OS-RUNTIME-EXPORT-001.md](../migration/D1OS-RUNTIME-EXPORT-001.md) を確認する

---

## 3. 保存先の基本方針

- 長期利用する知識は GitHub に保存する
- 現在状態の引き継ぎは Migration に保存する
- 実行環境の構築情報は開発環境ガイドに保存する
- AI向けの入口情報は AI INDEX / AI REFERENCE / AI TAGS に保存する