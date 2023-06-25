# Nebula

## リポジトリ

[https://github.com/kurari50/Nebula](https://github.com/kurari50/Nebula)

## Pages

[https://kurari50.github.io/Nebula/](https://kurari50.github.io/Nebula/)

[https://kurari50.github.io/Nebula/nebula/](https://kurari50.github.io/Nebula/nebula/)

## ツール類

以下のツール類を使用する。

- SourceTree
- Visual Studio Code
- Myrica

## Visual Studio Code 拡張機能

- ESLint
- Prettier
- IntelliCode
- Live Preview

### Visual Studio Code 設定

ファイルの保存時に自動的にフォーマットを行うようにする。
ESLintとPrettierを一緒に使用するので、PrettierがESLintの設定を尊重するようにする。

```json
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.alwaysShowStatus": true,
    "prettier.eslintIntegration": true
}
```

## Live Previewの使い方

http://127.0.0.1:3001/nebula/ を表示する。

## 構成

Reactで作成する。

## 機能(目標)

アプリ開発のプロジェクト管理ツールっぽいものを作りたい。
ただ、最初はReactでのアプリ開発の練習をしていく感じになる。

- GitHubのIssue一覧を見る
- ChatGPTとチャットできる

できればアジャイル開発のプラクティスを取り入れていいツールにしていきたい。

## 開発

### .env

`nebula`フォルダに`.env`ファイルを作成して、以下を記載してください。

.envファイルに

```
REACT_APP_OPENAI_API_KEY="openai api key"
```

### ローカルでの動作確認

```bash
$ npm start
```

### ローカルでのビルド

```bash
$ npm run build
```

### GitHub Pagesへのデプロイ

```bash
$ npm run deploy
```
