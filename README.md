# Nebula

https://github.com/kurari50/Nebula

## ツール類

以下のツール類を使用する。

- SourceTree
- Visual Studio Code
- Myrica

## Visual Studio Code 拡張機能

- ESLint
- Prettier
- IntelliCode

### 設定

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

## 構成

Reactで作成する。
