# D1OS AI TAGS

# AI Tag System Version 1

Version: 1.0

---

## 目的

この文書は、D1OS Knowledge BaseをAIが分類・検索・参照しやすいようにするためのタグ体系である。

Version 1 では、基本的な作業分類を定義し、AIが文書を素早く選択できる状態を目指す。

---

## 1. タグ体系の基本方針

- 1文書につき、主要な目的に応じて1つ以上のタグを付与する
- 役割ごとにタグを分け、内容が重複しないようにする
- AIはタグに基づいて、必要な文書だけを読み進める
- 新しい文書を追加した場合は、該当タグを更新する

---

## 2. タグ一覧

### TAG : Setup

対象：開発環境の構築・復元・初期設定

読む文書：

- [DOC-001_X11開発環境構築ガイド.md](DOC-001_X11開発環境構築ガイド.md)

### TAG : GitHub

対象：GitHubの登録・運用・共有・同期作業

読む文書：

- [README.md](../../README.md)
- [D1OS-GH-001_GitHub運用マニュアル.md](D1OS-GH-001_GitHub運用マニュアル.md)
- [D1OS-GH-002_KnowledgeBase登録ルール.md](D1OS-GH-002_KnowledgeBase登録ルール.md)
- [D1OS-GH-003_GitHubシステム運用ルール.md](D1OS-GH-003_GitHubシステム運用ルール.md)

### TAG : KnowledgeBase

対象：Knowledge Baseへ保存すべき情報の整理と登録ルール

読む文書：

- [DOC-002_GitHub知識ベース運用規約.md](DOC-002_GitHub知識ベース運用規約.md)
- [D1OS-GH-002_KnowledgeBase登録ルール.md](D1OS-GH-002_KnowledgeBase登録ルール.md)

### TAG : Migration

対象：Migration Export、引き継ぎ情報、現在状態の確認

読む文書：

- [../migration/D1OS-RUNTIME-EXPORT-001.md](../migration/D1OS-RUNTIME-EXPORT-001.md)

### TAG : Runtime

対象：実行環境、動作確認、実運用時の確認

読む文書：

- [../migration/D1OS-RUNTIME-EXPORT-001.md](../migration/D1OS-RUNTIME-EXPORT-001.md)

### TAG : Development

対象：開発作業全般、運用ルール、追加情報の確認

読む文書：

- [README.md](README.md)
- [docs/development/](.)

---

## 3. タグ付けルール

- 文章の主目的が環境構築なら Setup を付与する
- GitHub操作や保存作業なら GitHub を付与する
- Knowledge Baseへ登録する内容なら KnowledgeBase を付与する
- 引き継ぎ・現在状態の確認なら Migration を付与する
- 実行確認や運用確認なら Runtime を付与する
- 開発全般の補助資料なら Development を付与する

---

## 4. AI向け利用方法

AIは、作業内容に応じて適切なタグを選び、そのタグに対応する文書だけを読み進める。

例：

- 環境構築の作業 → Setup
- GitHubへ保存する作業 → GitHub
- 知識を登録する作業 → KnowledgeBase
- 現在状態を確認する作業 → Migration

---

## 5. Version管理

- Version 1.0: 基本タグ体系を定義
- 将来の更新時は、タグ追加・名称変更・読み順変更を明記する
- 既存のタグを削除するより、互換性を維持しながら拡張する


