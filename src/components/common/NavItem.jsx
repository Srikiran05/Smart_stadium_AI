import React from 'react';
import PropTypes from 'prop-types';

/**
 * Navigation Item Component for the sidebar
 * @param {Object} props - The component props
 * @param {React.ReactElement} props.icon - The Lucide icon to display
 * @param {string} props.label - The text label for the navigation item
 * @param {boolean} props.isActive - Whether this tab is currently selected
 * @param {Function} props.onClick - Handler function when clicked
 * @returns {React.ReactElement} The rendered NavItem component
 */
export default function NavItem({ icon, label, isActive, onClick }) {
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
