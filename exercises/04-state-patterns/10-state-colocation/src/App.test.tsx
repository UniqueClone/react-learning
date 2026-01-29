import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('State Colocation', () => {
  it('renders all three widgets', () => {
    render(<App />);
    expect(screen.getByText(/counter/i)).toBeInTheDocument();
    expect(screen.getByText(/weather/i)).toBeInTheDocument();
    expect(screen.getByText(/profile|user/i)).toBeInTheDocument();
  });

  it('counter widget works independently', async () => {
    const user = userEvent.setup();
    render(<App />);

    const incrementButton = screen.getByRole('button', { name: /increment|\+/i });
    await user.click(incrementButton);

    expect(screen.getByText(/count.*1|1.*count/i)).toBeInTheDocument();
  });

  it('weather widget works independently', async () => {
    const user = userEvent.setup();
    render(<App />);

    const increaseButton = screen.getByRole('button', { name: /warmer|increase|\+.*temp/i });
    await user.click(increaseButton);

    expect(screen.getByText(/73|temp.*73/i)).toBeInTheDocument();
  });

  it('user profile widget works independently', async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByLabelText(/name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'John Doe');

    expect(nameInput).toHaveValue('John Doe');
  });

  it('shows counter controls', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /increment|\+/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /decrement|-/i })).toBeInTheDocument();
  });

  it('shows weather controls', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /warmer|increase|\+.*temp/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cooler|decrease|-.*temp/i })).toBeInTheDocument();
  });

  it('displays initial values', () => {
    render(<App />);
    expect(screen.getByText(/count.*0|0.*count/i)).toBeInTheDocument();
    expect(screen.getByText(/72|temp.*72/i)).toBeInTheDocument();
  });

  it('widgets update independently', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Update counter
    await user.click(screen.getByRole('button', { name: /increment|\+/i }));
    expect(screen.getByText(/count.*1/i)).toBeInTheDocument();

    // Weather should still be at initial value
    expect(screen.getByText(/72|temp.*72/i)).toBeInTheDocument();
  });
});
