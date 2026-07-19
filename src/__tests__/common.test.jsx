import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MetricCard from '../components/common/MetricCard';
import ProgressBar from '../components/common/ProgressBar';
import NavItem from '../components/common/NavItem';
import React from 'react';

describe('Common Components', () => {
  it('renders MetricCard correctly', () => {
    render(<MetricCard title="Test Title" value="123" icon={<div data-testid="icon" />} color="#fff" />);
    expect(screen.getByText('Test Title')).toBeDefined();
    expect(screen.getByText('123')).toBeDefined();
    expect(screen.getByTestId('icon')).toBeDefined();
  });

  it('renders ProgressBar correctly', () => {
    render(<ProgressBar label="Test Bar" percent={50} color="#000" />);
    expect(screen.getByText('Test Bar')).toBeDefined();
    expect(screen.getByText('50%')).toBeDefined();
  });

  it('handles NavItem click', () => {
    const handleClick = vi.fn();
    render(<NavItem label="Test Nav" icon={<div />} isActive={false} onClick={handleClick} />);
    const btn = screen.getByRole('tab');
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });
});
