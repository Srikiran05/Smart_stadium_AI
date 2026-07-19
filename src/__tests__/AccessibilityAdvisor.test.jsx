import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AccessibilityAdvisor from '../components/AccessibilityAdvisor';
import React from 'react';

describe('AccessibilityAdvisor Component', () => {
  it('renders without crashing', () => {
    render(<AccessibilityAdvisor />);
    expect(screen.getByText(/Accessibility & Sustainability Advisor/i)).toBeDefined();
  });

  it('renders preference toggles', () => {
    render(<AccessibilityAdvisor />);
    expect(screen.getByText(/Wheelchair Accessibility/i)).toBeDefined();
    expect(screen.getByText(/Sensory-Friendly Zones/i)).toBeDefined();
  });

  it('renders the generate button', () => {
    render(<AccessibilityAdvisor />);
    const btn = screen.getByRole('button', { name: /Generate AI Plan/i });
    expect(btn).toBeDefined();
  });
});
