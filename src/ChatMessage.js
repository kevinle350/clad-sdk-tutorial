import React from 'react';

export default function ChatMessage({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      <strong>{sender === 'user' ? 'You' : 'Bot'}:</strong> {text}
    </div>
  );
}
