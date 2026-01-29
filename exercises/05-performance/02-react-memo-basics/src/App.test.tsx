import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('React.memo Basics', () => {
  it('renders the heading', () => {
    render(<App />)
    expect(screen.getByText(/react\.memo basics/i)).toBeInTheDocument()
  })

  it('renders all todo items', () => {
    render(<App />)
    expect(screen.getByText(/learn react/i)).toBeInTheDocument()
    expect(screen.getByText(/learn react\.memo/i)).toBeInTheDocument()
    expect(screen.getByText(/optimize performance/i)).toBeInTheDocument()
  })

  it('toggles todo completion', async () => {
    const user = userEvent.setup()
    render(<App />)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).not.toBeChecked()

    await user.click(checkboxes[0])
    expect(checkboxes[0]).toBeChecked()
  })

  it('adds a new todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText(/add a new todo/i)
    const button = screen.getByRole('button', { name: /add todo/i })

    await user.type(input, 'New todo item')
    await user.click(button)

    expect(screen.getByText(/new todo item/i)).toBeInTheDocument()
  })

  it('only re-renders affected todo items when one is toggled', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    const user = userEvent.setup()

    render(<App />)

    // Clear initial render logs
    consoleSpy.mockClear()

    // Toggle the first todo
    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])

    // After fixing with React.memo, only TodoItem 1 should have rendered
    // Count how many unique todo items rendered
    const renderLogs = consoleSpy.mock.calls.filter(call =>
      call[0]?.includes('TodoItem') && call[0]?.includes('rendered')
    )

    // With React.memo, only 1 item should re-render
    // Without React.memo, all 4 items would re-render
    expect(renderLogs.length).toBeLessThanOrEqual(1)
  })

  it('clears input after adding todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText(/add a new todo/i) as HTMLInputElement
    const button = screen.getByRole('button', { name: /add todo/i })

    await user.type(input, 'Test')
    await user.click(button)

    expect(input.value).toBe('')
  })
})
