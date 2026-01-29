# Solution: Rendering Lists with Keys

## The Bugs

### Bug 1: Using Index as Key (Line 48)
```typescript
// ❌ WRONG
{todos.map((todo, index) => (
  <li key={index}>
```

**Problem:** When todos are reordered or deleted, indices change but keys should remain stable.

### Bug 2: Missing Key (Line 68)
```typescript
// ❌ WRONG
{todos.filter((todo) => todo.completed).map((todo) => (
  <li>  {/* No key! */}
```

**Problem:** React can't efficiently track which items changed without keys.

### Bug 3: Non-Unique Key (Line 81)
```typescript
// ❌ WRONG
<li key={todo.text}>
```

**Problem:** If two todos have the same text, keys won't be unique.

### Bug 4: Fragment Without Key (Line 91)
```typescript
// ❌ WRONG
{todos.map((todo, idx) => (
  <>  {/* Fragment needs key in list */}
```

**Problem:** Fragments in a list need keys just like regular elements.

## The Fixes

Here's the corrected code:

```typescript
import { useState, Fragment } from 'react'

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
        {/* ✅ FIX 1: Use unique ID as key */}
        {todos.map((todo) => (
          <li key={todo.id}>
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
        {/* ✅ FIX 2: Add key prop */}
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <li key={todo.id}>
              {todo.text}
            </li>
          ))}
      </ul>

      <h2>Active Todos</h2>
      <ul>
        {/* ✅ FIX 3: Use unique ID instead of text */}
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <li key={todo.id}>
              {todo.text}
            </li>
          ))}
      </ul>

      <h2>All Todo Titles</h2>
      <div>
        {/* ✅ FIX 4: Use Fragment with key */}
        {todos.map((todo, idx) => (
          <Fragment key={todo.id}>
            <span>{todo.text}</span>
            {idx < todos.length - 1 && <span> | </span>}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
```

## Key Concepts

### Why Keys Matter

1. **Performance**: Keys help React identify which items have changed, been added, or removed
2. **State Preservation**: Keys ensure component state is correctly maintained
3. **Reconciliation**: React uses keys to match elements between renders

### When to Use What

**✅ Use Unique IDs:**
- When items have a unique identifier
- When items can be reordered
- When items can be added/removed from anywhere in the list

```typescript
items.map(item => <div key={item.id}>{item.name}</div>)
```

**⚠️ Use Index Only When:**
- List never reorders
- List never filters
- List is static/unchanging
- Items don't have unique IDs

```typescript
// Only if list never changes
staticList.map((item, index) => <div key={index}>{item}</div>)
```

**❌ Never Use:**
- `Math.random()` - generates new keys every render
- Duplicated values - not guaranteed unique
- Unstable values - values that change between renders

### Fragment Keys

When mapping with fragments, use the full syntax:

```typescript
import { Fragment } from 'react'

{items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </Fragment>
))}
```

## Common Mistakes

### ❌ Random Keys
```typescript
<div key={Math.random()}> {/* New key every render! */}
```

### ❌ Combination of Index and Value
```typescript
<div key={`${index}-${item.id}`}> {/* Overcomplicated */}
```

### ❌ Using Non-Unique Data
```typescript
<div key={user.name}> {/* Names might duplicate */}
```

## Key Takeaways

1. **Always use keys** when rendering lists with `.map()`
2. **Keys should be unique** among siblings
3. **Keys should be stable** across re-renders
4. **Prefer IDs over indices** when items can change
5. **Fragments need keys** when used in lists
6. **Console warnings** often indicate key problems

## Further Learning

- React docs on [Lists and Keys](https://react.dev/learn/rendering-lists)
- Understanding [React Reconciliation](https://react.dev/learn/preserving-and-resetting-state)
- When [Index as Key is Acceptable](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/)
