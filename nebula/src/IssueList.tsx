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
    console.log("Response: " + JSON.stringify(data));
    return data;
}

const IssueList: React.FC = () => {
    const [issues, setIssues] = useState<GithubIssue[]>([]);

    useEffect(() => {
        fetchIssues().then(data => {
            console.log("Issues: " + JSON.stringify(data));
            setIssues(data)});
    }, []);

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
