import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CrowdDashboard from '../components/CrowdDashboard';
import React from 'react';

describe('CrowdDashboard Component', () => {
  it('renders without crashing', () => {
    render(<CrowdDashboard />);
    expect(screen.getByText(/Crowd Intelligence/i)).toBeDefined();
  });

  it('renders the key metrics', () => {
    render(<CrowdDashboard />);
    expect(screen.getByText(/Total Attendance/i)).toBeDefined();
    expect(screen.getByText(/Avg Entry Time/i)).toBeDefined();
  });

  it('renders the gate load sections', () => {
    render(<CrowdDashboard />);
    expect(screen.getByText(/Gate A \(VIP\)/i)).toBeDefined();
    expect(screen.getByText(/Gate C \(North\)/i)).toBeDefined();
  });
});
