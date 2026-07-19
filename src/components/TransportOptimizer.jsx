import React, { useState } from 'react';
import { MapPin, Clock, Navigation, Activity, Map as MapIcon } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
  systemInstruction: "You are the Transport & Logistics Optimizer for the FIFA World Cup 2026. Generate a 3-4 step optimal journey plan for a fan heading to the stadium. Avoid congestion. Use emojis for transport modes (train, bus, walking). Keep it realistic and concise, under 150 words.",
});

export default function TransportOptimizer() {
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [routeGenerated, setRouteGenerated] = useState(false);
  const [routePlan, setRoutePlan] = useState('');

  const { displayedText, isTyping } = useTypewriter(routePlan, 10);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!location || !time) return;

    setIsGenerating(true);
    setRouteGenerated(false);
    setRoutePlan('');

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) throw new Error("Missing Gemini API Key");

      const prompt = `Generate a transport plan for me. I am starting from '${location}' and need to arrive at the stadium by ${time}.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      setRoutePlan(response.text());
      setRouteGenerated(true);
    } catch (error) {
      console.error(error);
      setRoutePlan(`Error generating route: ${error.message}`);
      setRouteGenerated(true);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px', borderBottom: 'var(--glass-border)' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }} className="text-gradient">Transport & Logistics Optimizer</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>AI-generated optimal routing avoiding surges and bottlenecks.</p>
      </div>

      <div style={{ padding: '24px', display: 'flex', gap: '32px', flex: 1, flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', marginBottom: '8px', fontSize: '0.875rem' }}>
                  <MapPin size={16} /> Starting Location
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g. Downtown Hotel"
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px', padding: '12px', color: 'var(--color-text)', outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', marginBottom: '8px', fontSize: '0.875rem' }}>
                  <Clock size={16} /> Target Arrival Time
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px', padding: '12px', color: 'var(--color-text)', outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={isGenerating} style={{ padding: '16px' }}>
              {isGenerating ? 'Calculating Optimal Route...' : 'Generate AI Transport Plan'}
            </button>
          </form>
        </div>

        <div className="glass-card" style={{ flex: 1.2, padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.1, color: 'var(--color-accent)' }}>
            <MapIcon size={200} />
          </div>

          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1 }}>
            <Navigation size={18} color="var(--color-primary)" />
            AI Step-by-Step Journey
          </h3>

          <div style={{
            flex: 1,
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '8px',
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.05)',
            fontFamily: 'monospace',
            fontSize: '1rem',
            lineHeight: '1.8',
            color: 'var(--color-text)',
            zIndex: 1,
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
            overflowY: 'auto'
          }}>
            {!isGenerating && !routeGenerated && <span style={{ color: 'var(--color-text-muted)' }}>Waiting for location and time input...</span>}

            {(isGenerating || routeGenerated) && (
              <div className="animate-fade-in">
                {isGenerating && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)', marginBottom: '16px' }}>
                    <Activity size={18} className="animate-pulse" />
                    <span>Analyzing live transit data with AI...</span>
                  </div>
                )}
                <span className={isTyping ? 'typewriter-cursor' : ''} style={{ whiteSpace: 'pre-wrap' }}>
                  {displayedText}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
