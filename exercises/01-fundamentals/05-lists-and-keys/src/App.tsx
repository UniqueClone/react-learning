// This code has 4 bugs related to lists and keys
// Find and fix all the bugs!

import { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Master hooks', completed: false },
  ])

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: 'New todo',
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Rendering Lists with Keys</h1>
      <button onClick={addTodo}>Add Todo</button>

      <h2>My Todos</h2>
      <ul>
        {/* BUG 1: Using index as key - will cause issues when reordering */}
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Completed Todos</h2>
      <ul>
        {/* BUG 2: No key at all - React will warn */}
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <li>
              {todo.text}
            </li>
          ))}
      </ul>

      <h2>Active Todos</h2>
      <ul>
        {/* BUG 3: Using non-unique key (text might be duplicated) */}
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <li key={todo.text}>
              {todo.text}
            </li>
          ))}
      </ul>

      <h2>All Todo Titles</h2>
      <div>
        {/* BUG 4: Fragment without key in list */}
        {todos.map((todo, idx) => (
          <>
            <span>{todo.text}</span>
            {idx < todos.length - 1 && <span> | </span>}
          </>
        ))}
      </div>
    </div>
  )
}
