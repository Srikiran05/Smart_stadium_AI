import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FanNavigator from '../components/FanNavigator';
import React from 'react';

describe('FanNavigator Component', () => {
  it('renders without crashing', () => {
    render(<FanNavigator />);
    expect(screen.getByText(/Fan Navigator/i)).toBeDefined();
  });

  it('contains the chat input', () => {
    render(<FanNavigator />);
    const input = screen.getByPlaceholderText(/Type in any language/i);
    expect(input).toBeDefined();
  });
});
