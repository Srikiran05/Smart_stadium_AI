import React, { useState } from 'react';
import { Compass, BarChart3, Accessibility, Map as MapIcon, Settings, ShieldCheck } from 'lucide-react';
import FanNavigator from './components/FanNavigator';
import CrowdDashboard from './components/CrowdDashboard';
import AccessibilityAdvisor from './components/AccessibilityAdvisor';
import TransportOptimizer from './components/TransportOptimizer';

function App() {
  const [activeTab, setActiveTab] = useState('navigator');

  return (
    <div style={{ display: 'flex', height: '100vh', padding: '24px', gap: '24px' }}>
      
      {/* Sidebar Navigation */}
      <nav className="glass-panel" style={{ width: '280px', display: 'flex', flexDirection: 'column', padding: '24px 0' }}>
        <div style={{ padding: '0 24px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--color-primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>SmartStadium</h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-primary)', letterSpacing: '1px' }}>GEN-AI COMMAND CENTER</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }}>
          <NavItem 
            icon={<Compass size={20} />} 
            label="Fan Navigator" 
            isActive={activeTab === 'navigator'} 
            onClick={() => setActiveTab('navigator')} 
          />
          <NavItem 
            icon={<BarChart3 size={20} />} 
            label="Crowd Intelligence" 
            isActive={activeTab === 'crowd'} 
            onClick={() => setActiveTab('crowd')} 
          />
          <NavItem 
            icon={<Accessibility size={20} />} 
            label="Accessibility Advisor" 
            isActive={activeTab === 'accessibility'} 
            onClick={() => setActiveTab('accessibility')} 
          />
          <NavItem 
            icon={<MapIcon size={20} />} 
            label="Transport Optimizer" 
            isActive={activeTab === 'transport'} 
            onClick={() => setActiveTab('transport')} 
          />
        </div>

        <div style={{ marginTop: 'auto', padding: '0 24px', color: 'var(--color-text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={16} />
          <span>System Status: <span style={{ color: 'var(--color-success)' }}>Optimal</span></span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {activeTab === 'navigator' && <FanNavigator />}
        {activeTab === 'crowd' && <CrowdDashboard />}
        {activeTab === 'accessibility' && <AccessibilityAdvisor />}
        {activeTab === 'transport' && <TransportOptimizer />}
      </main>
      
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        padding: '12px 16px',
        background: isActive ? 'linear-gradient(90deg, rgba(69, 243, 255, 0.15), transparent)' : 'transparent',
        border: 'none',
        borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
        color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
        borderRadius: '0 8px 8px 0',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'left',
        fontSize: '0.95rem',
        fontWeight: isActive ? '600' : '400'
      }}
    >
      {icon}
      {label}
    </button>
  );
}

export default App;
