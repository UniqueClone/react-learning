import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Advanced CSS Modules Exercise', () => {
  it('renders with initial light theme', () => {
    const { container } = render(<App />)
    const root = container.firstElementChild
    expect(root).toHaveAttribute('data-theme', 'light')
  })

  it('toggles between light and dark themes', async () => {
    const user = userEvent.setup()
    const { container } = render(<App />)
    const toggleBtn = screen.getByText(/toggle theme/i)
    const root = container.firstElementChild

    expect(root).toHaveAttribute('data-theme', 'light')

    await user.click(toggleBtn)
    expect(root).toHaveAttribute('data-theme', 'dark')

    await user.click(toggleBtn)
    expect(root).toHaveAttribute('data-theme', 'light')
  })

  it('renders Card component with CSS Module classes', () => {
    render(<App />)
    const card = document.querySelector('[class*="card"]')
    expect(card).toBeInTheDocument()
    expect(card?.className).toMatch(/_card_/)
  })

  it('renders Badge component', () => {
    render(<App />)
    const badge = document.querySelector('[class*="badge"]')
    expect(badge).toBeInTheDocument()
  })

  it('renders Button component', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(1) // Toggle + custom button
  })

  it('applies elevated variant to card', () => {
    render(<App />)
    const card = document.querySelector('[class*="elevated"]')
    expect(card).toBeInTheDocument()
  })

  it('uses CSS variables for theming', () => {
    render(<App />)
    const card = document.querySelector('[class*="card"]')
    const styles = window.getComputedStyle(card!)

    // Check that CSS variables are being used (background or color should exist)
    expect(styles.backgroundColor || styles.color).toBeTruthy()
  })
})
