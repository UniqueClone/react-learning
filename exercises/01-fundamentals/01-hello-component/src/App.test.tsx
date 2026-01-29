import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Hello Component', () => {
  it('renders the heading with "Hello, React!"', () => {
    render(<App />)
    expect(screen.getByText(/hello,?\s*react/i)).toBeInTheDocument()
  })

  it('renders the welcome message', () => {
    render(<App />)
    expect(screen.getByText(/welcome to your first react exercise/i)).toBeInTheDocument()
  })

  it('displays the current date', () => {
    render(<App />)
    const today = new Date().toLocaleDateString()
    expect(screen.getByText(new RegExp(today))).toBeInTheDocument()
  })
})
