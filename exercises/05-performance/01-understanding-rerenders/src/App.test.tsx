import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Understanding Re-renders', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText(/understanding re-renders/i)).toBeInTheDocument()
  })

  it('renders all three child components', () => {
    render(<App />)
    expect(screen.getByText(/ChildA/i)).toBeInTheDocument()
    expect(screen.getByText(/ChildB/i)).toBeInTheDocument()
    expect(screen.getByText(/ChildC/i)).toBeInTheDocument()
  })

  it('displays initial counter value of 0', () => {
    render(<App />)
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
  })

  it('increments counter when button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: /increment/i })
    await user.click(button)

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
  })

  it('updates text when input changes', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'hello')

    expect(screen.getByText(/text: hello/i)).toBeInTheDocument()
  })

  it('renders static content in ChildB', () => {
    render(<App />)
    expect(screen.getByText(/I don't use any props/i)).toBeInTheDocument()
  })

  it('logs render messages to console', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<App />)

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('rendered'))
  })
})
