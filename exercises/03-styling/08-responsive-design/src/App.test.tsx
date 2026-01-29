import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Responsive Design Exercise', () => {
  it('renders the layout with all major sections', () => {
    render(<App />)

    // Check for main elements
    expect(screen.getByText('ResponsiveShop')).toBeInTheDocument()
    expect(screen.getByText('Featured Products')).toBeInTheDocument()
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<App />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders sidebar with categories', () => {
    render(<App />)

    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Clothing')).toBeInTheDocument()
    expect(screen.getByText('Home & Garden')).toBeInTheDocument()
  })

  it('renders all product cards', () => {
    render(<App />)

    // Should render 6 products
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 6')).toBeInTheDocument()

    // Check for prices
    expect(screen.getByText('$29')).toBeInTheDocument()
    expect(screen.getByText('$79')).toBeInTheDocument()

    // Check for buttons
    const addButtons = screen.getAllByText('Add to Cart')
    expect(addButtons).toHaveLength(6)
  })

  it('uses CSS Grid for layout', () => {
    const { container } = render(<App />)
    const layout = container.querySelector('[class*="layout"]')

    expect(layout).toBeTruthy()

    if (layout) {
      const styles = window.getComputedStyle(layout)
      expect(styles.display).toBe('grid')
    }
  })

  it('uses Flexbox for cards container', () => {
    const { container } = render(<App />)
    const cards = container.querySelector('[class*="cards"]')

    expect(cards).toBeTruthy()

    if (cards) {
      const styles = window.getComputedStyle(cards)
      expect(styles.display).toBe('flex')
    }
  })

  it('renders images with alt text', () => {
    render(<App />)

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(6)

    images.forEach((img, index) => {
      expect(img).toHaveAttribute('alt', `Product ${index + 1}`)
      expect(img).toHaveAttribute('src')
    })
  })

  it('makes images responsive', () => {
    const { container } = render(<App />)
    const images = container.querySelectorAll('[class*="cardImage"]')

    images.forEach(img => {
      const styles = window.getComputedStyle(img)
      // Image should have max-width or width of 100%
      const maxWidth = styles.maxWidth
      const width = styles.width
      const hasResponsiveWidth = maxWidth === '100%' || width === '100%'
      expect(hasResponsiveWidth).toBe(true)
    })
  })

  it('applies grid areas to sections', () => {
    const { container } = render(<App />)

    const header = container.querySelector('header')
    const sidebar = container.querySelector('aside')
    const main = container.querySelector('main')
    const footer = container.querySelector('footer')

    if (header) {
      const styles = window.getComputedStyle(header)
      expect(styles.gridArea).toContain('header')
    }

    if (sidebar) {
      const styles = window.getComputedStyle(sidebar)
      expect(styles.gridArea).toContain('sidebar')
    }

    if (main) {
      const styles = window.getComputedStyle(main)
      expect(styles.gridArea).toContain('main')
    }

    if (footer) {
      const styles = window.getComputedStyle(footer)
      expect(styles.gridArea).toContain('footer')
    }
  })
})
