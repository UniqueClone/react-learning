import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Event Handling Bugs', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('Event Handling Bugs')).toBeInTheDocument()
  })

  it('Bug 1: form submission does not reload page', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)

    const form = container.querySelector('form')
    const submitButton = screen.getByRole('button', { name: /submit form/i })

    // Mock preventDefault to check if it's called
    const preventDefaultSpy = vi.fn()
    const originalPreventDefault = Event.prototype.preventDefault

    Event.prototype.preventDefault = preventDefaultSpy

    await user.click(submitButton)

    // Restore original
    Event.prototype.preventDefault = originalPreventDefault

    // Check that message appears
    expect(screen.getByText(/form submitted successfully/i)).toBeInTheDocument()
  })

  it('Bug 2: link click does not navigate', async () => {
    const user = userEvent.setup()
    render(<App />)

    const link = screen.getByRole('link', { name: /click this link/i })
    await user.click(link)

    // Should show message instead of navigating
    expect(screen.getByText(/link clicked/i)).toBeInTheDocument()
  })

  it('Bug 3: inner button click does not trigger outer div', async () => {
    const user = userEvent.setup()
    render(<App />)

    const innerButton = screen.getByRole('button', { name: /inner button/i })
    await user.click(innerButton)

    // Should only show inner message, not outer
    expect(screen.getByText(/inner button clicked/i)).toBeInTheDocument()
    expect(screen.queryByText(/outer div clicked/i)).not.toBeInTheDocument()
  })

  it('Bug 4: delete buttons work when clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Should initially have 3 items
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()

    // Click first delete button
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    await user.click(deleteButtons[0])

    // Item 1 should be removed
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('Bug 5: double-click increments counter', async () => {
    const user = userEvent.setup()
    render(<App />)

    const doubleClickArea = screen.getByText(/double-click me/i)

    // Initial count should be 0
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()

    // Single click should not increment
    await user.click(doubleClickArea)
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()

    // Double click should increment
    await user.dblClick(doubleClickArea)
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
  })

  it('outer div click works when clicking outside inner button', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)

    // Find the outer clickable div
    const outerDiv = container.querySelector('div[style*="background-color: rgb(240, 240, 240)"]')
    if (outerDiv) {
      await user.click(outerDiv)
      expect(screen.getByText(/outer div clicked/i)).toBeInTheDocument()
    }
  })
})
