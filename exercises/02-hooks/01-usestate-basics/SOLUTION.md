# Solution: useState Basics - Counter

## Complete Solution

```typescript
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <div>
      <h1>Counter: {count}</h1>
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
```

## Explanation

### 1. Importing useState

```typescript
import { useState } from 'react'
```

The `useState` hook is a named export from React, so we use curly braces to import it.

### 2. Initializing State

```typescript
const [count, setCount] = useState(0)
```

This line does several things:
- Calls `useState` with the initial value `0`
- Returns an array with two elements
- Uses array destructuring to name them `count` and `setCount`
- `count` is the current state value
- `setCount` is the function to update the state

### 3. Creating Event Handlers

```typescript
const increment = () => {
  setCount(count + 1)
}
```

Event handlers are functions that:
- Read the current `count` value
- Call `setCount` with the new value
- Trigger a re-render with the updated state

### 4. Attaching Handlers to Buttons

```typescript
<button onClick={increment}>Increment</button>
```

We pass the function reference (not calling it) to `onClick`. React will call it when the button is clicked.

## Alternative Implementation: Functional Updates

For better reliability, especially with rapid clicks, use functional updates:

```typescript
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(prev => prev + 1)
  }

  const decrement = () => {
    setCount(prev => prev - 1)
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <div>
      <h1>Counter: {count}</h1>
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
```

### Why Functional Updates?

When you use `setCount(prev => prev + 1)`, React guarantees you get the latest state value. This prevents issues with:
- Multiple state updates in quick succession
- Stale closures in event handlers
- Async operations

## Inline Handler Alternative

You can also write handlers inline:

```typescript
<button onClick={() => setCount(count + 1)}>Increment</button>
<button onClick={() => setCount(count - 1)}>Decrement</button>
<button onClick={() => setCount(0)}>Reset</button>
```

This works fine for simple cases but:
- Creates a new function on every render (minor performance impact)
- Can make the JSX less readable with complex logic
- Makes testing individual handlers harder

## Key Takeaways

1. **useState returns an array**: Always use array destructuring to get the state and setter
2. **State is immutable**: Never modify state directly; always use the setter function
3. **Setter triggers re-render**: Calling the setter function causes the component to re-render
4. **Initial value is used once**: The argument to `useState` is only used on the first render
5. **Functional updates are safer**: Use `setState(prev => ...)` when the new state depends on the old state

## Common Pitfalls

1. **Calling setter immediately**:
   ```typescript
   // WRONG - calls immediately
   <button onClick={setCount(count + 1)}>

   // RIGHT - passes function reference
   <button onClick={() => setCount(count + 1)}>
   ```

2. **Mutating state directly**:
   ```typescript
   // WRONG - mutates state
   count = count + 1

   // RIGHT - uses setter
   setCount(count + 1)
   ```

3. **Expecting immediate updates**:
   ```typescript
   setCount(5)
   console.log(count) // Still old value! State updates are batched
   ```

## Further Learning

- **State as a snapshot**: Understanding why state doesn't update immediately
- **Batching**: How React batches multiple state updates for performance
- **Lazy initialization**: Passing a function to `useState` for expensive initial values
- **Multiple state variables**: When to use multiple `useState` calls vs. one with an object
