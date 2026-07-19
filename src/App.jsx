import React, { useState } from 'react';
import { Compass, BarChart3, Accessibility, Map as MapIcon, Settings, ShieldCheck } from 'lucide-react';
import FanNavigator from './components/FanNavigator';
import CrowdDashboard from './components/CrowdDashboard';
import AccessibilityAdvisor from './components/AccessibilityAdvisor';
import TransportOptimizer from './components/TransportOptimizer';
import NavItem from './components/common/NavItem';

/**
 * Main Application Component serving as the Command Center layout
 * @returns {React.ReactElement} The rendered App component
 */
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

export default App;
