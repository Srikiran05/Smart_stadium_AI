import React, { useState } from 'react';
import { Send, Bot, Globe, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
  systemInstruction: "You are the SmartStadium AI for the FIFA World Cup 2026. You help fans with finding seats, food, restrooms, and navigating the stadium. Always detect the language the user is speaking, and reply in the EXACT SAME LANGUAGE. Be helpful, concise, and polite. If they just say 'Hola' or a greeting, greet them back in that language and ask how you can help them in the stadium today.",
});

const sanitizeInput = (input) => DOMPurify.sanitize(input);

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

    const cleanInput = sanitizeInput(inputValue);
    const newMsg = { role: 'user', content: cleanInput, id: Date.now() };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsProcessing(true);

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) throw new Error("Missing Gemini API Key");
      const result = await chat.sendMessage(cleanInput);
      const response = await result.response;
      setMessages(prev => [...prev, { role: 'ai', content: sanitizeInput(response.text()), id: Date.now() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: `[Error: ${sanitizeInput(error.message)}]`, id: Date.now() }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section aria-label="Fan Navigator Chat" className="glass-panel animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '20px', borderBottom: 'var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }} className="text-gradient">Fan Navigator</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Multilingual AI Assistant</p>
        </div>
        <div className="glass-card flex-center" style={{ padding: '8px 12px', gap: '8px', fontSize: '0.8rem', color: 'var(--color-success)' }} aria-live="polite">
          <Globe size={16} />
          <span>Live LLM Translation Active</span>
        </div>
      </header>

      <main aria-label="Chat messages" style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }} role="log" aria-live="polite">
        {messages.map((msg) => (
          <div key={msg.id} className="animate-slide-up" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
            <div className="glass-card flex-center" style={{ width: '40px', height: '40px', borderRadius: '50%', color: msg.role === 'user' ? 'var(--color-text)' : 'var(--color-primary)', flexShrink: 0 }}>
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className="glass-card" style={{ padding: '12px 16px', maxWidth: '80%', background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-surface)', color: msg.role === 'user' ? '#000' : 'var(--color-text)', border: msg.role === 'user' ? 'none' : 'var(--glass-border)' }}>
              <p style={{ lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: msg.content }} />
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="animate-pulse" style={{ display: 'flex', gap: '8px', color: 'var(--color-primary)' }} aria-label="AI is typing">
            <Bot size={16} /> <span>Thinking...</span>
          </div>
        )}
      </main>

      <footer style={{ padding: '20px', borderTop: 'var(--glass-border)' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px' }} aria-label="Chat input form">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type in any language (e.g. 'Hola', 'Where is my seat?')..."
            aria-label="Type your message"
            style={{ flex: 1, background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: 'var(--color-text)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          <button type="submit" className="btn-primary flex-center" style={{ width: '48px', padding: 0 }} disabled={isProcessing} aria-label="Send message">
            <Send size={20} />
          </button>
        </form>
      </footer>
    </section>
  );
}

FanNavigator.propTypes = {};
