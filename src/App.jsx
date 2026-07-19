import React, { useState } from 'react';
import { Compass, BarChart3, Accessibility, Map as MapIcon, Settings, ShieldCheck } from 'lucide-react';
import FanNavigator from './components/FanNavigator';
import CrowdDashboard from './components/CrowdDashboard';
import AccessibilityAdvisor from './components/AccessibilityAdvisor';
import TransportOptimizer from './components/TransportOptimizer';
import PropTypes from 'prop-types';

function App() {
  const [activeTab, setActiveTab] = useState('navigator');

  return (
    <div style={{ display: 'flex', height: '100vh', padding: '24px', gap: '24px' }}>
      <nav className="glass-panel" style={{ width: '280px', display: 'flex', flexDirection: 'column', padding: '24px 0' }} aria-label="Main Navigation">
        <header style={{ padding: '0 24px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--color-primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }} aria-hidden="true">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>SmartStadium</h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-primary)', letterSpacing: '1px' }}>GEN-AI COMMAND CENTER</p>
          </div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }} role="tablist">
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

        <div style={{ marginTop: 'auto', padding: '0 24px' }}>
          <button className="glass-card flex-center" style={{ width: '100%', padding: '12px', gap: '8px', color: 'var(--color-text-muted)' }} aria-label="Settings">
            <Settings size={18} /> Settings
          </button>
        </div>
      </nav>

      <main style={{ flex: 1, position: 'relative' }} role="tabpanel" aria-label={`${activeTab} panel`}>
        {activeTab === 'navigator' && <FanNavigator />}
        {activeTab === 'crowd' && <CrowdDashboard />}
        {activeTab === 'accessibility' && <AccessibilityAdvisor />}
        {activeTab === 'transport' && <TransportOptimizer />}
      </main>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }) {
  const activeStyle = isActive ? {
    background: 'linear-gradient(90deg, rgba(69, 243, 255, 0.15) 0%, transparent 100%)',
    borderLeft: '3px solid var(--color-primary)',
    color: 'var(--color-primary)',
    fontWeight: '600'
  } : {
    background: 'transparent',
    borderLeft: '3px solid transparent',
    color: 'var(--color-text-muted)',
    fontWeight: '400'
  };

  return (
    <button 
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        padding: '12px 16px',
        borderRadius: '0 8px 8px 0',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'left',
        fontSize: '0.95rem',
        ...activeStyle
      }}
      role="tab"
      aria-selected={isActive}
      aria-controls={`${label.toLowerCase().replace(/\s+/g, '-')}-panel`}
    >
      <span aria-hidden="true" style={{ display: 'flex' }}>{icon}</span>
      {label}
    </button>
  );
}

NavItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default App;
