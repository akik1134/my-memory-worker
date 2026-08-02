# D1OS GitHub System Test Checklist

Version: 1.0

目的：

D1OS GitHub Systemが正常に運用できる状態か確認する。

---

# 1. Repository確認

□ GitHub Repositoryへアクセス可能

□ worker.js存在確認

□ docsフォルダ存在確認

□ migrationフォルダ存在確認

---

# 2. Knowledge Base確認

確認ファイル：

docs/

□ AI-INDEX.md

□ AI-REFERENCE.md

□ KNOWLEDGE-MAP.md

□ AI-SEARCH-FLOW.md

---

# 3. Development Document確認

docs/development/

□ DOC-001

□ DOC-002

□ D1OS-GH-001

□ D1OS-GH-002

□ D1OS-GH-003

□ AI-TAGS

---

# 4. Migration確認

migration/

□ D1OS-RUNTIME-EXPORT-001.md

□ D1OS-RUNTIME-EXPORT-LITE.md

---

# 5. AI復元テスト

AIへ渡す情報：

1.
Runtime Export

2.
AI-REFERENCE

3.
AI-INDEX

4.
Knowledge Map

5.
AI-TAGS

確認：

□ Current State理解

□ Next Action理解

□ 作業再開可能

---

# 6. Git確認

PowerShell:

git status

正常：

nothing to commit, working tree clean

---

# 完了判定

全項目確認後：

D1OS GitHub System READY

とする。