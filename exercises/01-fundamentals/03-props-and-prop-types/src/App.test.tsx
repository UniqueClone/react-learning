import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Props and Prop Types Exercise', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('Props and Prop Types')).toBeInTheDocument()
  })

  it('renders Greeting for Alice without location', () => {
    render(<App />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText(/age.*25/i)).toBeInTheDocument()
  })

  it('renders Greeting for Bob with location', () => {
    render(<App />)
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText(/age.*30/i)).toBeInTheDocument()
    expect(screen.getByText(/New York/i)).toBeInTheDocument()
  })

  it('renders Greeting for Charlie without location', () => {
    render(<App />)
    expect(screen.getByText('Charlie')).toBeInTheDocument()
    expect(screen.getByText(/age.*35/i)).toBeInTheDocument()
  })

  it('renders three greeting cards', () => {
    render(<App />)
    const greetingCards = screen.getAllByRole('generic').filter(
      (el) => el.className === 'greeting-card'
    )
    expect(greetingCards.length).toBeGreaterThanOrEqual(3)
  })

  it('conditionally displays location only when provided', () => {
    render(<App />)
    // Bob should have location displayed
    expect(screen.getByText(/New York/i)).toBeInTheDocument()
    // Only one location should be present (Bob's)
    const locationMatches = screen.queryAllByText(/New York/i)
    expect(locationMatches.length).toBe(1)
  })
})
