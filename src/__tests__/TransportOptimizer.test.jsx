import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TransportOptimizer from '../components/TransportOptimizer';
import React from 'react';

describe('TransportOptimizer Component', () => {
  it('renders without crashing', () => {
    render(<TransportOptimizer />);
    expect(screen.getByText(/Transport & Logistics Optimizer/i)).toBeDefined();
  });

  it('renders input fields', () => {
    render(<TransportOptimizer />);
    const locationInput = screen.getByLabelText(/Starting Location/i);
    const timeInput = screen.getByLabelText(/Target Arrival Time/i);
    expect(locationInput).toBeDefined();
    expect(timeInput).toBeDefined();
  });
});
