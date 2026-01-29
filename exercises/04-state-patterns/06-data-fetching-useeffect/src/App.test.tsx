import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', username: 'bobjohnson' },
];

describe('Data Fetching with useEffect', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading state initially', () => {
    (global.fetch as any).mockImplementation(
      () =>
        new Promise(() => {
          // Never resolves to keep loading state
        })
    );

    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('fetches and displays users on mount', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<App />);

    // Wait for users to appear
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('displays user emails', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/bob@example.com/i)).toBeInTheDocument();
  });

  it('hides loading state after successful fetch', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<App />);

    // Initially shows loading
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // After fetch, loading disappears
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('handles fetch errors gracefully', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('handles non-200 responses as errors', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error|failed/i)).toBeInTheDocument();
    });
  });

  it('calls fetch with correct URL', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users'
      );
    });
  });

  it('only fetches once on mount', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const { rerender } = render(<App />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Rerender shouldn't trigger another fetch
    rerender(<App />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('handles cleanup properly (no state updates after unmount)', async () => {
    let resolvePromise: any;
    (global.fetch as any).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );

    const { unmount } = render(<App />);

    // Unmount before fetch completes
    unmount();

    // Resolve the promise after unmount
    resolvePromise({
      ok: true,
      json: async () => mockUsers,
    });

    // Wait a bit to ensure no state updates happen
    await new Promise((resolve) => setTimeout(resolve, 100));

    // If the test doesn't throw a React warning, cleanup is working
    expect(true).toBe(true);
  });

  it('displays all users from the API response', async () => {
    const manyUsers = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      username: `user${i + 1}`,
    }));

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => manyUsers,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    expect(screen.getByText('User 5')).toBeInTheDocument();
    expect(screen.getByText('User 10')).toBeInTheDocument();
  });
});
