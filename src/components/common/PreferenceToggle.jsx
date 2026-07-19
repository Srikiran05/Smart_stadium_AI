import React from 'react';
import PropTypes from 'prop-types';

/**
 * Toggle Switch Component for user preferences
 * @param {Object} props - The component props
 * @param {string} props.label - The text label for the toggle
 * @param {React.ReactElement} props.icon - The Lucide icon to display
 * @param {boolean} props.checked - Whether the toggle is active
 * @param {Function} props.onChange - Handler function when clicked
 * @returns {React.ReactElement} The rendered PreferenceToggle component
 */
export default function PreferenceToggle({ label, icon, checked, onChange }) {
  return (
    <button 
      className="glass-card" 
      style={{ 
        padding: '16px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        cursor: 'pointer',
        border: checked ? '1px solid var(--color-primary)' : 'var(--glass-border)',
        width: '100%',
        background: 'transparent',
        textAlign: 'left'
      }}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: checked ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
        <div style={{ color: checked ? 'var(--color-primary)' : 'inherit' }} aria-hidden="true">{icon}</div>
        <span>{label}</span>
      </div>
      <div style={{ 
        width: '40px', height: '22px', 
        borderRadius: '11px', 
        background: checked ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
        position: 'relative',
        transition: 'background 0.3s'
      }} aria-hidden="true">
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
    </button>
  );
}

PreferenceToggle.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
