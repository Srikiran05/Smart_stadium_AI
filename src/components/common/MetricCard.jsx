import React from 'react';
import PropTypes from 'prop-types';

/**
 * Metric Card Component for displaying statistics
 * @param {Object} props - The component props
 * @param {string} props.title - The title of the metric
 * @param {string} props.value - The value to display
 * @param {React.ReactElement} props.icon - The Lucide icon to display
 * @param {string} props.color - The CSS color string for the icon theme
 * @returns {React.ReactElement} The rendered MetricCard component
 */
export default function MetricCard({ title, value, icon, color }) {
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
