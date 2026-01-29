import { useState } from 'react'

// BUG: This component re-renders every time the parent re-renders,
// even when its props haven't changed
function TodoItem({
  todo,
  onToggle
}: {
  todo: { id: number; text: string; completed: boolean }
  onToggle: (id: number) => void
}) {
  console.log(`TodoItem ${todo.id} rendered`)

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
    </div>
  )
}

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Learn React.memo', completed: false },
    { id: 3, text: 'Optimize performance', completed: false },
    { id: 4, text: 'Build awesome apps', completed: false },
  ])

  const [newTodo, setNewTodo] = useState('')

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }])
      setNewTodo('')
    }
  }

  return (
    <div className="container">
      <h1>React.memo Basics</h1>
      <p>Open the console and toggle todos. Notice ALL items re-render!</p>

      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
          />
        ))}
      </div>
    </div>
  )
}
