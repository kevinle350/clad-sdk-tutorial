import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
// TODO: Fill In Clad Import

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
	const [latestResponse, setLatestResponse] = useState(null); // store response globally

	// 1. TODO: Initialize Clad Client
  const cladClient = new CladClient({
    apiKey: process.env.REACT_APP_CLAD_API_KEY,
    threshold: 1,
  });

	// 2. TODO: Initialize User ID
  const userId = cladClient.getOrCreateUserId();

  useEffect(() => {
    const run = async () => {
      // 3. TODO: Call function to inject ad into inline text response
      const response = 
			setLatestResponse(response);
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

	// 5. TODO: Make a new object to have a map to the response from #4
	const adMessage = {
		prompted: latestResponse
	}

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
        ))}
      </div>
			{/* 6 TODO: Conditionally render the AdCard if the response is injected */}
		
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
