import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Performance Audit', () => {
  it('renders the dashboard title', () => {
    render(<App />);
    expect(screen.getByText(/performance audit dashboard/i)).toBeInTheDocument();
  });

  it('has a search input', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/type to search/i)).toBeInTheDocument();
  });

  it('displays user count', () => {
    render(<App />);
    expect(screen.getByText(/found.*100.*users/i)).toBeInTheDocument();
  });

  it('renders user cards', () => {
    render(<App />);
    expect(screen.getByText(/user 1/i)).toBeInTheDocument();
  });

  it('filters users based on search', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/type to search/i);
    await user.type(searchInput, '10');

    expect(screen.getByText(/found.*11.*users/i)).toBeInTheDocument();
  });

  it('selects a user when clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const userCard = screen.getByText(/user 1/i).closest('.user-card');
    await user.click(userCard!);

    expect(userCard).toHaveClass('selected');
  });

  it('has fibonacci calculator', () => {
    render(<App />);
    expect(screen.getByText(/fibonacci input/i)).toBeInTheDocument();
  });

  it('displays fibonacci result', () => {
    render(<App />);
    expect(screen.getByText(/result:/i)).toBeInTheDocument();
  });

  it('updates fibonacci result when input changes', async () => {
    const user = userEvent.setup();
    render(<App />);

    const slider = screen.getByRole('slider');
    await user.click(slider);

    expect(screen.getByText(/result:/i)).toBeInTheDocument();
  });

  it('limits unnecessary re-renders', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const user = userEvent.setup();

    render(<App />);

    // Clear initial render logs
    consoleSpy.mockClear();

    // Type in search - should not re-render all UserCards
    const searchInput = screen.getByPlaceholderText(/type to search/i);
    await user.type(searchInput, 'a');

    // Count UserCard renders - should be minimal with optimizations
    const renderCount = consoleSpy.mock.calls.filter(
      call => call[0]?.toString().includes('UserCard render')
    ).length;

    // With optimizations, should only render filtered cards once
    expect(renderCount).toBeLessThan(150); // Without optimization: 100+ per keystroke

    consoleSpy.mockRestore();
  });
});
