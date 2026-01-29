import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Counter', () => {
  it('renders initial count of 0', () => {
    render(<App />)
    expect(screen.getByText(/counter:\s*0/i)).toBeInTheDocument()
  })

  it('increments count when +1 button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const incrementButton = screen.getByText('+1')
    await user.click(incrementButton)
    expect(screen.getByText(/counter:\s*1/i)).toBeInTheDocument()

    await user.click(incrementButton)
    expect(screen.getByText(/counter:\s*2/i)).toBeInTheDocument()
  })

  it('decrements count when -1 button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const decrementButton = screen.getByText('-1')
    await user.click(decrementButton)
    expect(screen.getByText(/counter:\s*-1/i)).toBeInTheDocument()

    await user.click(decrementButton)
    expect(screen.getByText(/counter:\s*-2/i)).toBeInTheDocument()
  })

  it('resets count to 0 when reset is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Increment first
    await user.click(screen.getByText('+1'))
    await user.click(screen.getByText('+1'))
    expect(screen.getByText(/counter:\s*2/i)).toBeInTheDocument()

    // Then reset
    await user.click(screen.getByText('Reset'))
    expect(screen.getByText(/counter:\s*0/i)).toBeInTheDocument()
  })

  it('doubles the count when double is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Set count to 5
    await user.click(screen.getByText('+1'))
    await user.click(screen.getByText('+1'))
    await user.click(screen.getByText('+1'))
    await user.click(screen.getByText('+1'))
    await user.click(screen.getByText('+1'))
    expect(screen.getByText(/counter:\s*5/i)).toBeInTheDocument()

    // Double it
    await user.click(screen.getByText('Double'))
    expect(screen.getByText(/counter:\s*10/i)).toBeInTheDocument()
  })
})
