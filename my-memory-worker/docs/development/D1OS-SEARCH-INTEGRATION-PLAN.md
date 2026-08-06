# D1OS Search Layer 統合設計

Version: 1.0

---

## 目的

Search Layer を安全に統合し、検索機能を一元管理できる構造へ移行する。

---

## 現状

Search系関数は worker.js 内に複数存在する。

確認済みの対象：

- searchTitle
- searchSummary
- searchTag
- searchTags
- searchCategory
- searchDate

同名関数が存在するが、完全一致ではなく実装差異が確認されている。

---

## Source of Truth

統合時は次を正本とする。

- Gatewayから実際に呼ばれている実装
- 最新コメント付き実装
- Deploy実績がある実装

この3条件を満たすものを正式版とする。

---

## 統合ルール

1. 動作変更は禁止
2. 完全一致のみ削除候補とする
3. 差異がある場合は比較後に統合する
4. Deploy成功後のみ削除する
5. Git Commitを必須とする

---

## 統合フェーズ

### Phase 1: 入口確認

- Gatewayからの呼び出し関係を確認する
- 実際に使用される実装を特定する

### Phase 2: 実装比較

- 重複関数の差分を確認する
- 共通点と差分を整理する

### Phase 3: 統合実装

- 正式版実装を基準に統合する
- 互換性を維持したまま移行する

### Phase 4: 検証

- Deployを実行する
- テストまたは動作確認を行う
- 問題がなければ次に進む

---

## 今後の対象

1. searchTitle
2. searchSummary
3. searchTag
4. searchTags
5. searchCategory
6. searchDate

---

## 完了条件

- Search Layerの責務が明確になっている
- 重複関数の統合先が決まっている
- Gatewayからの呼び出しに影響がない
- Deploy成功後に次の統合へ進める