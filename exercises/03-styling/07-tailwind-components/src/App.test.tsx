import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Tailwind Components Exercise', () => {
  it('renders the app with sections', () => {
    render(<App />)
    expect(screen.getByText('Tailwind Button Component')).toBeInTheDocument()
    expect(screen.getByText('Sizes')).toBeInTheDocument()
    expect(screen.getByText('Colors (Solid)')).toBeInTheDocument()
    expect(screen.getByText('Colors (Outline)')).toBeInTheDocument()
  })

  it('renders size variants', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /^small$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^medium$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^large$/i })).toBeInTheDocument()
  })

  it('renders color variants (solid)', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button')

    // Should have Primary, Secondary, and Danger solid buttons
    const primaryButton = buttons.find(btn => btn.textContent === 'Primary' && !btn.className.includes('border-2'))
    const secondaryButton = buttons.find(btn => btn.textContent === 'Secondary' && !btn.className.includes('border-2'))
    const dangerButton = buttons.find(btn => btn.textContent === 'Danger' && !btn.className.includes('border-2'))

    expect(primaryButton).toBeTruthy()
    expect(secondaryButton).toBeTruthy()
    expect(dangerButton).toBeTruthy()
  })

  it('renders outline variants', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button')

    // Outline buttons should have border-2 class
    const outlineButtons = buttons.filter(btn =>
      btn.className.includes('border-2') || btn.className.includes('border')
    )

    expect(outlineButtons.length).toBeGreaterThanOrEqual(3)
  })

  it('applies different Tailwind classes for size variants', () => {
    render(<App />)
    const smallBtn = screen.getByRole('button', { name: /^small$/i })
    const mediumBtn = screen.getByRole('button', { name: /^medium$/i })
    const largeBtn = screen.getByRole('button', { name: /^large$/i })

    // Small should have smaller padding classes
    expect(smallBtn.className).toMatch(/px-3|py-1/)

    // Medium should have medium padding
    expect(mediumBtn.className).toMatch(/px-4|py-2/)

    // Large should have larger padding
    expect(largeBtn.className).toMatch(/px-6|py-3/)
  })

  it('applies different colors using Tailwind utilities', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button')

    // Find primary button (should have blue classes)
    const primaryBtn = buttons.find(btn =>
      btn.textContent === 'Primary' &&
      (btn.className.includes('bg-blue') || btn.className.includes('border-blue'))
    )
    expect(primaryBtn).toBeTruthy()

    // Find secondary button (should have gray classes)
    const secondaryBtn = buttons.find(btn =>
      btn.textContent === 'Secondary' &&
      (btn.className.includes('bg-gray') || btn.className.includes('border-gray'))
    )
    expect(secondaryBtn).toBeTruthy()

    // Find danger button (should have red classes)
    const dangerBtn = buttons.find(btn =>
      btn.textContent === 'Danger' &&
      (btn.className.includes('bg-red') || btn.className.includes('border-red'))
    )
    expect(dangerBtn).toBeTruthy()
  })

  it('combines variant classes correctly using clsx', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button')

    // All buttons should have base classes
    buttons.forEach(button => {
      // Check for common base classes
      const hasBaseClasses =
        button.className.includes('rounded') &&
        button.className.includes('font-medium')
      expect(hasBaseClasses).toBe(true)
    })
  })

  it('includes focus ring classes for accessibility', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button')

    // At least one button should have focus ring classes
    const hasFocusRing = buttons.some(btn =>
      btn.className.includes('focus:ring') || btn.className.includes('focus:outline')
    )
    expect(hasFocusRing).toBe(true)
  })

  it('renders combination variants', () => {
    render(<App />)

    // Should render complex combinations
    expect(screen.getByText(/small primary outline/i)).toBeInTheDocument()
    expect(screen.getByText(/large danger solid/i)).toBeInTheDocument()
  })
})
