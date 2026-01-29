import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Multi-Step Form Wizard', () => {
  it('renders the form wizard heading', () => {
    render(<App />)
    expect(screen.getByText('Multi-Step Form Wizard')).toBeInTheDocument()
  })

  it('starts on step 1', () => {
    render(<App />)
    expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument()
  })

  it('renders step 1 personal information fields', () => {
    render(<App />)
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('shows validation error when trying to proceed with empty step 1', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)

    // Should still be on step 1
    expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument()
  })

  it('advances to step 2 with valid step 1 data', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')

    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)

    // Should now be on step 2
    expect(screen.getByText(/step 2 of 3/i)).toBeInTheDocument()
  })

  it('renders step 2 account setup fields', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Fill step 1 and advance
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Check step 2 fields
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('goes back to step 1 when back button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Fill step 1 and advance
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Now on step 2, click back
    const backButton = screen.getByRole('button', { name: /back/i })
    await user.click(backButton)

    // Should be back on step 1
    expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument()
  })

  it('persists data when navigating back and forth', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Fill step 1
    const firstNameInput = screen.getByLabelText(/first name/i)
    await user.type(firstNameInput, 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Go back
    await user.click(screen.getByRole('button', { name: /back/i }))

    // Data should still be there
    expect(firstNameInput).toHaveValue('John')
  })

  it('advances to step 3 with valid step 2 data', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Fill step 1
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Fill step 2
    await user.type(screen.getByLabelText(/username/i), 'johndoe')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Should be on step 3
    expect(screen.getByText(/step 3 of 3/i)).toBeInTheDocument()
  })

  it('renders step 3 preferences fields', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Navigate to step 3
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.click(screen.getByRole('button', { name: /next/i }))

    await user.type(screen.getByLabelText(/username/i), 'johndoe')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Check step 3 fields
    expect(screen.getByLabelText(/newsletter/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/theme/i)).toBeInTheDocument()
  })

  it('shows submit button on step 3', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Navigate to step 3
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.click(screen.getByRole('button', { name: /next/i }))

    await user.type(screen.getByLabelText(/username/i), 'johndoe')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Should have submit button
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('shows summary after successful submission', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Fill all steps
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.click(screen.getByRole('button', { name: /next/i }))

    await user.type(screen.getByLabelText(/username/i), 'johndoe')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /next/i }))

    await user.click(screen.getByLabelText(/newsletter/i))
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Should show success message or summary
    expect(screen.getByText(/success/i) || screen.getByText(/summary/i)).toBeInTheDocument()
  })

  it('updates progress indicator correctly', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument()

    // Go to step 2
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText(/step 2 of 3/i)).toBeInTheDocument()

    // Go to step 3
    await user.type(screen.getByLabelText(/username/i), 'johndoe')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText(/step 3 of 3/i)).toBeInTheDocument()
  })
})
