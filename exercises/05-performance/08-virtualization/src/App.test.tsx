import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('List Virtualization', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText(/list virtualization/i)).toBeInTheDocument();
  });

  it('shows total item count', () => {
    render(<App />);
    expect(screen.getByText(/10000|10,000/i)).toBeInTheDocument();
  });

  it('has a toggle button', () => {
    render(<App />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('shows virtualized mode by default', () => {
    render(<App />);
    expect(screen.getByText(/virtualized/i)).toBeInTheDocument();
  });

  it('displays list items', () => {
    render(<App />);
    expect(screen.getByText(/item 0|item #0/i)).toBeInTheDocument();
  });

  it('shows multiple list items', () => {
    render(<App />);
    const items = screen.getAllByText(/item \d+|item #\d+/i);
    expect(items.length).toBeGreaterThan(1);
  });

  it('toggles between virtualized and normal mode', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/virtualized/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button'));
    expect(screen.getByText(/normal/i)).toBeInTheDocument();
  });

  it('renders fewer DOM nodes when virtualized', () => {
    render(<App />);
    const items = screen.getAllByText(/item \d+|item #\d+/i);
    // Virtualized should render much fewer items than total
    expect(items.length).toBeLessThan(100);
  });

  it('updates button text when toggled', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/show normal/i);

    await user.click(button);
    expect(button).toHaveTextContent(/show virtualized/i);
  });

  it('displays metrics section', () => {
    render(<App />);
    expect(screen.getByText(/total items/i)).toBeInTheDocument();
    expect(screen.getByText(/mode/i)).toBeInTheDocument();
  });
});
