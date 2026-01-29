import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('Lists and Keys Exercise', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('Rendering Lists with Keys')).toBeInTheDocument()
  })

  it('renders initial todos', () => {
    render(<App />)
    expect(screen.getByText('Learn React')).toBeInTheDocument()
    expect(screen.getByText('Build a project')).toBeInTheDocument()
    expect(screen.getByText('Master hooks')).toBeInTheDocument()
  })

  it('can add a new todo', () => {
    render(<App />)
    const addButton = screen.getByText('Add Todo')
    fireEvent.click(addButton)
    const todos = screen.getAllByText('New todo')
    expect(todos.length).toBeGreaterThan(0)
  })

  it('can toggle todo completion', () => {
    render(<App />)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    // Should move to completed section
    expect(screen.getByText('Learn React')).toBeInTheDocument()
  })

  it('can delete a todo', () => {
    render(<App />)
    const deleteButtons = screen.getAllByText('Delete')
    const initialCount = deleteButtons.length
    fireEvent.click(deleteButtons[0])
    const remainingButtons = screen.getAllByText('Delete')
    expect(remainingButtons.length).toBe(initialCount - 1)
  })
})
