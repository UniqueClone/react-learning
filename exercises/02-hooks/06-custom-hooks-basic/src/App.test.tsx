import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Custom Hooks - Basic', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('displays initial dark mode state as off', () => {
    render(<App />)
    expect(screen.getByText(/dark mode: off/i)).toBeInTheDocument()
  })

  it('toggles dark mode on and off', async () => {
    const user = userEvent.setup()
    render(<App />)

    const toggleButton = screen.getByRole('button', { name: /toggle dark mode/i })

    // Initial state
    expect(screen.getByText(/dark mode: off/i)).toBeInTheDocument()

    // Toggle on
    await user.click(toggleButton)
    expect(screen.getByText(/dark mode: on/i)).toBeInTheDocument()

    // Toggle off
    await user.click(toggleButton)
    expect(screen.getByText(/dark mode: off/i)).toBeInTheDocument()
  })

  it('toggles details visibility', async () => {
    const user = userEvent.setup()
    render(<App />)

    const toggleButton = screen.getByRole('button', { name: /toggle details/i })

    // Details hidden initially
    expect(screen.queryByText(/these are the hidden details/i)).not.toBeInTheDocument()

    // Show details
    await user.click(toggleButton)
    expect(screen.getByText(/these are the hidden details/i)).toBeInTheDocument()

    // Hide details
    await user.click(toggleButton)
    expect(screen.queryByText(/these are the hidden details/i)).not.toBeInTheDocument()
  })

  it('persists username to localStorage', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByLabelText(/username/i)

    await user.type(input, 'TestUser')

    expect(localStorage.getItem('username')).toBe('"TestUser"')
  })

  it('loads username from localStorage on mount', () => {
    localStorage.setItem('username', '"SavedUser"')

    render(<App />)

    const input = screen.getByLabelText(/username/i) as HTMLInputElement
    expect(input.value).toBe('SavedUser')
  })

  it('persists counter to localStorage', async () => {
    const user = userEvent.setup()
    render(<App />)

    const incrementButton = screen.getByRole('button', { name: /increment/i })

    await user.click(incrementButton)
    await user.click(incrementButton)

    expect(localStorage.getItem('count')).toBe('2')
  })

  it('loads counter from localStorage on mount', () => {
    localStorage.setItem('count', '5')

    render(<App />)

    expect(screen.getByText(/count: 5/i)).toBeInTheDocument()
  })

  it('clears username when clear button is clicked', async () => {
    const user = userEvent.setup()
    localStorage.setItem('username', '"TestUser"')
    render(<App />)

    const input = screen.getByLabelText(/username/i) as HTMLInputElement
    expect(input.value).toBe('TestUser')

    const clearButton = screen.getByRole('button', { name: /clear username/i })
    await user.click(clearButton)

    expect(input.value).toBe('')
    expect(localStorage.getItem('username')).toBe('""')
  })

  it('handles multiple toggles correctly', async () => {
    const user = userEvent.setup()
    render(<App />)

    const toggleButton = screen.getByRole('button', { name: /toggle dark mode/i })

    // Toggle multiple times
    await user.click(toggleButton) // on
    await user.click(toggleButton) // off
    await user.click(toggleButton) // on
    await user.click(toggleButton) // off
    await user.click(toggleButton) // on

    expect(screen.getByText(/dark mode: on/i)).toBeInTheDocument()
  })
})
