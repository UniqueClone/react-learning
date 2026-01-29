import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

describe('CSS Animations Exercise', () => {
  it('renders the app with all sections', () => {
    render(<App />)

    expect(screen.getByText('CSS Animations Demo')).toBeInTheDocument()
    expect(screen.getByText('Modal with Transitions')).toBeInTheDocument()
    expect(screen.getByText('Loading Spinner')).toBeInTheDocument()
    expect(screen.getByText('Animated Buttons')).toBeInTheDocument()
  })

  it('renders open modal button', () => {
    render(<App />)
    expect(screen.getByText('Open Modal')).toBeInTheDocument()
  })

  it('opens modal when button is clicked', () => {
    render(<App />)
    const openButton = screen.getByText('Open Modal')

    fireEvent.click(openButton)

    expect(screen.getByText(/welcome to the modal/i)).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', async () => {
    render(<App />)
    const openButton = screen.getByText('Open Modal')

    fireEvent.click(openButton)
    expect(screen.getByText(/welcome to the modal/i)).toBeInTheDocument()

    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)

    // Modal should eventually disappear
    await waitFor(() => {
      expect(screen.queryByText(/welcome to the modal/i)).not.toBeInTheDocument()
    }, { timeout: 500 })
  })

  it('renders spinner component', () => {
    const { container } = render(<App />)
    const spinner = container.querySelector('[class*="spinner"]')

    expect(spinner).toBeTruthy()
  })

  it('spinner has animation styles', () => {
    const { container } = render(<App />)
    const spinner = container.querySelector('[class*="spinner"]')

    if (spinner) {
      const styles = window.getComputedStyle(spinner)
      // Should have animation or animation-name
      expect(styles.animationName !== 'none' || styles.animation !== 'none').toBe(true)
    }
  })

  it('renders animated buttons', () => {
    render(<App />)

    expect(screen.getByText('Hover Me')).toBeInTheDocument()
    expect(screen.getByText('Secondary')).toBeInTheDocument()
    expect(screen.getByText('Danger')).toBeInTheDocument()
  })

  it('animated buttons have transition styles', () => {
    const { container } = render(<App />)
    const buttons = container.querySelectorAll('[class*="animatedButton"]')

    expect(buttons.length).toBeGreaterThan(0)

    buttons.forEach(button => {
      const styles = window.getComputedStyle(button)
      // Should have transition or transition-property
      expect(
        styles.transition !== 'none' ||
        styles.transitionProperty !== 'none'
      ).toBe(true)
    })
  })

  it('modal has backdrop', () => {
    const { container } = render(<App />)
    const openButton = screen.getByText('Open Modal')

    fireEvent.click(openButton)

    const backdrop = container.querySelector('[class*="backdrop"]')
    expect(backdrop).toBeTruthy()
  })
})
