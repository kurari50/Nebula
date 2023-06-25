// ReactとReactDOM/clientライブラリをインポートする。
import React from "react";
import ReactDOM from "react-dom/client";

// Appコンポーネントをインポートする。
import App from "./App";

// reportWebVitals関数をインポートする。
import reportWebVitals from "./reportWebVitals";

// HashRouterをインポートする。
import { HashRouter as Router } from "react-router-dom";

// ReactDOMがレンダリングするためのルートオブジェクトを作成する。
// createRoot関数を使用してルートを作成する。
const root = ReactDOM.createRoot(
    // レンダリングするルート要素を渡す。
    document.getElementById("root") as HTMLElement
);

// const basename=process.env.PUBLIC_URL
const basename = "/";

// ルートオブジェクト上のrender関数を呼び出す。
// React.StrictModeコンポーネントでラップされたAppコンポーネントをレンダリングする。
const render = () => {
    root.render(
        <React.StrictMode>
            <Router basename={basename}>
                <App />
            </Router>
        </React.StrictMode>
    );
};

// render関数を呼び出す。
render();

// reportWebVitals関数を呼び出す。
reportWebVitals();
