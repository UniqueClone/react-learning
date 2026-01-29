import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('useContext - Global State (Theme System)', () => {
  it('starts with light theme by default', () => {
    render(<App />)
    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument()
  })

  it('displays all components', () => {
    render(<App />)
    expect(screen.getByText(/theme system/i)).toBeInTheDocument()
    expect(screen.getByText(/header/i)).toBeInTheDocument()
    expect(screen.getByText(/main content/i)).toBeInTheDocument()
    expect(screen.getByText(/footer/i)).toBeInTheDocument()
  })

  it('has toggle theme button', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })

  it('toggles theme from light to dark', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /toggle theme/i }))

    expect(screen.getByText(/current theme: dark/i)).toBeInTheDocument()
  })

  it('toggles theme back to light', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(screen.getByText(/current theme: dark/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument()
  })

  it('applies light theme colors to header', () => {
    render(<App />)
    const header = screen.getByText(/header/i).closest('div')
    expect(header).toHaveStyle({ backgroundColor: '#ffffff' })
  })

  it('applies dark theme colors to header when toggled', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /toggle theme/i }))

    const header = screen.getByText(/header/i).closest('div')
    expect(header).toHaveStyle({ backgroundColor: '#1a1a1a' })
  })

  it('applies theme colors to all components', () => {
    render(<App />)

    const header = screen.getByText(/header/i).closest('div')
    const main = screen.getByText(/main content/i).closest('div')
    const footer = screen.getByText(/footer/i).closest('div')

    // Light theme
    expect(header).toHaveStyle({ backgroundColor: '#ffffff' })
    expect(main).toHaveStyle({ backgroundColor: '#ffffff' })
    expect(footer).toHaveStyle({ backgroundColor: '#f5f5f5' })
  })

  it('updates all components when theme changes', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /toggle theme/i }))

    const header = screen.getByText(/header/i).closest('div')
    const main = screen.getByText(/main content/i).closest('div')
    const footer = screen.getByText(/footer/i).closest('div')

    // Dark theme
    expect(header).toHaveStyle({ backgroundColor: '#1a1a1a' })
    expect(main).toHaveStyle({ backgroundColor: '#1a1a1a' })
    expect(footer).toHaveStyle({ backgroundColor: '#2d2d2d' })
  })

  it('multiple components access same theme context', async () => {
    const user = userEvent.setup()
    render(<App />)

    // All should show light initially
    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /toggle theme/i }))

    // All should update to dark
    expect(screen.getByText(/current theme: dark/i)).toBeInTheDocument()
  })
})
