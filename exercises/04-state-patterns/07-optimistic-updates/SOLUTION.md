# Solution: Optimistic UI Updates

## Complete Implementation

```typescript
import { useState, FormEvent } from 'react';
import './index.css';

interface Todo {
  id: number;
  text: string;
}

// Mock API with simulated delay
const createMockApi = (shouldFail: boolean) => ({
  addTodo: (todo: Todo) =>
    new Promise<Todo>((resolve, reject) => {
      setTimeout(() => {
        shouldFail ? reject(new Error('Failed to add')) : resolve(todo);
      }, 300);
    }),

  deleteTodo: (id: number) =>
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        shouldFail ? reject(new Error('Failed to delete')) : resolve();
      }, 300);
    }),
});

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shouldFail, setShouldFail] = useState(false);

  const api = createMockApi(shouldFail);

  const handleAddTodo = async () => {
    if (!input.trim()) return;

    const newTodo: Todo = { id: Date.now(), text: input };
    const previousTodos = todos;

    // Optimistic update
    setTodos([...todos, newTodo]);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      await api.addTodo(newTodo);
    } catch (err) {
      // Rollback on failure
      setTodos(previousTodos);
      setError('Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    const previousTodos = todos;

    // Optimistic update
    setTodos(todos.filter((t) => t.id !== id));
    setError(null);
    setLoading(true);

    try {
      await api.deleteTodo(id);
    } catch (err) {
      // Rollback on failure
      setTodos(previousTodos);
      setError('Failed to delete todo');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAddTodo();
  };

  return (
    <div className="container">
      <h1>Optimistic UI Updates</h1>

      <label>
        <input
          type="checkbox"
          checked={shouldFail}
          onChange={(e) => setShouldFail(e.target.checked)}
        />
        Simulate API failures
      </label>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>

      {loading && <p>Loading...</p>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Key Concepts

###  1. Optimistic Update Pattern

```typescript
// 1. Store previous state
const previousState = currentState;

// 2. Update UI immediately
setState(newState);

// 3. Make API call
try {
  await api.call();
  // Success - keep the optimistic update
} catch (err) {
  // 4. Rollback on failure
  setState(previousState);
  setError('Operation failed');
}
```

### 2. Benefits of Optimistic UI

- **Instant feedback** - No waiting for server
- **Better UX** - Feels faster and more responsive
- **Confidence** - Most operations succeed, so show success immediately

### 3. When to Use

**Good for:**
- High success rate operations (>95%)
- Non-critical actions (likes, favorites)
- Operations with clear rollback (add/delete)

**Avoid for:**
- Financial transactions
- Critical data changes
- Operations that can't be rolled back easily

## Key Takeaways

1. **Update UI first**, then sync with server
2. **Always store previous state** for rollback
3. **Handle failures gracefully** with error messages
4. **Rollback on error** to maintain consistency
5. **Loading states** still important during API calls
6. **Test failure scenarios** - they will happen!

## Further Learning

- [Optimistic UI in React Query](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)
- [Apollo Optimistic UI](https://www.apollographql.com/docs/react/performance/optimistic-ui/)
