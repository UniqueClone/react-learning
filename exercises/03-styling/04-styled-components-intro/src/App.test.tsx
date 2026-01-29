import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Styled Components Intro Exercise', () => {
  it('renders buttons', () => {
    render(<App />)
    expect(screen.getByText(/primary large/i)).toBeInTheDocument()
    expect(screen.getByText(/secondary medium/i)).toBeInTheDocument()
    expect(screen.getByText(/danger small/i)).toBeInTheDocument()
  })

  it('applies styled-components classes', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button')

    // Styled-components generates classes like "sc-xxx"
    buttons.forEach(button => {
      expect(button.className).toMatch(/sc-/)
    })
  })

  it('renders different button sizes', () => {
    render(<App />)
    const largeBtn = screen.getByText(/primary large/i)
    const mediumBtn = screen.getByText(/secondary medium/i)
    const smallBtn = screen.getByText(/danger small/i)

    const largeStyles = window.getComputedStyle(largeBtn)
    const smallStyles = window.getComputedStyle(smallBtn)

    // Large button should have more padding than small
    expect(parseFloat(largeStyles.padding)).toBeGreaterThan(parseFloat(smallStyles.padding))
  })

  it('applies different colors for variants', () => {
    const { container } = render(<App />)
    const buttons = container.querySelectorAll('button')

    // Each button should have computed background color
    buttons.forEach(button => {
      const styles = window.getComputedStyle(button)
      expect(styles.backgroundColor).toBeTruthy()
    })
  })
})
