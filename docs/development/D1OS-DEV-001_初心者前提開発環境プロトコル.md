# D1OS-DEV-001

# Development Environment Protocol

Version: 1.0

---

# Purpose

本ドキュメントは、D1OS開発環境においてAIが作業指示を行う際の、開発環境操作ルールを定義する。

目的は、プログラミング経験者には暗黙知となっている開発作業上の前提条件を明文化し、初心者状態から開発を継続できる環境を構築することである。

対象：

- AIアシスタント
- 開発作業支援プロセス
- GitHub Knowledge Base
- Migration Runtime

---

# Role

D1OS-DEV-001の役割：


AI作業指示プロトコル

初心者前提の開発環境制御ルール

作業状態保持プロトコル


である。

本ドキュメントは、コード変更方法ではなく、

「コード変更を安全に行うための環境操作条件」

を管理する。

---

# Core Principle

D1OS開発では、


コード知識

だけではなく、

開発環境操作知識

も必要情報として扱う。


理由：

初心者開発者の場合、

経験者にとって当然の操作でも、
作業継続性や安全性に大きく影響するため。

---

# 1. Terminal / PowerShell Management Rule

## 基本原則

PowerShellやTerminalは、単なる入力画面ではない。

現在の作業状態を保持する実行環境である。

---

## 禁止事項

AIは、以下を暗黙知として扱ってはいけない。

例：


新しいPowerShellを開いた場合、
古いPowerShellを閉じても問題ない


これは状況によって誤りになる。

---

## 作業中Terminal保持ルール

以下の場合：


wrangler dev

npm run dev

watch mode

local server

debug process

runtime verification


を実行中の場合、

そのTerminalは保持する。

---

理由：

実行中プロセス、

接続状態、

ログ出力、

環境状態

を保持しているため。

---

# 2. Terminal切替ルール

新しいPowerShellを使用する場合：


新規Terminalを開く

↓

既存Terminal状態確認

↓

必要なら既存Terminal保持

↓

作業継続


を基本とする。

---

複数Terminal利用例：


Terminal A

wrangler dev起動
(local server)

Terminal B

curl
Invoke-WebRequest
検証コマンド

Terminal C

Git操作
ファイル確認


---

# 3. Command Output Handling Rule

PowerShell出力を扱う場合、

AIは初心者が以下を知らない前提で説明する。

---

## 明示する内容

必要に応じて：


入力する場所

コピー対象範囲

コピーしてはいけない部分

実行結果の確認場所


を説明する。

---

## PowerShell表示例

以下は入力対象ではない。


PS C:\Users\Project>


これは現在位置表示である。

---

# 4. Current Location Verification Rule

作業開始前：

必ず現在位置を確認する。

使用例：

```powershell
pwd

または

Get-Location

確認対象：

対象Project

対象Repository

対象Folder

5. File Operation Rule

ファイル操作では、

AIは必ず以下を明示する。

対象フォルダ

対象ファイル

変更内容

変更理由

確認方法


禁止：

適当に移動してください

コピーしてください

修正してください


など、初心者が判断できない指示。

6. Development State Preservation Rule

作業途中状態は重要な開発情報である。

保持対象：

現在Terminal状態

実行中Process

Deploy状態

変更済みFile

確認済み結果

7. Verification Operation Rule

Verification作業では、

以下を分離する。

Server起動

↓

Server状態確認

↓

Request送信

↓

Response確認

例：

wrangler devの場合：

Terminal A

wrangler dev


Terminal B

curl
Invoke-WebRequest

8. AI Instruction Standard

AIが作業指示を出す場合：

必ず初心者基準で説明する。

基準：

知らない可能性がある

↓

説明する

↓

操作理由を伝える

↓

確認する
9. Error Investigation Rule

エラー発生時：

一点集中で長時間停止しない。

判断順：

原因確認

↓

影響範囲確認

↓

回避可能性確認

↓

優先順位判断

必要なら：

一旦保留

↓

別作業進行

↓

後で再調査


を選択可能。

10. D1OS Development Philosophy

D1OSでは、

初心者であることを前提条件として扱う。

問題は、

「知らなかったこと」

ではなく、

「知らない可能性がある情報がシステム化されていなかったこと」

として扱う。

AI Operation Summary

AIはD1OS開発時、

以下を確認する。

□ 現在位置確認

□ 使用Terminal確認

□ 実行中Process確認

□ 対象File確認

□ 変更範囲確認

□ Verification方法確認

□ 完了条件確認
End

D1OS-DEV-001

Development Environment Protocol

Version 1.0