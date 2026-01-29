import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('CSS Basics Exercise', () => {
  it('renders the card with user information', () => {
    render(<App />)
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText(/full-stack developer/i)).toBeInTheDocument()
  })

  it('applies className to card elements', () => {
    render(<App />)
    const card = screen.getByText('Jane Smith').closest('.card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('card')
  })

  it('applies inline styles for dynamic border color', () => {
    render(<App />)
    const card = screen.getByText('Jane Smith').closest('.card')
    expect(card).toHaveStyle({ borderLeft: expect.stringContaining('px solid') })
  })

  it('displays avatar image', () => {
    render(<App />)
    const avatar = screen.getByAltText('Jane Smith')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', expect.stringContaining('dicebear'))
  })

  it('displays role badge', () => {
    render(<App />)
    const role = screen.getByText('admin')
    expect(role).toBeInTheDocument()
    expect(role).toHaveClass('role-badge')
  })

  it('applies CSS classes for styling', () => {
    render(<App />)
    const name = screen.getByText('Jane Smith')
    expect(name.className).toBeTruthy()
  })
})
