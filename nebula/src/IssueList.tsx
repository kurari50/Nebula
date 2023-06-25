import React, { useEffect, useState } from 'react';

interface GithubIssue {
    id: number;
    title: string;
    body: string;
    html_url: string;
}

async function fetchIssues(): Promise<GithubIssue[]> {
    const response = await fetch('https://api.github.com/repos/kurari50/Nebula/issues');
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

const IssueList: React.FC = () => {
    const [issues, setIssues] = useState<GithubIssue[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchIssues().then(data => {
            console.log("Issues: " + JSON.stringify(data));
            setIssues(data);
        }).catch(err => {
            console.error("Error: " + err.message);
            setError(err.message);
        });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {issues.map(issue => (
                <div key={issue.id}>
                    <h2>
                        <a href={issue.html_url} target="_blank" rel="noopener noreferrer">{issue.title}</a>
                    </h2>
                    <p>{issue.body}</p>
                </div>
            ))}
        </div>
    );
}

export default IssueList;
