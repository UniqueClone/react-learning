import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('useState with Arrays - Shopping Cart', () => {
  it('starts with an empty cart', () => {
    render(<App />)
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument()
    expect(screen.getByText(/cart items \(0\)/i)).toBeInTheDocument()
  })

  it('adds items to the cart', async () => {
    const user = userEvent.setup()
    render(<App />)

    const appleButton = screen.getByRole('button', { name: /add apple/i })
    await user.click(appleButton)

    expect(screen.getByText(/apple.*1\.99/i)).toBeInTheDocument()
    expect(screen.getByText(/cart items \(1\)/i)).toBeInTheDocument()
  })

  it('adds multiple different items', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add apple/i }))
    await user.click(screen.getByRole('button', { name: /add banana/i }))
    await user.click(screen.getByRole('button', { name: /add orange/i }))

    expect(screen.getByText(/apple/i)).toBeInTheDocument()
    expect(screen.getByText(/banana/i)).toBeInTheDocument()
    expect(screen.getByText(/orange/i)).toBeInTheDocument()
    expect(screen.getByText(/cart items \(3\)/i)).toBeInTheDocument()
  })

  it('removes items from the cart', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Add two items
    await user.click(screen.getByRole('button', { name: /add apple/i }))
    await user.click(screen.getByRole('button', { name: /add banana/i }))

    expect(screen.getByText(/cart items \(2\)/i)).toBeInTheDocument()

    // Remove one
    const removeButtons = screen.getAllByRole('button', { name: /remove/i })
    await user.click(removeButtons[0])

    expect(screen.getByText(/cart items \(1\)/i)).toBeInTheDocument()
  })

  it('increments item quantity', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add apple/i }))

    // Should show quantity 1 initially
    expect(screen.getByText(/apple.*1\.99.*1.*1\.99/i)).toBeInTheDocument()

    // Click increment button
    const incrementButton = screen.getByRole('button', { name: '+' })
    await user.click(incrementButton)

    // Should show quantity 2
    expect(screen.getByText(/apple.*1\.99.*2/i)).toBeInTheDocument()
  })

  it('decrements item quantity', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add apple/i }))

    // Increment to 3
    const incrementButton = screen.getByRole('button', { name: '+' })
    await user.click(incrementButton)
    await user.click(incrementButton)

    expect(screen.getByText(/apple.*1\.99.*3/i)).toBeInTheDocument()

    // Decrement to 2
    const decrementButton = screen.getByRole('button', { name: '-' })
    await user.click(decrementButton)

    expect(screen.getByText(/apple.*1\.99.*2/i)).toBeInTheDocument()
  })

  it('calculates total correctly', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Add Apple ($1.99)
    await user.click(screen.getByRole('button', { name: /add apple/i }))
    expect(screen.getByText(/total:.*\$1\.99/i)).toBeInTheDocument()

    // Add Banana ($0.99)
    await user.click(screen.getByRole('button', { name: /add banana/i }))
    expect(screen.getByText(/total:.*\$2\.98/i)).toBeInTheDocument()

    // Increment Apple quantity
    const incrementButton = screen.getAllByRole('button', { name: '+' })[0]
    await user.click(incrementButton)
    expect(screen.getByText(/total:.*\$4\.97/i)).toBeInTheDocument()
  })

  it('clears the cart', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Add items
    await user.click(screen.getByRole('button', { name: /add apple/i }))
    await user.click(screen.getByRole('button', { name: /add banana/i }))

    expect(screen.getByText(/cart items \(2\)/i)).toBeInTheDocument()

    // Clear cart
    await user.click(screen.getByRole('button', { name: /clear cart/i }))

    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument()
    expect(screen.getByText(/cart items \(0\)/i)).toBeInTheDocument()
  })

  it('maintains cart integrity with multiple operations', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Add 3 apples
    await user.click(screen.getByRole('button', { name: /add apple/i }))
    await user.click(screen.getByRole('button', { name: /add apple/i }))
    await user.click(screen.getByRole('button', { name: /add apple/i }))

    expect(screen.getByText(/cart items \(3\)/i)).toBeInTheDocument()

    // Remove middle one
    const removeButtons = screen.getAllByRole('button', { name: /remove/i })
    await user.click(removeButtons[1])

    expect(screen.getByText(/cart items \(2\)/i)).toBeInTheDocument()

    // Should still have 2 apples
    const appleElements = screen.getAllByText(/apple/i)
    expect(appleElements).toHaveLength(2)
  })
})
