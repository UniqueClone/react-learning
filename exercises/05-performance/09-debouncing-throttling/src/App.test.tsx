import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Debouncing and Throttling', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText(/debouncing and throttling/i)).toBeInTheDocument();
  });

  it('has a search input', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('displays search count metric', () => {
    render(<App />);
    expect(screen.getByText(/searches performed/i)).toBeInTheDocument();
  });

  it('debounces search input', async () => {
    const user = userEvent.setup({ delay: null });
    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);

    await user.type(input, 'react');

    // Should not search immediately
    expect(screen.getByText(/searches performed: 0/i)).toBeInTheDocument();

    // Fast-forward time
    vi.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getByText(/searches performed: 1/i)).toBeInTheDocument();
    });
  });

  it('shows search results after debounce', async () => {
    const user = userEvent.setup({ delay: null });
    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, 'react');

    vi.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getByText(/react tutorial/i)).toBeInTheDocument();
    });
  });

  it('cancels previous debounce on new input', async () => {
    const user = userEvent.setup({ delay: null });
    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);

    await user.type(input, 'r');
    vi.advanceTimersByTime(300);

    await user.type(input, 'e');
    vi.advanceTimersByTime(300);

    await user.type(input, 'a');
    vi.advanceTimersByTime(500);

    await waitFor(() => {
      // Should only search once after all typing stops
      expect(screen.getByText(/searches performed: 1/i)).toBeInTheDocument();
    });
  });

  it('displays scroll position', () => {
    render(<App />);
    expect(screen.getByText(/scroll position/i)).toBeInTheDocument();
  });

  it('displays scroll update count', () => {
    render(<App />);
    expect(screen.getByText(/updates triggered/i)).toBeInTheDocument();
  });

  it('shows debounce section header', () => {
    render(<App />);
    expect(screen.getByText(/debounced search/i)).toBeInTheDocument();
  });

  it('shows throttle section header', () => {
    render(<App />);
    expect(screen.getByText(/throttled scroll/i)).toBeInTheDocument();
  });

  it('has scrollable content', () => {
    render(<App />);
    const scrollableText = screen.getByText(/scroll down to see throttling/i);
    expect(scrollableText).toBeInTheDocument();
  });
});
