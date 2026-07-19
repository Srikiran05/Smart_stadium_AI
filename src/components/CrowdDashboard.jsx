import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Users } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { GoogleGenerativeAI } from '@google/generative-ai';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
  systemInstruction: "You are the Crowd Intelligence AI for the FIFA World Cup 2026. Given the current stadium metrics, generate a concise, highly analytical operational report (under 70 words). Identify a critical surge risk and recommend a precise crowd diversion tactic (e.g. 'Divert 500 fans from Gate C to Gate D'). Format it like an automated emergency terminal output.",
});

const sanitizeInput = (input) => DOMPurify.sanitize(input);

export default function CrowdDashboard() {
  const [reportText, setReportText] = useState('');
  const [alerts, setAlerts] = useState([]);
  const { displayedText, isTyping } = useTypewriter(reportText, 10);

  useEffect(() => {
    let isMounted = true;
    
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

CrowdDashboard.propTypes = {};

function MetricCard({ title, value, icon, color }) {
  return (
    <article className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }} aria-label={title}>
      <div style={{ padding: '12px', background: `color-mix(in srgb, ${color} 20%, transparent)`, borderRadius: '12px', color }} aria-hidden="true">
        {icon}
      </div>
      <div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '4px' }}>{title}</p>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
      </div>
    </article>
  );
}

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
};

function ProgressBar({ label, percent, color }) {
  return (
    <div role="listitem" aria-label={`${label} at ${percent}% capacity`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.875rem' }}>
        <span>{label}</span>
        <span style={{ color }}>{percent}%</span>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }} aria-hidden="true">
        <div style={{ 
          width: `${percent}%`, 
          height: '100%', 
          background: color,
          transition: 'width 1s ease-in-out'
        }} />
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
