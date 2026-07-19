import { useState, useEffect } from 'react';

export function useTypewriter(text, speed = 30) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;
    
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      
      if (i >= text.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, speed);
    
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return { displayedText, isTyping };
}
