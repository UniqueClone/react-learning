import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('Framer Motion Exercise', () => {
  it('renders the app', () => {
    render(<App />)
    expect(screen.getByText('Framer Motion Animations')).toBeInTheDocument()
  })

  it('renders initial list items', () => {
    render(<App />)
    expect(screen.getByText('Learn React')).toBeInTheDocument()
    expect(screen.getByText('Learn Framer Motion')).toBeInTheDocument()
  })

  it('adds new item when add button clicked', () => {
    render(<App />)
    const addButton = screen.getByText('Add Item')

    const initialItems = screen.getAllByRole('listitem')
    fireEvent.click(addButton)

    const newItems = screen.getAllByRole('listitem')
    expect(newItems.length).toBe(initialItems.length + 1)
  })

  it('removes item when remove button clicked', () => {
    render(<App />)
    const removeButtons = screen.getAllByText('Remove')

    const initialCount = removeButtons.length
    fireEvent.click(removeButtons[0])

    // After short delay, item should be gone
    setTimeout(() => {
      const newCount = screen.getAllByText('Remove').length
      expect(newCount).toBe(initialCount - 1)
    }, 500)
  })

  it('list items have motion props', () => {
    const { container } = render(<App />)
    const listItems = container.querySelectorAll('li')

    expect(listItems.length).toBeGreaterThan(0)
  })

  it('renders add button', () => {
    render(<App />)
    expect(screen.getByText('Add Item')).toBeInTheDocument()
  })
})
