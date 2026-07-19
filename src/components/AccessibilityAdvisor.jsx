import React, { useState } from 'react';
import { Heart, Leaf, Accessibility, Settings } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
  systemInstruction: "You are the Accessibility & Sustainability Advisor for the FIFA World Cup 2026 SmartStadium. Generate a personalized match day plan for a fan based on their selected preferences. Be enthusiastic, concise, and format the output cleanly with emojis. Mention specific stadium gates, quiet zones, and sustainability metrics (e.g. CO2 offset by transit). Keep it under 150 words.",
});

export default function AccessibilityAdvisor() {
  const [preferences, setPreferences] = useState({
    wheelchair: false,
    sensory: false,
    dietary: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [planContent, setPlanContent] = useState("");

  const { displayedText, isTyping } = useTypewriter(planContent, 10);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setPlanGenerated(false);
    setPlanContent("");

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) throw new Error("Missing Gemini API Key");

      const prompt = `Please generate a stadium plan for me. My preferences are: Wheelchair Accessible: ${preferences.wheelchair}, Sensory-Friendly: ${preferences.sensory}, Vegetarian/Vegan: ${preferences.dietary}.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      setPlanContent(response.text());
      setPlanGenerated(true);
    } catch (error) {
      console.error(error);
      setPlanContent(`Error generating plan: ${error.message}`);
      setPlanGenerated(true);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px', borderBottom: 'var(--glass-border)' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }} className="text-gradient">Accessibility & Sustainability Advisor</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Tailor your stadium experience for maximum comfort and minimal environmental impact.</p>
      </div>

      <div style={{ padding: '24px', display: 'flex', gap: '32px', flex: 1 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={18} /> Preferences
          </h3>
          
          <PreferenceToggle 
            label="Wheelchair Accessibility" 
            icon={<Accessibility size={18} />} 
            checked={preferences.wheelchair}
            onChange={() => setPreferences(prev => ({...prev, wheelchair: !prev.wheelchair}))}
          />
          <PreferenceToggle 
            label="Sensory-Friendly Zones" 
            icon={<Heart size={18} />} 
            checked={preferences.sensory}
            onChange={() => setPreferences(prev => ({...prev, sensory: !prev.sensory}))}
          />
          <PreferenceToggle 
            label="Vegetarian/Vegan Dining" 
            icon={<Leaf size={18} />} 
            checked={preferences.dietary}
            onChange={() => setPreferences(prev => ({...prev, dietary: !prev.dietary}))}
          />

          <button 
            className="btn-primary" 
            style={{ marginTop: 'auto', padding: '16px' }}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Analyzing with Gemini...' : 'Generate AI Plan'}
          </button>
        </div>

        <div className="glass-card" style={{ flex: 1.5, padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--color-text)' }}>Your Personalized Plan</h3>
          <div style={{ 
            flex: 1, 
            background: 'rgba(0,0,0,0.2)', 
            borderRadius: '8px', 
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.05)',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.6',
            color: 'var(--color-text-muted)',
            overflowY: 'auto'
          }}>
            {!isGenerating && !planGenerated && "Select your preferences and click generate to create your custom AI match day plan powered by Gemini."}
            {(isGenerating || planGenerated) && (
              <span className={isTyping ? 'typewriter-cursor' : ''} style={{ color: 'var(--color-text)' }}>
                {displayedText || '...'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PreferenceToggle({ label, icon, checked, onChange }) {
  return (
    <div 
      className="glass-card" 
      style={{ 
        padding: '16px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        cursor: 'pointer',
        border: checked ? '1px solid var(--color-primary)' : 'var(--glass-border)'
      }}
      onClick={onChange}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: checked ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
        <div style={{ color: checked ? 'var(--color-primary)' : 'inherit' }}>{icon}</div>
        <span>{label}</span>
      </div>
      <div style={{ 
        width: '40px', height: '22px', 
        borderRadius: '11px', 
        background: checked ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
        position: 'relative',
        transition: 'background 0.3s'
      }}>
        <div style={{
          width: '18px', height: '18px',
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: '2px',
          left: checked ? '20px' : '2px',
          transition: 'left 0.3s'
        }} />
      </div>
    </div>
  );
}
