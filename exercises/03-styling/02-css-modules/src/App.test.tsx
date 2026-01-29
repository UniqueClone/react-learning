import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'
import { Button } from './Button'

describe('CSS Modules Exercise', () => {
  it('renders all button variants', () => {
    render(<App />)
    expect(screen.getByText('Primary Button')).toBeInTheDocument()
    expect(screen.getByText('Secondary Button')).toBeInTheDocument()
    expect(screen.getByText('Danger Button')).toBeInTheDocument()
  })

  it('applies CSS Module classes to buttons', () => {
    render(<App />)
    const primaryBtn = screen.getByText('Primary Button')
    const secondaryBtn = screen.getByText('Secondary Button')
    const dangerBtn = screen.getByText('Danger Button')

    // CSS Modules should generate unique class names
    expect(primaryBtn.className).toMatch(/_primary_/)
    expect(secondaryBtn.className).toMatch(/_secondary_/)
    expect(dangerBtn.className).toMatch(/_danger_/)
  })

  it('applies base styles through composition', () => {
    render(<App />)
    const primaryBtn = screen.getByText('Primary Button')

    // Should have both base and variant classes (from composes)
    expect(primaryBtn.className.split(' ').length).toBeGreaterThan(1)
  })

  it('Button component accepts and applies variant prop', () => {
    render(<Button variant="primary">Test</Button>)
    const button = screen.getByText('Test')
    expect(button.className).toContain('primary')
  })

  it('ensures styles are scoped with unique identifiers', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button')

    // Each button should have a unique scoped class name
    buttons.forEach(button => {
      expect(button.className).toMatch(/_[a-zA-Z0-9]+/) // Hash pattern
    })
  })
})
