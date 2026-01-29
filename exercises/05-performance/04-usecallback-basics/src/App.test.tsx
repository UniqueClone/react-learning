import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('useCallback Basics', () => {
  it('renders the heading', () => {
    render(<App />)
    expect(screen.getByText(/usecallback basics/i)).toBeInTheDocument()
  })

  it('adds a new task', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText(/add a task/i)
    const button = screen.getByRole('button', { name: /add task/i })

    await user.type(input, 'Test task')
    await user.click(button)

    expect(screen.getByText(/test task/i)).toBeInTheDocument()
  })

  it('toggles task completion', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText(/add a task/i)
    const addButton = screen.getByRole('button', { name: /add task/i })
    await user.type(input, 'Toggle me')
    await user.click(addButton)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('deletes a task', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText(/add a task/i)
    const addButton = screen.getByRole('button', { name: /add task/i })
    await user.type(input, 'Delete me')
    await user.click(addButton)

    expect(screen.getByText(/delete me/i)).toBeInTheDocument()

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    await user.click(deleteButton)

    expect(screen.queryByText(/delete me/i)).not.toBeInTheDocument()
  })

  it('only re-renders affected task when toggling', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText(/add a task/i)
    const addButton = screen.getByRole('button', { name: /add task/i })

    await user.type(input, 'Task 1')
    await user.click(addButton)
    await user.type(input, 'Task 2')
    await user.click(addButton)

    consoleSpy.mockClear()

    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])

    const renderLogs = consoleSpy.mock.calls.filter(call =>
      call[0]?.includes('TaskItem') && call[0]?.includes('rendered')
    )

    expect(renderLogs.length).toBeLessThanOrEqual(1)
  })

  it('does not re-render tasks when typing in input', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText(/add a task/i)
    const addButton = screen.getByRole('button', { name: /add task/i })
    await user.type(input, 'Task 1')
    await user.click(addButton)

    consoleSpy.mockClear()

    await user.type(input, 'New task')

    const renderLogs = consoleSpy.mock.calls.filter(call =>
      call[0]?.includes('TaskItem') && call[0]?.includes('rendered')
    )

    expect(renderLogs.length).toBe(0)
  })
})
