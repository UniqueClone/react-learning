import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('useReducer Advanced - Shopping Cart', () => {
  it('starts with empty cart', () => {
    render(<App />)
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument()
  })

  it('adds item to cart', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add widget/i }))

    expect(screen.getByText(/widget/i)).toBeInTheDocument()
    expect(screen.getByText(/\$9\.99 x 1/i)).toBeInTheDocument()
  })

  it('increments quantity when same item added twice', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add widget/i }))
    await user.click(screen.getByRole('button', { name: /add widget/i }))

    expect(screen.getByText(/\$9\.99 x 2/i)).toBeInTheDocument()
  })

  it('adds multiple different items', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add widget/i }))
    await user.click(screen.getByRole('button', { name: /add gadget/i }))

    expect(screen.getByText(/widget/i)).toBeInTheDocument()
    expect(screen.getByText(/gadget/i)).toBeInTheDocument()
  })

  it('calculates total correctly', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add widget/i }))
    await user.click(screen.getByRole('button', { name: /add widget/i }))

    // 2 widgets at $9.99 each = $19.98
    expect(screen.getByText(/total: \$19\.98/i)).toBeInTheDocument()
  })

  it('increases quantity with + button', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add gadget/i }))

    const plusButton = screen.getAllByRole('button', { name: '+' })[0]
    await user.click(plusButton)

    expect(screen.getByText(/\$19\.99 x 2/i)).toBeInTheDocument()
  })

  it('decreases quantity with - button', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add gadget/i }))
    await user.click(screen.getByRole('button', { name: /add gadget/i }))

    const minusButton = screen.getAllByRole('button', { name: '-' })[0]
    await user.click(minusButton)

    expect(screen.getByText(/\$19\.99 x 1/i)).toBeInTheDocument()
  })

  it('removes item when quantity reaches 0', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add widget/i }))

    const minusButton = screen.getAllByRole('button', { name: '-' })[0]
    await user.click(minusButton)

    expect(screen.queryByText(/widget/i)).not.toBeInTheDocument()
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument()
  })

  it('removes item with remove button', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add widget/i }))
    await user.click(screen.getByRole('button', { name: /add widget/i }))

    const removeButton = screen.getByRole('button', { name: /^remove$/i })
    await user.click(removeButton)

    expect(screen.queryByText(/widget/i)).not.toBeInTheDocument()
  })

  it('clears entire cart', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add widget/i }))
    await user.click(screen.getByRole('button', { name: /add gadget/i }))

    const clearButton = screen.getByRole('button', { name: /clear cart/i })
    await user.click(clearButton)

    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument()
    expect(screen.queryByText(/widget/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/gadget/i)).not.toBeInTheDocument()
  })

  it('calculates total with multiple items', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add widget/i }))
    await user.click(screen.getByRole('button', { name: /add widget/i }))
    await user.click(screen.getByRole('button', { name: /add gadget/i }))

    // 2 widgets at $9.99 + 1 gadget at $19.99 = $39.97
    expect(screen.getByText(/total: \$39\.97/i)).toBeInTheDocument()
  })
})
