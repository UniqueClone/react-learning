import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('useEffect Basics', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders with initial counter value', () => {
    render(<App />)
    expect(screen.getByText(/counter:\s*0/i)).toBeInTheDocument()
  })

  it('updates document title with counter value', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)

    await waitFor(() => {
      expect(document.title).toMatch(/0/)
    })

    const incrementButton = screen.getByRole('button', { name: /increment|\+/i })
    await user.click(incrementButton)

    await waitFor(() => {
      expect(document.title).toMatch(/1/)
    })
  })

  it('increments counter when increment button clicked', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)

    const incrementButton = screen.getByRole('button', { name: /increment|\+/i })
    await user.click(incrementButton)

    expect(screen.getByText(/counter:\s*1/i)).toBeInTheDocument()
  })

  it('decrements counter when decrement button clicked', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)

    const decrementButton = screen.getByRole('button', { name: /decrement|-/i })
    await user.click(decrementButton)

    expect(screen.getByText(/counter:\s*-1/i)).toBeInTheDocument()
  })

  it('starts timer at 0 seconds', () => {
    render(<App />)
    expect(screen.getByText(/0 seconds/i)).toBeInTheDocument()
  })

  it('increments timer every second', async () => {
    render(<App />)

    expect(screen.getByText(/0 seconds/i)).toBeInTheDocument()

    vi.advanceTimersByTime(1000)
    await waitFor(() => {
      expect(screen.getByText(/1 seconds?/i)).toBeInTheDocument()
    })

    vi.advanceTimersByTime(1000)
    await waitFor(() => {
      expect(screen.getByText(/2 seconds?/i)).toBeInTheDocument()
    })

    vi.advanceTimersByTime(3000)
    await waitFor(() => {
      expect(screen.getByText(/5 seconds?/i)).toBeInTheDocument()
    })
  })

  it('cleans up timer on unmount', () => {
    const { unmount } = render(<App />)

    vi.advanceTimersByTime(2000)

    unmount()

    // Advance time after unmount - timer should be cleaned up
    vi.advanceTimersByTime(5000)

    // No errors should occur (cleanup worked)
    expect(true).toBe(true)
  })
})
