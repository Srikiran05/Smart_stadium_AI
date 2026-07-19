import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react';

// Mock matchMedia for jsdom
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getAllByText(/SmartStadium/i)).toBeDefined();
  });
  
  it('renders navigation tabs', () => {
    render(<App />);
    expect(screen.getAllByText(/Fan Navigator/i)).toBeDefined();
    expect(screen.getAllByText(/Crowd Intelligence/i)).toBeDefined();
    expect(screen.getAllByText(/Transport Optimizer/i)).toBeDefined();
  });
});
