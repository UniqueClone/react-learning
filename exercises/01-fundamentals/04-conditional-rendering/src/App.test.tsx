import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Conditional Rendering Exercise', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('Conditional Rendering Patterns')).toBeInTheDocument()
  })

  it('renders a profile card for a logged-in user', () => {
    render(<App />)
    // Should show logged-in status
    expect(screen.getByText(/logged in/i)).toBeInTheDocument()
  })

  it('renders a profile card for a logged-out user', () => {
    render(<App />)
    // Should show logged-out or guest status
    expect(screen.getByText(/guest|logged out/i)).toBeInTheDocument()
  })

  it('conditionally displays premium badge', () => {
    render(<App />)
    // Should have at least one premium user
    expect(screen.getByText(/premium|pro/i)).toBeInTheDocument()
  })

  it('conditionally displays verified status', () => {
    render(<App />)
    // Should show verified badge for at least one user
    expect(screen.getByText(/verified|✓/i)).toBeInTheDocument()
  })

  it('renders multiple user cards', () => {
    render(<App />)
    const heading = screen.getByText('Conditional Rendering Patterns')
    // Should have multiple profile cards
    const parent = heading.parentElement
    expect(parent?.children.length).toBeGreaterThan(1)
  })
})
