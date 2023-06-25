import React, { useEffect, useState } from "react";

// Reactのコンポーネントのインターフェースを定義する
interface GithubIssue {
    id: number;
    title: string;
    body: string;
    html_url: string;
}

// Reactのコンポーネントを定義する
const IssueList: React.FC = () => {
    // Reactのコンポーネントのstateを定義する
    const [issues, setIssues] = useState<GithubIssue[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Reactのコンポーネントのライフサイクルの一部の処理を記述する
    useEffect(() => {
        // 非同期処理を呼び出す
        fetchIssues()
            .then((data) => {
                console.log("Issues: " + JSON.stringify(data));
                // stateを更新する
                setIssues(data);
            })
            .catch((err) => {
                console.error("Error: " + err.message);
                setError(err.message);
            });
    }, []);

    // stateに応じてコンポーネントの描画を行う
    if (error) {
        return <p>{error}</p>;
    }

    return <div>{issues.map(renderIssue)}</div>;
};

// 改行コードで文字列を分割する
function splitLines(str: string): string[] {
    return str.split("\n");
}

// 改行コードを削除する
function removeCRLN(str: string): string {
    return str.replace(/\r?\n/g, "");
}

// 文字列をpタグで囲む
function stringToP(str: string): JSX.Element {
    return <p>{`${str}`}</p>;
}

// stateに応じてコンポーネントの描画を行う
function renderIssue(issue: GithubIssue) {
    console.log("Rendering issue " + issue.id);
    return (
        <div key={issue.id}>
            <h2>
                <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {issue.title}
                </a>
            </h2>
            {splitLines(issue.body ?? "")
                .map(removeCRLN)
                .map(stringToP)}
        </div>
    );
}

// 非同期処理を呼び出す
async function fetchIssues(): Promise<GithubIssue[]> {
    console.log("Fetching issues");
    const response = await fetch(
        "https://api.github.com/repos/kurari50/Nebula/issues"
    );
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export default IssueList;
