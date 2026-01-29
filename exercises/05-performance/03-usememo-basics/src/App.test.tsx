import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('useMemo Basics', () => {
  it('renders the heading', () => {
    render(<App />)
    expect(screen.getByText(/usememo basics/i)).toBeInTheDocument()
  })

  it('displays all products initially', () => {
    render(<App />)
    expect(screen.getByText(/laptop/i)).toBeInTheDocument()
    expect(screen.getByText(/phone/i)).toBeInTheDocument()
    expect(screen.getByText(/desk/i)).toBeInTheDocument()
  })

  it('filters products by search term', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText(/search products/i)
    await user.type(input, 'phone')

    expect(screen.getByText(/phone/i)).toBeInTheDocument()
    expect(screen.queryByText(/laptop/i)).not.toBeInTheDocument()
  })

  it('filters products by category', async () => {
    const user = userEvent.setup()
    render(<App />)

    const select = screen.getByDisplayValue(/all categories/i)
    await user.selectOptions(select, 'furniture')

    expect(screen.getByText(/desk/i)).toBeInTheDocument()
    expect(screen.getByText(/chair/i)).toBeInTheDocument()
    expect(screen.queryByText(/laptop/i)).not.toBeInTheDocument()
  })

  it('sorts products by price', async () => {
    const user = userEvent.setup()
    render(<App />)

    const cards = screen.getAllByRole('heading', { level: 3 })
    const firstProduct = cards[0].textContent

    const sortSelect = screen.getByDisplayValue(/price: low to high/i)
    await user.selectOptions(sortSelect, 'desc')

    const newCards = screen.getAllByRole('heading', { level: 3 })
    const newFirstProduct = newCards[0].textContent

    // After sorting desc, first product should be different (highest price)
    expect(newFirstProduct).not.toBe(firstProduct)
  })

  it('does not recalculate when unrelated state changes', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    const user = userEvent.setup()

    render(<App />)

    // Clear initial logs
    consoleSpy.mockClear()

    // Toggle theme (unrelated to products)
    const themeButton = screen.getByText(/toggle theme/i)
    await user.click(themeButton)

    // With useMemo, filtering and sorting should NOT run
    const filterLogs = consoleSpy.mock.calls.filter(call =>
      call[0]?.includes('Filtering')
    )
    const sortLogs = consoleSpy.mock.calls.filter(call =>
      call[0]?.includes('Sorting')
    )

    expect(filterLogs.length).toBe(0)
    expect(sortLogs.length).toBe(0)
  })

  it('shows no results message when no products match', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText(/search products/i)
    await user.type(input, 'nonexistent')

    expect(screen.getByText(/no products found/i)).toBeInTheDocument()
  })
})
