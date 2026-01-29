import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Optimistic UI Updates', () => {
  it('adds todo optimistically', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add.*todo/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    await user.type(input, 'New Todo');
    await user.click(addButton);

    // Should appear immediately (optimistic)
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  it('deletes todo optimistically', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add a todo first
    const input = screen.getByPlaceholderText(/add.*todo/i);
    await user.type(input, 'Todo to Delete');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Delete it
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    // Should disappear immediately (optimistic)
    expect(screen.queryByText('Todo to Delete')).not.toBeInTheDocument();
  });

  it('rollsback on add failure', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Enable failures
    const failToggle = screen.getByLabelText(/simulate.*fail/i);
    await user.click(failToggle);

    const input = screen.getByPlaceholderText(/add.*todo/i);
    await user.type(input, 'Failing Todo');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Initially appears
    expect(screen.getByText('Failing Todo')).toBeInTheDocument();

    // After API "fails", should disappear
    await waitFor(() => {
      expect(screen.queryByText('Failing Todo')).not.toBeInTheDocument();
    });

    // Error message should appear
    expect(screen.getByText(/error|failed/i)).toBeInTheDocument();
  });

  it('shows error message on failure', async () => {
    const user = userEvent.setup();
    render(<App />);

    const failToggle = screen.getByLabelText(/simulate.*fail/i);
    await user.click(failToggle);

    const input = screen.getByPlaceholderText(/add.*todo/i);
    await user.type(input, 'Test');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText(/error|failed/i)).toBeInTheDocument();
    });
  });

  it('has failure simulation toggle', () => {
    render(<App />);
    expect(screen.getByLabelText(/simulate.*fail/i)).toBeInTheDocument();
  });

  it('clears input after adding todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add.*todo/i) as HTMLInputElement;
    await user.type(input, 'Test Todo');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(input.value).toBe('');
  });

  it('shows loading indicator', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add.*todo/i);
    await user.type(input, 'Test');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Should briefly show loading
    expect(screen.getByText(/loading|adding|deleting/i)).toBeInTheDocument();
  });

  it('prevents empty todos', async () => {
    const user = userEvent.setup();
    render(<App />);

    const addButton = screen.getByRole('button', { name: /add/i });
    await user.click(addButton);

    // Should not add empty todo
    const todos = screen.queryAllByRole('listitem');
    expect(todos.length).toBe(0);
  });

  it('handles multiple todos', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add.*todo/i);

    await user.type(input, 'Todo 1');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await user.type(input, 'Todo 2');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('rollsback delete on failure', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add a todo
    const input = screen.getByPlaceholderText(/add.*todo/i);
    await user.type(input, 'Test Todo');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Enable failures
    const failToggle = screen.getByLabelText(/simulate.*fail/i);
    await user.click(failToggle);

    // Try to delete
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    // Should reappear after rollback
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });
  });
});
