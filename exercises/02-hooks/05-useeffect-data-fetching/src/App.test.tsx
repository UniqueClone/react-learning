import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('useEffect Data Fetching', () => {
  it('shows loading state initially', () => {
    render(<App />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('displays user data after loading', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    expect(screen.getByText(/user 1/i)).toBeInTheDocument()
    expect(screen.getByText(/user1@example\.com/i)).toBeInTheDocument()
  })

  it('shows loading when switching users', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Wait for initial load
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    // Click to load different user
    await user.click(screen.getByRole('button', { name: /load user 2/i }))

    // Should show loading again
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('displays different user data when selection changes', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Wait for initial load (User 1)
    await waitFor(() => {
      expect(screen.getByText(/user 1/i)).toBeInTheDocument()
    })

    // Load User 2
    await user.click(screen.getByRole('button', { name: /load user 2/i }))

    await waitFor(() => {
      expect(screen.getByText(/user 2/i)).toBeInTheDocument()
      expect(screen.getByText(/user2@example\.com/i)).toBeInTheDocument()
    })
  })

  it('displays error message when fetch fails', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Wait for initial load
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    // Click to load invalid user (999)
    await user.click(screen.getByRole('button', { name: /load invalid user/i }))

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
      expect(screen.getByText(/user not found/i)).toBeInTheDocument()
    })
  })

  it('clears previous error when successful fetch happens', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Wait for initial load
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    // Load invalid user to trigger error
    await user.click(screen.getByRole('button', { name: /load invalid user/i }))

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })

    // Load valid user - error should clear
    await user.click(screen.getByRole('button', { name: /load user 3/i }))

    await waitFor(() => {
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
      expect(screen.getByText(/user 3/i)).toBeInTheDocument()
    })
  })

  it('displays company information', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/company 1/i)).toBeInTheDocument()
    })
  })
})
