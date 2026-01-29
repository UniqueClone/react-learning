import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Lifting State Up - Temperature Converter', () => {
  it('renders the temperature converter heading', () => {
    render(<App />)
    expect(screen.getByText('Temperature Converter')).toBeInTheDocument()
  })

  it('renders both Celsius and Fahrenheit inputs', () => {
    render(<App />)
    expect(screen.getByLabelText(/celsius/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/fahrenheit/i)).toBeInTheDocument()
  })

  it('updates Fahrenheit when Celsius is changed', async () => {
    const user = userEvent.setup()
    render(<App />)

    const celsiusInput = screen.getByLabelText(/celsius/i)
    const fahrenheitInput = screen.getByLabelText(/fahrenheit/i)

    // Type 0 in Celsius
    await user.clear(celsiusInput)
    await user.type(celsiusInput, '0')

    // Fahrenheit should show 32
    expect(fahrenheitInput).toHaveValue(32)
  })

  it('updates Celsius when Fahrenheit is changed', async () => {
    const user = userEvent.setup()
    render(<App />)

    const celsiusInput = screen.getByLabelText(/celsius/i)
    const fahrenheitInput = screen.getByLabelText(/fahrenheit/i)

    // Type 32 in Fahrenheit
    await user.clear(fahrenheitInput)
    await user.type(fahrenheitInput, '32')

    // Celsius should show 0
    expect(celsiusInput).toHaveValue(0)
  })

  it('converts 100°C to 212°F', async () => {
    const user = userEvent.setup()
    render(<App />)

    const celsiusInput = screen.getByLabelText(/celsius/i)
    const fahrenheitInput = screen.getByLabelText(/fahrenheit/i)

    await user.clear(celsiusInput)
    await user.type(celsiusInput, '100')

    expect(fahrenheitInput).toHaveValue(212)
  })

  it('converts 212°F to 100°C', async () => {
    const user = userEvent.setup()
    render(<App />)

    const celsiusInput = screen.getByLabelText(/celsius/i)
    const fahrenheitInput = screen.getByLabelText(/fahrenheit/i)

    await user.clear(fahrenheitInput)
    await user.type(fahrenheitInput, '212')

    expect(celsiusInput).toHaveValue(100)
  })

  it('shows boiling verdict when temperature is at or above 100°C', async () => {
    const user = userEvent.setup()
    render(<App />)

    const celsiusInput = screen.getByLabelText(/celsius/i)

    await user.clear(celsiusInput)
    await user.type(celsiusInput, '100')

    expect(screen.getByText(/water would boil/i)).toBeInTheDocument()
  })

  it('shows not boiling verdict when temperature is below 100°C', async () => {
    const user = userEvent.setup()
    render(<App />)

    const celsiusInput = screen.getByLabelText(/celsius/i)

    await user.clear(celsiusInput)
    await user.type(celsiusInput, '50')

    expect(screen.getByText(/water would not boil/i)).toBeInTheDocument()
  })

  it('handles negative temperatures correctly', async () => {
    const user = userEvent.setup()
    render(<App />)

    const celsiusInput = screen.getByLabelText(/celsius/i)
    const fahrenheitInput = screen.getByLabelText(/fahrenheit/i)

    await user.clear(celsiusInput)
    await user.type(celsiusInput, '-40')

    // -40°C = -40°F (the one point where they're equal!)
    expect(fahrenheitInput).toHaveValue(-40)
  })
})
