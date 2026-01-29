import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('useState Basics - Counter', () => {
  it('renders with initial count of 0', () => {
    render(<App />)
    expect(screen.getByText(/counter:\s*0/i)).toBeInTheDocument()
  })

  it('increments count when increment button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const incrementButton = screen.getByRole('button', { name: /increment|\+/i })
    await user.click(incrementButton)

    expect(screen.getByText(/counter:\s*1/i)).toBeInTheDocument()
  })

  it('decrements count when decrement button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const decrementButton = screen.getByRole('button', { name: /decrement|-/i })
    await user.click(decrementButton)

    expect(screen.getByText(/counter:\s*-1/i)).toBeInTheDocument()
  })

  it('resets count to 0 when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const incrementButton = screen.getByRole('button', { name: /increment|\+/i })
    const resetButton = screen.getByRole('button', { name: /reset/i })

    // Increment a few times
    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(incrementButton)

    expect(screen.getByText(/counter:\s*3/i)).toBeInTheDocument()

    // Reset
    await user.click(resetButton)
    expect(screen.getByText(/counter:\s*0/i)).toBeInTheDocument()
  })

  it('handles multiple increment clicks correctly', async () => {
    const user = userEvent.setup()
    render(<App />)

    const incrementButton = screen.getByRole('button', { name: /increment|\+/i })

    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(incrementButton)

    expect(screen.getByText(/counter:\s*5/i)).toBeInTheDocument()
  })

  it('handles mixed operations correctly', async () => {
    const user = userEvent.setup()
    render(<App />)

    const incrementButton = screen.getByRole('button', { name: /increment|\+/i })
    const decrementButton = screen.getByRole('button', { name: /decrement|-/i })
    const resetButton = screen.getByRole('button', { name: /reset/i })

    await user.click(incrementButton) // 1
    await user.click(incrementButton) // 2
    await user.click(decrementButton) // 1
    await user.click(incrementButton) // 2

    expect(screen.getByText(/counter:\s*2/i)).toBeInTheDocument()

    await user.click(resetButton) // 0
    expect(screen.getByText(/counter:\s*0/i)).toBeInTheDocument()

    await user.click(decrementButton) // -1
    expect(screen.getByText(/counter:\s*-1/i)).toBeInTheDocument()
  })
})
