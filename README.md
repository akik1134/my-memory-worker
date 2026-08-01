# D1OS - my-memory-worker

## 概要

D1OSは、AIと人間が長期的に共同開発を続けるための外部記憶・開発基盤プロジェクトです。
このリポジトリでは、Cloudflare Workers と D1 Database を使った API サーバーを構成し、開発知識と復元手順を GitHub 上で管理できるようにしています。

## 主要な特徴

- Cloudflare Workers ベースの API 実装
- D1 Database との接続
- Hono + Chanfana + Zod による型安全な API 開発
- Vitest ベースのテスト構成
- 開発手順・環境構築・知識管理の文書化

## 技術スタック

- Node.js
- TypeScript
- Hono
- Chanfana
- Cloudflare Workers
- Cloudflare D1
- Wrangler
- Vitest

## リポジトリ構成

- [src/](src/) : アプリケーション本体の実装
- [tests/](tests/) : 統合テストと設定
- [migrations/](migrations/) : D1 マイグレーション SQL
- [docs/](docs/) : 開発ガイドと運用規約
- [worker.js](worker.js) : Worker エントリーポイント
- [wrangler.jsonc](wrangler.jsonc) : Wrangler 設定

## クイックスタート

### 1. 依存関係のインストール

```bash
npm install
```

### 2. ローカルDBの適用

```bash
npx wrangler d1 migrations apply DB --local
```

### 3. 開発サーバー起動

```bash
npx wrangler dev
```

### 4. テスト実行

```bash
npm test
```

## 開発ルール

D1OS では、以下の流れを基本とします。

1. 現在状態を確認する
2. 小さく変更する
3. 動作確認を行う
4. GitHub に保存する
5. 次の工程に進む

## ドキュメント

- [docs/development/](docs/development/) : 開発知識・運用規約
- [docs/development/README.md](docs/development/README.md) : Knowledge Base 文書の目次
- [docs/development/DOC-001_X11開発環境構築ガイド.md](docs/development/DOC-001_X11開発環境構築ガイド.md) : X11 開発環境構築手順
- [docs/development/DOC-002_GitHub知識ベース運用規約.md](docs/development/DOC-002_GitHub知識ベース運用規約.md) : GitHub 知識ベース運用規約
- [migration/](migration/) : Migration Export の保管場所
- [migration/README.md](migration/README.md) : Migration Export の目次
- [migration/D1OS-RUNTIME-EXPORT-001.md](migration/D1OS-RUNTIME-EXPORT-001.md) : Runtime Export の要点整理

## 目的

このリポジトリは、単なるコード保存先ではなく、D1OS の開発知識と設計判断を未来へ引き継ぐための基盤です。

## Knowledge Base 基盤

現在の構成は、以下の3点で成立しています。

- [docs/development/DOC-001_X11開発環境構築ガイド.md](docs/development/DOC-001_X11開発環境構築ガイド.md) : 開発環境の復元手順
- [docs/development/DOC-002_GitHub知識ベース運用規約.md](docs/development/DOC-002_GitHub知識ベース運用規約.md) : 知識保存と運用ルール
- [migration/D1OS-RUNTIME-EXPORT-001.md](migration/D1OS-RUNTIME-EXPORT-001.md) : 実行時状態と開発履歴のエクスポート

この3点を組み合わせることで、PC変更・AI変更・開発再開時にも、必要な情報を再利用できる状態を作っています。