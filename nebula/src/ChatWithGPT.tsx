import React, { useState } from 'react';
// @ts-ignore
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

async function chatWithGPT(message: string): Promise<string> {
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

    const gptResponse = response?.data?.choices?.[0]?.text ?? '';
    return gptResponse;
}

const ChatWithGPT: React.FC = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const gptResponse = await chatWithGPT(message);
    setResponse(gptResponse);
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
