import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock fetch
global.fetch = vi.fn()

describe('Custom Hooks - Advanced', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' },
      ],
    })
  })

  it('displays loading state initially', () => {
    render(<App />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('fetches and displays users', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    expect(screen.getByText(/user 1/i)).toBeInTheDocument()
    expect(screen.getByText(/user 2/i)).toBeInTheDocument()
  })

  it('debounces search input', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText(/search users/i)

    // Type quickly
    await user.type(input, 'test')

    // Debounced value should not update immediately
    expect(screen.getByText(/search term: test/i)).toBeInTheDocument()
    expect(screen.queryByText(/debounced: test/i)).not.toBeInTheDocument()

    // Wait for debounce delay (500ms)
    await waitFor(
      () => {
        expect(screen.getByText(/debounced: test/i)).toBeInTheDocument()
      },
      { timeout: 1000 }
    )
  })

  it('only fetches after debounce delay', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Wait for initial fetch
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    const initialCallCount = (global.fetch as any).mock.calls.length

    const input = screen.getByPlaceholderText(/search users/i)

    // Type quickly - should only trigger one fetch after debounce
    await user.type(input, 'abc')

    // Should not fetch immediately
    expect((global.fetch as any).mock.calls.length).toBe(initialCallCount)

    // Wait for debounce
    await waitFor(
      () => {
        expect((global.fetch as any).mock.calls.length).toBeGreaterThan(initialCallCount)
      },
      { timeout: 1000 }
    )
  })

  it('handles fetch errors', async () => {
    ;(global.fetch as any).mockRejectedValueOnce(new Error('Network error'))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
      expect(screen.getByText(/network error/i)).toBeInTheDocument()
    })
  })

  it('refetches data when refetch button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Wait for initial fetch
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    const initialCallCount = (global.fetch as any).mock.calls.length

    const refetchButton = screen.getByRole('button', { name: /refetch/i })
    await user.click(refetchButton)

    // Should show loading again
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() => {
      expect((global.fetch as any).mock.calls.length).toBeGreaterThan(initialCallCount)
    })
  })

  it('caches fetch results', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Wait for initial fetch
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    expect((global.fetch as any).mock.calls.length).toBe(1)

    // Change search and change back
    const input = screen.getByPlaceholderText(/search users/i)
    await user.type(input, 'test')

    await waitFor(
      () => {
        expect(screen.getByText(/debounced: test/i)).toBeInTheDocument()
      },
      { timeout: 1000 }
    )

    await user.clear(input)

    // After clearing, should use cache and not fetch again
    await waitFor(
      () => {
        expect(screen.queryByText(/debounced: test/i)).not.toBeInTheDocument()
      },
      { timeout: 1000 }
    )

    // Should still only have made 2 fetches (initial + after "test")
    expect((global.fetch as any).mock.calls.length).toBeLessThanOrEqual(2)
  })

  it('cancels fetch on unmount', async () => {
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort')

    const { unmount } = render(<App />)

    unmount()

    expect(abortSpy).toHaveBeenCalled()
  })

  it('displays users with correct structure', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    expect(screen.getByText(/user 1/i)).toBeInTheDocument()
    expect(screen.getByText(/user1@example\.com/i)).toBeInTheDocument()
    expect(screen.getByText(/user 2/i)).toBeInTheDocument()
    expect(screen.getByText(/user2@example\.com/i)).toBeInTheDocument()
  })
})
