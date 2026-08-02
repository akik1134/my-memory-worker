# D1OS GitHub System 運用確認チェックリスト

Version: 1.0

---

## 目的

D1OS GitHub Systemの運用状態を確認し、正常に利用できるかを判定する。

---

## 1. Repository確認

- [ ] GitHub Repositoryへアクセス可能
- [ ] worker.jsが存在する
- [ ] docsフォルダが存在する
- [ ] migrationフォルダが存在する

---

## 2. Knowledge Base確認

確認ファイル：

- [ ] docs/AI-INDEX.md
- [ ] docs/AI-REFERENCE.md
- [ ] docs/KNOWLEDGE-MAP.md
- [ ] docs/AI-SEARCH-FLOW.md

---

## 3. Development Document確認

対象ファイル：

- [ ] docs/development/DOC-001_X11開発環境構築ガイド.md
- [ ] docs/development/DOC-002_GitHub知識ベース運用規約.md
- [ ] docs/development/D1OS-GH-001_GitHub運用マニュアル.md
- [ ] docs/development/D1OS-GH-002_KnowledgeBase登録ルール.md
- [ ] docs/development/D1OS-GH-003_GitHubシステム運用ルール.md
- [ ] docs/development/AI-TAGS.md

---

## 4. Migration確認

- [ ] migration/D1OS-RUNTIME-EXPORT-001.md
- [ ] migration/D1OS-RUNTIME-EXPORT-LITE.md

---

## 5. AI復元テスト

AIへ渡す情報：

1. Runtime Export
2. AI-REFERENCE
3. AI-INDEX
4. Knowledge Map
5. AI-TAGS

確認項目：

- [ ] Current Stateを理解できる
- [ ] Next Actionを理解できる
- [ ] 作業再開が可能である

---

## 6. Git確認

PowerShellで次を実行する。

```bash
git status
```

正常条件：

```text
nothing to commit, working tree clean
```

---

## 完了判定

全項目を確認したうえで、次の状態とする。

- [ ] D1OS GitHub System READY