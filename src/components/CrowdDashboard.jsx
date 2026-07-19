import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Users } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { GoogleGenerativeAI } from '@google/generative-ai';
import DOMPurify from 'dompurify';
import MetricCard from './common/MetricCard';
import ProgressBar from './common/ProgressBar';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
  systemInstruction: "You are the Crowd Intelligence AI for the FIFA World Cup 2026. Given the current stadium metrics, generate a concise, highly analytical operational report (under 70 words). Identify a critical surge risk and recommend a precise crowd diversion tactic (e.g. 'Divert 500 fans from Gate C to Gate D'). Format it like an automated emergency terminal output.",
});

/**
 * Sanitizes input string to prevent XSS
 * @param {string} input - The raw string
 * @returns {string} The sanitized string
 */
const sanitizeInput = (input) => DOMPurify.sanitize(input);

/**
 * CrowdDashboard Component for monitoring live stadium metrics and AI alerts
 * @returns {React.ReactElement} The rendered CrowdDashboard component
 */
export default function CrowdDashboard() {
  const [reportText, setReportText] = useState('');
  const [alerts, setAlerts] = useState([]);
  const { displayedText, isTyping } = useTypewriter(reportText, 10);

  useEffect(() => {
    let isMounted = true;
    
    /**
     * Generates the operational report using Gemini AI
     */
    const generateReport = async () => {
      try {
        if (!import.meta.env.VITE_GEMINI_API_KEY) throw new Error("Missing Gemini API Key");
        
        const prompt = "Current Metrics: Attendance 68,432. Gate C load is 92%. Gate A is 34%. Alert: Surge detected at North Concourse.";
        const result = await model.generateContent(prompt);
        
        if (isMounted) {
          setReportText(sanitizeInput(result.response.text()));
        }
      } catch (error) {
        if (isMounted) setReportText(`[SYSTEM ERROR] Failed to generate AI report: ${sanitizeInput(error.message)}`);
      }
    };

    const alertTimer = setTimeout(() => {
      if (isMounted) setAlerts([{ id: 1, type: 'warning', text: 'Surge detected at North Concourse' }]);
    }, 1500);

    const aiTimer = setTimeout(() => {
      generateReport();
    }, 2500);

    return () => {
      isMounted = false;
      clearTimeout(alertTimer);
      clearTimeout(aiTimer);
    };
  }, []);

  return (
    <section aria-label="Crowd Dashboard" className="glass-panel animate-fade-in" style={{ height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
      <header>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }} className="text-gradient">Crowd Intelligence</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Real-time generative scenario planning and crowd load balancing.</p>
      </header>

      <section aria-label="Key Metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <MetricCard title="Total Attendance" value="68,432" icon={<Users />} color="var(--color-primary)" />
        <MetricCard title="Avg Entry Time" value="4m 12s" icon={<Activity />} color="var(--color-success)" />
        <MetricCard title="Active Alerts" value={alerts.length.toString()} icon={<AlertTriangle />} color="var(--color-warning)" />
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flex: 1, minHeight: '300px' }}>
        <section aria-label="Live Gate Load" className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color="var(--color-accent)" /> 
            Live Gate Load
          </h3>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} role="list">
            <ProgressBar label="Gate A (VIP)" percent={34} color="var(--color-success)" />
            <ProgressBar label="Gate B (East)" percent={65} color="var(--color-primary)" />
            <ProgressBar label="Gate C (North)" percent={92} color="var(--color-error)" />
            <ProgressBar label="Gate D (South)" percent={45} color="var(--color-success)" />
          </div>
        </section>

        <section aria-label="AI Operational Plan" className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} color="var(--color-warning)" />
            AI Operational Plan
          </h3>
          <div role="region" aria-live="polite" style={{ 
            background: 'rgba(0,0,0,0.4)', 
            flex: 1, 
            borderRadius: '8px', 
            padding: '16px',
            border: '1px solid rgba(255,255,255,0.05)',
            fontFamily: 'monospace',
            color: 'var(--color-primary)',
            lineHeight: '1.6',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
            overflowY: 'auto'
          }}>
            <span className={isTyping ? 'typewriter-cursor' : ''} style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: displayedText || 'Awaiting metrics to generate AI scenario...' }} />
          </div>
        </section>
      </div>
    </section>
  );
}
