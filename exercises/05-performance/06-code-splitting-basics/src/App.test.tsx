import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Code Splitting', () => {
  it('shows loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('loads dashboard component', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
  });

  it('has tab navigation', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /dashboard/i })).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /analytics/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
  });

  it('switches between tabs', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /analytics/i }));
    await waitFor(() => {
      expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    });
  });

  it('shows loading when switching tabs', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /analytics/i })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /analytics/i }));
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('loads settings component', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /settings/i }));
    await waitFor(() => {
      expect(screen.getByText(/settings/i)).toBeInTheDocument();
    });
  });

  it('highlights active tab', async () => {
    render(<App />);
    await waitFor(() => {
      const dashboardButton = screen.getByRole('button', { name: /dashboard/i });
      expect(dashboardButton).toHaveClass('active');
    });
  });

  it('loads components only once', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /analytics/i }));
    await waitFor(() => {
      expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /dashboard/i }));
    // Should load instantly (already loaded)
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
