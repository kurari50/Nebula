
// ReactとReactDOM/clientライブラリをインポートする。

// Appコンポーネントをインポートする。

// reportWebVitals関数をインポートする。

// HashRouterをインポートする。

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

function Navbar() {
    return (
        <div>
            <Link to="/">Home</Link>
            <> / </>
            <Link to="/issues">Issues</Link>
            <> / </>
            <Link to="/ai">AI</Link>
        </div>
    );
}

// The App component is the main component that renders the entire application. It contains a navbar and a Router element that will render different components depending on the URL path.
// The navbar contains links to the home page, login page, and profile page. If the user is logged in, it also contains a logout link.
// The logout link calls a logout function, which clears the user token from local storage and sets the user state to null.


function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/issues" element={<Issues />} />
                <Route path="/ai" element={<ChatWithGPT />} />
            </Routes>
        </div>
    );
}


test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

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

// @ts-ignore

interface Message {
    role: "system" | "user" | "assistant";
    content: string;
}

// OpenAIのAPIを使うための設定
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

// OpenAIのAPIを使うためのクライアント
const openai = new OpenAIApi(configuration);

// GPT-3.5を使ってチャットボットを作る
async function chatWithGPT(messages: Message[]): Promise<ChatResponse> {
    // OpenAIのAPIを使ってメッセージを送る
    console.log("message", messages);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
    });
    console.log("response", response);

    return response;
}

// 改行コードで文字列を分割する
function linessplit(str: string): string[] {
    return str.split("\n");
}

// 改行コードを削除する
function crlnRemove(str: string): string {
    return str.replace(/\r?\n/g, "");
}

// 文字列をpタグで囲む
function createPFromString(str: string): JSX.Element {
    return <p>{`${str}`}</p>;
}

// チャットボットのインターフェースを定義する
function ChatWithGPT() {
    // ユーザーが入力したメッセージ
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState<Message[]>([
        {
            role: "system",
            content: "あなたは日本語で回答してください。",
        },
    ]);

    // チャットボットからの返答
    const [response, setResponse] = useState("");

    const [isOverflowing, setIsOverflowing] = useState(false);

    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const messagesContainerRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const isOverflow =
            messagesContainerRef?.current?.scrollHeight ??
            0 > window.innerHeight;
        setIsOverflowing(!!isOverflow);
        scrollToBottom();
    }, [messages]);

    const chatContainerClass = isOverflowing
        ? "chat-container chat-full"
        : "chat-container";

    // ユーザーがメッセージを送ったときの処理
    const handleSend = async (event: React.FormEvent) => {
        // ページのリロードを防ぐ
        event.preventDefault();

        // メッセージ入力欄を空にする
        setMessage("");

        try {
            // ユーザーが送信したメッセージの情報を作成する
            const userMessage: Message = { role: "user", content: message };
            // ユーザーのメッセージを追加する
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            // GPT-3.5にメッセージを送る
            setResponse("通信中...");
            const gptResponse = await chatWithGPT(messages.concat(userMessage));
            setResponse("");
            // チャットボットの返答を保存する
            const aiMessage: Message = {
                role: "assistant",
                content: gptResponse?.data?.choices?.[0]?.message.content ?? "",
            };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            // エラーが発生した場合はエラーメッセージを表示する
            console.error(error);
            setResponse("エラーが発生しました。");
        }
    };

    return (
        <div className={chatContainerClass}>
            <div className="messages" ref={messagesContainerRef}>
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        <p>{`${msg.role}:`}</p>
                        {splitLines(msg.content).map(removeCRLN).map(stringToP)}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <p>{response}</p>
            <form onSubmit={handleSend} className="input-form">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">送信</button>
            </form>
        </div>
    );
}


const Home = () => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Code Nebula</p>
        </header>
    );
};


const Issues = () => {
    return <IssueList />;
};


const AI = () => {
    return <ChatWithGPT />;
};

