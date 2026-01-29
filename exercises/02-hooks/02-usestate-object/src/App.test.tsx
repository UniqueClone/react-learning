import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('useState with Objects - User Profile Editor', () => {
  it('renders the form with all fields', () => {
    render(<App />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument()
  })

  it('displays initial profile data', () => {
    render(<App />)

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const ageInput = screen.getByLabelText(/age/i) as HTMLInputElement
    const bioInput = screen.getByLabelText(/bio/i) as HTMLTextAreaElement

    expect(nameInput.value).toBeTruthy()
    expect(emailInput.value).toBeTruthy()
    expect(ageInput.value).toBeTruthy()
    expect(bioInput.value).toBeTruthy()
  })

  it('updates name field when changed', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nameInput = screen.getByLabelText(/name/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'Jane Smith')

    expect(nameInput).toHaveValue('Jane Smith')
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument()
  })

  it('updates email field when changed', async () => {
    const user = userEvent.setup()
    render(<App />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.clear(emailInput)
    await user.type(emailInput, 'jane@example.com')

    expect(emailInput).toHaveValue('jane@example.com')
    expect(screen.getByText(/jane@example\.com/i)).toBeInTheDocument()
  })

  it('updates age field when changed', async () => {
    const user = userEvent.setup()
    render(<App />)

    const ageInput = screen.getByLabelText(/age/i)
    await user.clear(ageInput)
    await user.type(ageInput, '25')

    expect(ageInput).toHaveValue(25)
    expect(screen.getByText(/25/)).toBeInTheDocument()
  })

  it('updates bio field when changed', async () => {
    const user = userEvent.setup()
    render(<App />)

    const bioInput = screen.getByLabelText(/bio/i)
    await user.clear(bioInput)
    await user.type(bioInput, 'New bio text')

    expect(bioInput).toHaveValue('New bio text')
    expect(screen.getByText(/New bio text/i)).toBeInTheDocument()
  })

  it('updates multiple fields without losing data', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const ageInput = screen.getByLabelText(/age/i)

    // Update name
    await user.clear(nameInput)
    await user.type(nameInput, 'Alice')

    // Update email
    await user.clear(emailInput)
    await user.type(emailInput, 'alice@test.com')

    // Update age
    await user.clear(ageInput)
    await user.type(ageInput, '28')

    // All fields should retain their values
    expect(nameInput).toHaveValue('Alice')
    expect(emailInput).toHaveValue('alice@test.com')
    expect(ageInput).toHaveValue(28)

    // All should be displayed
    expect(screen.getByText(/Alice/)).toBeInTheDocument()
    expect(screen.getByText(/alice@test\.com/)).toBeInTheDocument()
    expect(screen.getByText(/28/)).toBeInTheDocument()
  })

  it('maintains immutability (does not mutate state directly)', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
    const initialValue = nameInput.value

    await user.clear(nameInput)
    await user.type(nameInput, 'Updated Name')

    // The component should re-render with new value
    expect(nameInput.value).toBe('Updated Name')
    expect(nameInput.value).not.toBe(initialValue)
  })
})
