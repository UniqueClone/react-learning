import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('useReducer Basics - Registration Form', () => {
  it('renders form with all fields', () => {
    render(<App />)

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
  })

  it('updates username field', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByLabelText(/username/i) as HTMLInputElement
    await user.type(input, 'testuser')

    expect(input.value).toBe('testuser')
  })

  it('updates all form fields', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/username/i), 'john')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    await user.click(screen.getByLabelText(/accept terms/i))

    expect((screen.getByLabelText(/username/i) as HTMLInputElement).value).toBe('john')
    expect((screen.getByLabelText(/email/i) as HTMLInputElement).value).toBe('john@example.com')
    expect((screen.getByLabelText(/password/i) as HTMLInputElement).value).toBe('secret123')
    expect((screen.getByLabelText(/accept terms/i) as HTMLInputElement).checked).toBe(true)
  })

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup()
    render(<App />)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    expect(screen.getByText(/username is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  it('shows error when terms not accepted', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/username/i), 'john')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')

    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(screen.getByText(/must accept terms/i)).toBeInTheDocument()
  })

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/username/i), 'john')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    await user.click(screen.getByLabelText(/accept terms/i))

    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(screen.getByText(/registration successful/i)).toBeInTheDocument()
    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument()
  })

  it('resets form when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Fill form
    await user.type(screen.getByLabelText(/username/i), 'john')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    await user.click(screen.getByLabelText(/accept terms/i))

    // Reset
    await user.click(screen.getByRole('button', { name: /reset/i }))

    // Check all fields are cleared
    expect((screen.getByLabelText(/username/i) as HTMLInputElement).value).toBe('')
    expect((screen.getByLabelText(/email/i) as HTMLInputElement).value).toBe('')
    expect((screen.getByLabelText(/password/i) as HTMLInputElement).value).toBe('')
    expect((screen.getByLabelText(/accept terms/i) as HTMLInputElement).checked).toBe(false)
  })

  it('clears errors on reset', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Submit empty form to trigger errors
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(screen.getByText(/username is required/i)).toBeInTheDocument()

    // Reset should clear errors
    await user.click(screen.getByRole('button', { name: /reset/i }))
    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument()
  })

  it('clears errors when fixing validation issues', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Trigger errors
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(screen.getByText(/username is required/i)).toBeInTheDocument()

    // Fix and submit
    await user.type(screen.getByLabelText(/username/i), 'john')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    await user.click(screen.getByLabelText(/accept terms/i))
    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument()
    expect(screen.getByText(/registration successful/i)).toBeInTheDocument()
  })
})
