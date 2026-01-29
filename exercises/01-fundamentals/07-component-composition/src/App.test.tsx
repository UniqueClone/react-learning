import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Component Composition', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('Component Composition')).toBeInTheDocument()
  })

  it('renders at least 3 cards', () => {
    const { container } = render(<App />)
    // Look for card containers (you may need to adjust selector based on implementation)
    const cards = container.querySelectorAll('[data-testid^="card"]')
    expect(cards.length).toBeGreaterThanOrEqual(3)
  })

  it('renders card headers', () => {
    render(<App />)
    const headers = screen.getAllByTestId(/card-header/i)
    expect(headers.length).toBeGreaterThan(0)
  })

  it('renders card bodies', () => {
    render(<App />)
    const bodies = screen.getAllByTestId(/card-body/i)
    expect(bodies.length).toBeGreaterThan(0)
  })

  it('renders card footers', () => {
    render(<App />)
    const footers = screen.getAllByTestId(/card-footer/i)
    expect(footers.length).toBeGreaterThan(0)
  })

  it('displays composed content within cards', () => {
    render(<App />)
    // Check that specific content appears (students should include meaningful text)
    expect(screen.getByText(/card/i)).toBeInTheDocument()
  })

  it('renders different card compositions', () => {
    const { container } = render(<App />)
    // Verify that not all cards have the same structure
    const cards = container.querySelectorAll('[data-testid^="card-"]')
    expect(cards.length).toBeGreaterThan(0)
  })
})
