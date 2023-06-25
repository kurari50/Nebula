# Nebula

## リポジトリ

[https://github.com/kurari50/Nebula](https://github.com/kurari50/Nebula)

## Pages

[https://kurari50.github.io/Nebula/](https://kurari50.github.io/Nebula/)

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
