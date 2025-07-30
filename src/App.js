import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
// 1. Clad Imports
import { AdCard, CladClient } from '@clad-ai/react';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
	const [latestResponse, setLatestResponse] = useState(null); // ✅ store response globally

	// 2. Initialize Clad Client
  const cladClient = new CladClient({
    apiKey: process.env.REACT_APP_CLAD_API_KEY,
    threshold: 1,
  });

	// 3. Initialize User ID
  const userId = cladClient.getOrCreateUserId();

  useEffect(() => {
    const run = async () => {
      // 4. Call function to inject ad into inline text response
      const response = await cladClient.getProcessedInput(
        "Im looking for an e-bike reccommendation to get around the city",	// This can be any text input
        userId,
        "true"
      );
      console.log("✅ Response:", response);
      console.log("Prompt:", response.prompt);
			setLatestResponse(response); // ✅ store response in state
    };

    run();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    const botMessage = { sender: 'bot', text: "This is a hardcoded bot reply." };
    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
        ))}
      </div>
			{/* 5. Conditionally render the AdCard if the response is injected */}
			{latestResponse?.promptType === 'injected' && (
				<div className="mt-4">
					<AdCard prompted={latestResponse} className="my-2" />
				</div>
			)}
      <div className="input-box">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
