import React, { useState } from 'react';
// @ts-ignore
import { Configuration, OpenAIApi, ChatResponse } from 'openai';

// OpenAIのAPIを使うための設定
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
});

// OpenAIのAPIを使うためのクライアント
const openai = new OpenAIApi(configuration);

// GPT-3.5を使ってチャットボットを作る
async function chatWithGPT(message: string): Promise<ChatResponse> {
    // OpenAIのAPIを使ってメッセージを送る
    const response = await openai.createCompletion({
        model: 'gpt-3.5-turbo',
        prompt: [
            {
                role: 'system',
                content: 'You are chatting with GPT-3.5.',
            },
            {
                role: 'user',
                content: message,
            },
        ],
    });

    return response;
}

// チャットボットのインターフェースを定義する
function ChatWithGPT() {
  // ユーザーが入力したメッセージ
  const [message, setMessage] = useState('');

  // チャットボットからの返答
  const [response, setResponse] = useState('');

  // ユーザーがメッセージを送ったときの処理
  const handleSend = async () => {
    // GPT-3.5にメッセージを送る
    const gptResponse = await chatWithGPT(message);
    // チャットボットの返答を保存する
    setResponse(gptResponse?.data?.choices?.[0]?.text ?? '');
  };

  return (
    <div>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
      <p>{response}</p>
    </div>
  );
};

export default ChatWithGPT;
