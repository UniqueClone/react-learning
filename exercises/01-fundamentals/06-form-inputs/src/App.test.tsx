import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Controlled Form Inputs', () => {
  it('renders the registration form with all fields', () => {
    render(<App />)

    expect(screen.getByText('Registration Form')).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/agree to the terms/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
  })

  it('updates input values when typing', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    await user.type(nameInput, 'John Doe')
    expect(nameInput).toHaveValue('John Doe')

    await user.type(emailInput, 'john@example.com')
    expect(emailInput).toHaveValue('john@example.com')

    await user.type(passwordInput, 'password123')
    expect(passwordInput).toHaveValue('password123')
  })

  it('updates select value when changed', async () => {
    const user = userEvent.setup()
    render(<App />)

    const countrySelect = screen.getByLabelText(/country/i)
    await user.selectOptions(countrySelect, 'us')
    expect(countrySelect).toHaveValue('us')
  })

  it('updates checkbox when clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const checkbox = screen.getByLabelText(/agree to the terms/i)
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('shows error when name is too short', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nameInput = screen.getByLabelText(/name/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    await user.type(nameInput, 'A')
    await user.click(submitButton)

    expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
  })

  it('shows error when email is invalid', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const checkbox = screen.getByLabelText(/agree to the terms/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'invalid-email')
    await user.type(passwordInput, 'password123')
    await user.click(checkbox)
    await user.click(submitButton)

    expect(screen.getByText(/valid email/i)).toBeInTheDocument()
  })

  it('shows error when password is too short', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const checkbox = screen.getByLabelText(/agree to the terms/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'short')
    await user.click(checkbox)
    await user.click(submitButton)

    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
  })

  it('shows error when terms are not accepted', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    expect(screen.getByText(/must agree to the terms/i)).toBeInTheDocument()
  })

  it('shows success message when form is valid', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const countrySelect = screen.getByLabelText(/country/i)
    const checkbox = screen.getByLabelText(/agree to the terms/i)
    const submitButton = screen.getByRole('button', { name: /register/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.selectOptions(countrySelect, 'us')
    await user.click(checkbox)
    await user.click(submitButton)

    expect(screen.getByText(/registration successful/i)).toBeInTheDocument()
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
  })
})
