# ユタカさんテスト環境 「配送情報」
アプリID 13

## 機能一覧
1. 配送情報アプリの文字化け変換機能

## 利用方法
### 事前準備(Node.jsのインストール)
https://nodejs.org/ でインストーラーをダウンロードして node.js をインストールします。
インストール後、``node -v``でnode.jsがインストールされているか確認してください。

インストールすると npm コマンドなどが使えるようになります。
コマンドラインで ``npm install`` と入力し実行します。package.json で定義されている依存ライブラリがインストールされます。

### kintoneアプリのフィールド情報から型情報を生成
@kintone/dts-genはkintoneのJavaScriptカスタマイズ用の関数定義に加えて、指定したアプリからフィールド情報を取り出すコマンドラインツールが同梱されています。
```bash
# npx @kintone/dts-gen ... も可能
# kintone.types.Fields, kintone.types.SavedFieldsがfields.d.tsに生成されます
npx kintone-dts-gen --base-url https://***.cybozu.com \
                                    -u username \
                                    -p password \
                                    --app-id アプリID
```
--base-url ... カスタマイズする予定のURL
-u ... ユーザー名
-p ... パスワード
--app-id ... カスタマイズするID
--type-name ... 出力する型名（未指定の場合Fields）
保存ずみの型としてSavedFields、保存前の型としてFieldsが生成されます。
--namespace ... 出力する名前空間（未指定の場合kintone.types）
-o ... 出力するファイル名（未指定の場合fields.d.ts）

上の例を実行するとfields.d.tsというkintoneのフィールド情報をもとにした型定義ファイルが生成されます。
kintoneのフィールド情報を更新したときはもう一度フィールド情報を作り直すようにしてください。
**生成されたfield.d.tsをsrcディレクトリ下に配置**しておきましょう。

### TypeScriptからJavaScriptへのトランスコンパイル
基本的にはsrc/ts配下のTSファイルで開発を進めます。
JSファイルに変換させる場合は、以下のコマンドを実行します。
```
npx webpack-cli
```
コマンド実行後、src/ts配下のTSファイルがトランスコンパイルされ、dist配下にJSファイルとして保存されます。


## JSファイルをアプリに反映させる
 JSファイルをkintoneに反映したいときは、このトランスパイルされたdist配下に生成されたJSファイルをアップロードします。
 拡張子js.mapのファイルは、デバッグに使うファイルなので、**kintoneのアプリ本体にはアップロードしません。**
