import React, { useState, useEffect, useRef } from 'react';
import './ChatWithGPT.css';
// @ts-ignore
import { Configuration, OpenAIApi, ChatResponse } from 'openai';

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}
  
// OpenAIのAPIを使うための設定
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
});

// OpenAIのAPIを使うためのクライアント
const openai = new OpenAIApi(configuration);

// GPT-3.5を使ってチャットボットを作る
async function chatWithGPT(messages: Message[]): Promise<ChatResponse> {
    // OpenAIのAPIを使ってメッセージを送る
    console.log('message', messages)
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
    });
    console.log('response', response);

    return response;
}

// チャットボットのインターフェースを定義する
function ChatWithGPT() {
  // ユーザーが入力したメッセージ
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState<Message[]>([
    {
        role: "system",
        content: "あなたは日本語で回答してください。",
    },
  ]);

  // チャットボットからの返答
  const [response, setResponse] = useState('');

  const [isOverflowing, setIsOverflowing] = useState(false);
  
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const messagesContainerRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const isOverflow = messagesContainerRef?.current?.scrollHeight ?? 0 > window.innerHeight;
    setIsOverflowing(!!isOverflow);
    scrollToBottom();
  }, [messages]);

  const chatContainerClass = isOverflowing ? "chat-container chat-full" : "chat-container";

  // ユーザーがメッセージを送ったときの処理
  const handleSend = async (event: React.FormEvent) => {
    // ページのリロードを防ぐ
    event.preventDefault()

    // メッセージ入力欄を空にする
    setMessage('');

    try {
      // ユーザーが送信したメッセージの情報を作成する
      const userMessage: Message = { role: 'user', content: message };
      // ユーザーのメッセージを追加する
      setMessages(prevMessages => [...prevMessages, userMessage]);

      // GPT-3.5にメッセージを送る
      const gptResponse = await chatWithGPT(messages.concat(userMessage));
      // チャットボットの返答を保存する
      const aiMessage: Message = { role: 'assistant', content: gptResponse?.data?.choices?.[0]?.message.content ?? '' };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      // エラーが発生した場合はエラーメッセージを表示する
      console.error(error);
      setResponse('エラーが発生しました。');
    }
  };

  return (
    <div className={chatContainerClass}>
      <p>{response}</p>
      <div className="messages" ref={messagesContainerRef}>
        {messages.map((msg, idx) => (
          <p key={idx}>{`${msg.role}: ${msg.content}`}</p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="input-form">
        <input value={message} onChange={e => setMessage(e.target.value)} />
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default ChatWithGPT;
