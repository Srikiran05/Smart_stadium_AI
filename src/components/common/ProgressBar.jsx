import React from 'react';
import PropTypes from 'prop-types';

/**
 * Progress Bar Component for displaying capacities
 * @param {Object} props - The component props
 * @param {string} props.label - The label for the progress bar
 * @param {number} props.percent - The completion percentage (0-100)
 * @param {string} props.color - The CSS color string for the bar
 * @returns {React.ReactElement} The rendered ProgressBar component
 */
export default function ProgressBar({ label, percent, color }) {
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
