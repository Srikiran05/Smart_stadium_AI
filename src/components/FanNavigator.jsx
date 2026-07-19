import React, { useState } from 'react';
import { Send, Globe2, Bot, User } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: "You are the SmartStadium AI for the FIFA World Cup 2026. You help fans with finding seats, food, restrooms, and navigating the stadium. Always detect the language the user is speaking, and reply in the EXACT SAME LANGUAGE. Be helpful, concise, and polite. If they just say 'Hola' or a greeting, greet them back in that language and ask how you can help them in the stadium today.",
});

const sanitizeInput = (input) => {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export default function FanNavigator() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "I am the SmartStadium AI. How can I assist you with your match day experience?", id: 1 }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chat, setChat] = useState(() => model.startChat({ history: [] }));

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const safeInput = sanitizeInput(inputValue);
    const newUserMsg = { role: 'user', content: safeInput, id: Date.now() };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsProcessing(true);

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error("Missing Gemini API Key. Please add it to your .env file.");
      }

      const result = await chat.sendMessage(safeInput);
      const responseText = result.response.text();
      setMessages(prev => [...prev, { role: 'ai', content: responseText, id: Date.now() + 1 }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: `Sorry, there was an error communicating with the AI backend. (${error.message})`, id: Date.now() + 1 }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', borderBottom: 'var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }} className="text-gradient">Fan Navigator</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Multilingual AI Assistant</p>
        </div>
        <div className="glass-card flex-center" style={{ padding: '8px 12px', gap: '8px', fontSize: '0.8rem', color: 'var(--color-success)' }}>
          <Globe2 size={16} />
          <span>Live LLM Translation Active</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg, idx) => (
          <ChatMessage key={msg.id} message={msg} isLast={idx === messages.length - 1} />
        ))}
        {isProcessing && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div className="glass-card flex-center" style={{ width: '40px', height: '40px', borderRadius: '50%', color: 'var(--color-primary)' }}>
              <Bot size={20} />
            </div>
            <div className="glass-card" style={{ padding: '12px 16px', maxWidth: '80%' }}>
              <span className="typewriter-cursor" style={{ color: 'var(--color-text-muted)' }}>AI is generating response...</span>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '20px', borderTop: 'var(--glass-border)' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type in any language (e.g. 'Hola', 'Where is my seat?')..."
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: 'var(--color-text)',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
          />
          <button type="submit" className="btn-primary flex-center" disabled={isProcessing} style={{ width: '48px', padding: 0 }}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ message, isLast }) {
  const isAi = message.role === 'ai';
  // Use a faster typing speed for real LLM responses since they can be longer
  const { displayedText, isTyping } = useTypewriter(isAi && isLast ? message.content : '', 10);

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexDirection: isAi ? 'row' : 'row-reverse' }} className="animate-slide-up">
      <div className="glass-card flex-center" style={{ 
        width: '40px', height: '40px', borderRadius: '50%', 
        color: isAi ? 'var(--color-primary)' : 'var(--color-accent)',
        flexShrink: 0
      }}>
        {isAi ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className="glass-card" style={{ 
        padding: '12px 16px', 
        maxWidth: '80%',
        background: isAi ? 'var(--color-surface)' : 'rgba(139, 92, 246, 0.15)',
        border: isAi ? 'var(--glass-border)' : '1px solid rgba(139, 92, 246, 0.3)'
      }}>
        <p style={{ lineHeight: '1.5' }} className={isAi && isLast && isTyping ? 'typewriter-cursor' : ''}>
          {isAi && isLast ? displayedText : message.content}
        </p>
      </div>
    </div>
  );
}
