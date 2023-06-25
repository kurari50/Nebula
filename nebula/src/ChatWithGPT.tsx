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
    console.log('message', message)
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
    });
    console.log('response', response);

    return response;
}

// チャットボットのインターフェースを定義する
function ChatWithGPT() {
  // ユーザーが入力したメッセージ
  const [message, setMessage] = useState('');

  // チャットボットからの返答
  const [response, setResponse] = useState('');

  // ユーザーがメッセージを送ったときの処理
  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault()
    // GPT-3.5にメッセージを送る
    try {
      const gptResponse = await chatWithGPT(message);
      // チャットボットの返答を保存する
      setResponse(gptResponse?.data?.choices?.[0]?.text ?? '');
    } catch (error) {
      console.error(error);
      setResponse('エラーが発生しました。');
    }
    setMessage('');
  };

  return (
    <form onSubmit={handleSend}>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">送信</button>
      <p>{response}</p>
    </form>
  );
};

export default ChatWithGPT;
