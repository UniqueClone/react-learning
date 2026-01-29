import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const mockPosts = [
  { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
  { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
  { id: 3, title: 'Post 3', body: 'Body 3', userId: 2 },
  { id: 4, title: 'Post 4', body: 'Body 4', userId: 2 },
  { id: 5, title: 'Post 5', body: 'Body 5', userId: 3 },
];

describe('Data Fetching with SWR', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading state initially', () => {
    (global.fetch as any).mockImplementation(
      () => new Promise(() => {})  // Never resolves
    );

    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('fetches and displays posts', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Post 2')).toBeInTheDocument();
    expect(screen.getByText('Post 3')).toBeInTheDocument();
  });

  it('displays post bodies', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Body 1/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Body 2/i)).toBeInTheDocument();
  });

  it('handles errors gracefully', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error|failed/i)).toBeInTheDocument();
    });
  });

  it('handles non-200 responses', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error|failed/i)).toBeInTheDocument();
    });
  });

  it('has a refresh button', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
    });

    const refreshButton = screen.getByRole('button', { name: /refresh|reload/i });
    expect(refreshButton).toBeInTheDocument();
  });

  it('refetches data when refresh button is clicked', async () => {
    const user = userEvent.setup();
    let callCount = 0;

    (global.fetch as any).mockImplementation(async () => {
      callCount++;
      return {
        ok: true,
        json: async () => mockPosts,
      };
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
    });

    const initialCalls = callCount;

    const refreshButton = screen.getByRole('button', { name: /refresh|reload/i });
    await user.click(refreshButton);

    await waitFor(() => {
      expect(callCount).toBeGreaterThan(initialCalls);
    });
  });

  it('displays only first 5 posts', async () => {
    const manyPosts = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      title: `Post ${i + 1}`,
      body: `Body ${i + 1}`,
      userId: 1,
    }));

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => manyPosts,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Post 5')).toBeInTheDocument();
    expect(screen.queryByText('Post 6')).not.toBeInTheDocument();
  });

  it('calls fetch with correct URL', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts'
      );
    });
  });

  it('hides loading state after successful fetch', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });
});
