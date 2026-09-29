# Mini Shop（Claude Code デモ用）

Claude Code のライブデモで使う、小さな EC サイト。商品一覧とカートの 2 画面だけ。
決済・ログイン・データ保存はなく、カートの状態はページを再読み込みすると消える。

## 起動

```bash
pnpm install
pnpm dev   # http://localhost:5173
```

## テスト・ビルド

```bash
pnpm test
pnpm build
```

## セミナーで見たデモを、手元で試す

2026-09-30 の「Claude Codeセミナー初級編」で実演したものと同じことが、このリポジトリで試せます。

必要なもの: Claude の有料プラン（Pro / Max / Team / Enterprise）と GitHub アカウント。

### 手順

1. **このリポジトリを自分のアカウントにコピーする**
   右上の **Fork** ボタンを押す。そのあと手元に取得する。
   ```bash
   git clone https://github.com/<あなたのアカウント>/mini-shop-demo.git
   cd mini-shop-demo
   pnpm install
   ```

2. **Claude デスクトップアプリで開く**
   アプリの **Code** タブ → **Select folder** で、いま取得したフォルダを選ぶ。
   ターミナルは使いません。

3. **issue を 1 つ選ぶ**
   Fork した自分のリポジトリの Issues タブを開く。Fork では issue がコピーされないので、
   `docs/demo-issues.md` の内容を貼り付けて自分で登録してください。
   3 つ用意してあり、**#1 がいちばん小さい** ので最初はそこから。

   | issue | 内容 | 目安 |
   |---|---|---|
   | S | ヘッダーのカートに商品点数を表示する | 表示だけ、1 ファイル |
   | M | 5,000円以上で送料無料にして、あと何円かを表示する | 2 ファイル + テスト |
   | L | クーポンコードを入力できるようにする | やや大きめ |

4. **一言だけ入力する**
   ```
   issue #1 を対応して。ブラウザで動作確認して、その証拠を付けて PR を出して。
   ```
   あとは Claude Code が、コードを読む → 直す → テストを実行する →
   ブラウザで画面を確認する → PR を出す、まで進めます。

### うまくいかないときは

- **開発サーバーが起動しない**: `pnpm install` が終わっているか確認する
- **途中で許可を求められる**: そのまま許可してよい。`.claude/settings.json` で
  よく使うコマンドは許可済みだが、環境によっては追加で聞かれる
- **PR が作れない**: GitHub との連携（`gh auth login`）が済んでいるか確認する
- **ブラウザが開かない**: デスクトップアプリの Browser ペイン（`Cmd+Shift+B`）を開いてから頼む

作業の進め方は `CLAUDE.md` に書いてあり、Claude Code はこれを読んでから動きます。

## 構成

```
src/
├── App.tsx                 # ヘッダー（検索・カート）、カテゴリ・画面の切り替え、カート状態、フッター
├── components/
│   ├── Cart.tsx            # カート（明細 + 注文内容ボックス）
│   ├── CategoryNav.tsx     # カテゴリのナビバー
│   ├── Price.tsx           # 金額表示（¥ を小さく）
│   ├── ProductImage.tsx    # 商品画像の代わり（アイコン）
│   ├── ProductList.tsx     # 商品一覧（バッジ・ポイント・残り点数つき）
│   ├── QuantityControl.tsx # 数量の増減（− n ＋）
│   └── Rating.tsx          # 星評価
├── data/products.ts        # 商品データ（固定配列、12点）
└── lib/
    ├── cart.ts             # 金額計算（小計・送料・合計・点数）
    ├── cart.test.ts
    ├── catalog.ts          # 絞り込み・ポイント計算
    └── catalog.test.ts
```
