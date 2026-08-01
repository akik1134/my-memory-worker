# D1OS Restore Guide

## Project

D1OS（SIL-SUB-BRAIN）

Cloudflare Workers + Cloudflare D1による外部Memory OS。

---

# Current Stable State

## GitHub

Repository:

akik1134/my-memory-worker


Branch:

main


Current stable commit:

735d90e

---

# Worker

Worker name:

my-memory-worker


Main file:

worker.js


Current Source of Truth:

worker.js 約5004行版

---

# Cloudflare D1

Database:

sil-sub-brain-db


Database ID:

5a83c1d7-fb7c-4173-8590-9808d0dab876


Binding:

DB

---

# Required Environment

Required:

- Node.js
- npm
- Git
- VS Code
- Wrangler

---

# Restore Flow

## 1. Clone Repository

GitHubから取得。


## 2. Install Packages

npm install


## 3. Cloudflare Login

wrangler login


## 4. Check Configuration

確認:

wrangler.jsonc

確認項目:

- main = worker.js
- binding = DB
- database_name = sil-sub-brain-db


## 5. Deploy

wrangler deploy


## 6. Test

確認:

/health

/list

/save

---

# Development Rule

変更前:

git pull


変更後:

git add .

git commit -m "change description"

git push


---

# Source of Truth Rule

最新版基準:

GitHub main branch

重要ファイル:

worker.js

wrangler.jsonc

D1 Database設定

---

# Current Next Step

Version4開発準備前に、

開発環境固定化を完了する。