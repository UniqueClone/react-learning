# Solution: useEffect Basics - Document Title & Page View Tracker

## Complete Solution

```typescript
import { useState, useEffect } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const [seconds, setSeconds] = useState(0)

  // Effect 1: Update document title when count changes
  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])

  // Effect 2: Start timer on mount, cleanup on unmount
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    // Cleanup function
    return () => {
      clearInterval(timer)
    }
  }, []) // Empty array = run once on mount

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  return (
    <div>
      <h1>useEffect Basics</h1>

      <div>
        <h2>Counter: {count}</h2>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <p>The document title should update to show the count</p>
      </div>

      <div>
        <h2>Page View Timer</h2>
        <p>You've been on this page for: {seconds} seconds</p>
      </div>
    </div>
  )
}
```

## Explanation

### 1. Importing useEffect

```typescript
import { useState, useEffect } from 'react'
```

Import both hooks from React.

### 2. Effect for Document Title

```typescript
useEffect(() => {
  document.title = `Count: ${count}`
}, [count])
```

**How it works:**
- Effect runs after the component renders
- Updates the browser tab title
- Dependency array `[count]` means: re-run when `count` changes
- No cleanup needed (setting title has no side effects to clean)

### 3. Effect for Timer

```typescript
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)

  return () => {
    clearInterval(timer)
  }
}, [])
```

**How it works:**
- Empty dependency array `[]` means: run once on mount
- `setInterval` starts a timer that fires every 1000ms
- Uses functional update `s => s + 1` to avoid stale closure
- Returns cleanup function that clears the interval
- Cleanup runs when component unmounts

### 4. Why Cleanup is Important

Without cleanup:
```typescript
// BAD - memory leak!
useEffect(() => {
  setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)
  // No cleanup - timer keeps running after unmount!
}, [])
```

With cleanup:
```typescript
// GOOD - no memory leak
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)

  return () => clearInterval(timer)
}, [])
```

## Understanding Dependency Arrays

### No Dependency Array
```typescript
useEffect(() => {
  console.log('Runs after EVERY render')
})
```
Runs after every render. Usually not what you want!

### Empty Dependency Array
```typescript
useEffect(() => {
  console.log('Runs ONCE on mount')
}, [])
```
Runs once when component mounts. Perfect for initialization.

### With Dependencies
```typescript
useEffect(() => {
  console.log('Runs when count changes')
}, [count])
```
Runs on mount and whenever dependencies change.

## Effect Lifecycle

```
Component Mount
  → Effect runs
  → Cleanup from previous effect (if any)
  → Effect code runs

Component Update (if dependencies changed)
  → Effect runs again
  → Cleanup from previous effect
  → Effect code runs again

Component Unmount
  → Cleanup runs
```

## Common Patterns

### 1. Event Listeners
```typescript
useEffect(() => {
  const handleClick = () => console.log('clicked')
  window.addEventListener('click', handleClick)

  return () => {
    window.removeEventListener('click', handleClick)
  }
}, [])
```

### 2. Timers
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Delayed action')
  }, 1000)

  return () => clearTimeout(timer)
}, [])
```

### 3. Subscriptions
```typescript
useEffect(() => {
  const subscription = api.subscribe(data => {
    setData(data)
  })

  return () => subscription.unsubscribe()
}, [])
```

### 4. Conditional Effects
```typescript
useEffect(() => {
  if (isActive) {
    // Do something only when active
  }
}, [isActive])
```

## Common Mistakes

### 1. Missing Dependencies
```typescript
// WRONG - missing count dependency
useEffect(() => {
  document.title = `Count: ${count}`
}, [])  // Effect won't update when count changes!

// RIGHT
useEffect(() => {
  document.title = `Count: ${count}`
}, [count])
```

### 2. Forgetting Cleanup
```typescript
// WRONG - memory leak
useEffect(() => {
  setInterval(() => console.log('tick'), 1000)
}, [])

// RIGHT
useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000)
  return () => clearInterval(timer)
}, [])
```

### 3. Infinite Loops
```typescript
// WRONG - infinite loop!
useEffect(() => {
  setCount(count + 1)  // Updates count
}, [count])  // Triggers effect again because count changed!

// If you need this pattern, remove count from dependencies
useEffect(() => {
  setCount(c => c + 1)  // Use functional update
}, [])
```

### 4. Setting State in Render
```typescript
// WRONG - infinite loop!
function Component() {
  const [count, setCount] = useState(0)
  setCount(count + 1)  // Called during render!
  return <div>{count}</div>
}

// RIGHT - use useEffect
function Component() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(count + 1)
  }, [])  // Only runs once

  return <div>{count}</div>
}
```

## Key Takeaways

1. **useEffect runs after render**: Effects don't block rendering
2. **Dependency array controls when effects run**: Empty = once, with deps = when deps change
3. **Always cleanup side effects**: Prevent memory leaks with cleanup functions
4. **Functional updates prevent stale closures**: Use `setState(prev => ...)` in effects
5. **Effects are synchronization**: Use them to sync with external systems

## When to Use useEffect

### DO use useEffect for:
- Fetching data
- Setting up subscriptions
- Manually changing the DOM
- Setting up timers
- Logging/analytics
- Syncing with external systems

### DON'T use useEffect for:
- Transforming data for rendering (do in render)
- Handling user events (use event handlers)
- Resetting state based on props (use key prop instead)
- Simple calculations (do during render)

## Further Learning

- **useEffect vs useLayoutEffect**: When you need synchronous effects
- **Effect dependencies**: How React determines when to re-run
- **Custom hooks**: Extract effect logic into reusable hooks
- **React 18 Strict Mode**: Why effects run twice in development
