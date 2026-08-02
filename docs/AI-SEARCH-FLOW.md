# D1OS AI Search Flow

Version: 1.0

---

## 目的

AIがD1OS Knowledge Baseから必要な情報を取得するときの参照順序を固定する。

---

## 基本検索フロー

AIは、次の順番で情報を参照する。

1. Runtime Export を確認する
2. AI Reference を確認する
3. AI Index を確認する
4. Knowledge Map を確認する
5. Tag で絞り込む
6. 詳細資料を確認する

### Step 1: Runtime Export を確認する

場所:

- [migration/D1OS-RUNTIME-EXPORT-001.md](../migration/D1OS-RUNTIME-EXPORT-001.md)

確認内容:

- 現在位置
- Version
- Next Action
- Open Issues

目的:

現在の開発状態を理解する。

### Step 2: AI Reference を確認する

場所:

- [docs/AI-REFERENCE.md](AI-REFERENCE.md)

確認内容:

- 重要資料
- 基本ルール
- 参照先

### Step 3: AI Index を確認する

場所:

- [docs/AI-INDEX.md](AI-INDEX.md)

確認内容:

- 資料一覧
- 主要な参照先

### Step 4: Knowledge Map を確認する

場所:

- [docs/KNOWLEDGE-MAP.md](KNOWLEDGE-MAP.md)

確認内容:

- 目的別の資料場所

### Step 5: Tag で絞り込む

場所:

- [docs/development/AI-TAGS.md](development/AI-TAGS.md)

確認内容:

- 関連タグ
- 該当文書

### Step 6: 詳細資料を確認する

対象:

- DOC
- Architecture
- Development
- History

---

## 禁止事項

AIは、次を行わない。

- 不明な情報を推測しない
- 最新状態を確認せず変更しない
- 過去設計を勝手に変更しない
- 参照順序を飛ばして直接結論を出さない

## 検索手順の標準ルール

- まず Runtime Export で現在状態を把握する
- 次に AI Reference と AI Index で入口を確認する
- その後、必要な文書だけをタグや目的別に選択する
- 情報が不足している場合のみ、追加確認を行う
- 追加確認が必要な場合は、ユーザーへ最小限の質問を行う

---

## 開発再開条件

作業開始前に、次を確認する。

- Current State を確認した
- Decision を確認した
- Next Action を確認した
- 必要資料を確認した

---

## Version管理

- Version: 1.0
- 変更時は差分更新する