# Solution: Custom Hooks - Basic

## Complete Solution

```typescript
import { useState, useEffect } from 'react'

// Custom hook for toggle functionality
function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = () => {
    setValue(prev => !prev)
  }

  return [value, toggle]
}

// Custom hook for localStorage synchronization
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Lazy initialization - only runs once on mount
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default function App() {
  const [isDarkMode, toggleDarkMode] = useToggle(false)
  const [showDetails, toggleDetails] = useToggle(false)
  const [username, setUsername] = useLocalStorage('username', '')
  const [count, setCount] = useLocalStorage('count', 0)

  return (
    <div>
      <h1>Custom Hooks Demo</h1>

      <section>
        <h2>useToggle Example</h2>
        <p>Dark Mode: {isDarkMode ? 'On' : 'Off'}</p>
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
        <button onClick={toggleDetails}>Toggle Details</button>
        {showDetails && (
          <div>
            <p>These are the hidden details!</p>
          </div>
        )}
      </section>

      <section>
        <h2>useLocalStorage Example</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUsername('')}>Clear Username</button>
        </div>
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      </section>
    </div>
  )
}
```

## Explanation

### 1. Custom Hook Pattern

```typescript
function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = () => {
    setValue(prev => !prev)
  }

  return [value, toggle]
}
```

Key points:
- **Naming**: Must start with "use" prefix for React to recognize it as a hook
- **Uses other hooks**: Custom hooks can call useState, useEffect, and other hooks
- **Returns array**: Similar to useState, returns value and setter function
- **TypeScript return type**: Explicitly define return type for better IDE support
- **Functional update**: Use `prev => !prev` to ensure we get the latest state

### 2. useLocalStorage Hook Structure

```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Implementation
}
```

Generic type `<T>` allows this hook to work with any type:
- `useLocalStorage<string>('name', '')` for strings
- `useLocalStorage<number>('count', 0)` for numbers
- `useLocalStorage<User>('user', defaultUser)` for objects

### 3. Lazy Initialization

```typescript
const [storedValue, setStoredValue] = useState<T>(() => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return initialValue
  }
})
```

Why lazy initialization?
- Passing a function to `useState` means it only runs **once** on mount
- Without it, `localStorage.getItem()` would run on **every render**
- Performance optimization for expensive operations

### 4. Syncing to localStorage

```typescript
useEffect(() => {
  try {
    window.localStorage.setItem(key, JSON.stringify(storedValue))
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error)
  }
}, [key, storedValue])
```

Why useEffect?
- Side effect: Writing to localStorage is a side effect
- Runs after render: Doesn't block UI updates
- Dependency array: Re-runs when `key` or `storedValue` changes

### 5. Error Handling

Both localStorage operations are wrapped in try-catch because:
- **Quota exceeded**: User's storage is full
- **Private browsing**: Some browsers block localStorage
- **Serialization errors**: Some values can't be JSON.stringify'd (e.g., circular references)

### 6. JSON Serialization

```typescript
JSON.stringify(storedValue)  // Convert value to string for storage
JSON.parse(item)             // Convert string back to original type
```

localStorage only stores strings, so we must serialize:
- Numbers: `42` → `"42"`
- Objects: `{name: "John"}` → `'{"name":"John"}'`
- Arrays: `[1,2,3]` → `"[1,2,3]"`

## Alternative Implementations

### useToggle with Optional Value

```typescript
function useToggle(initialValue = false): [boolean, (value?: boolean) => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = (newValue?: boolean) => {
    setValue(prev => newValue !== undefined ? newValue : !prev)
  }

  return [value, toggle]
}

// Usage:
const [isOpen, toggleOpen] = useToggle(false)
toggleOpen()      // Toggle
toggleOpen(true)  // Set to true
toggleOpen(false) // Set to false
```

### useLocalStorage with Removal

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  // ... same as before ...

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setStoredValue, removeValue] as const
}
```

### useLocalStorage with Storage Event

Listen for changes from other tabs/windows:

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // ... same initialization ...
  })

  useEffect(() => {
    // ... same localStorage.setItem ...
  }, [key, storedValue])

  // Listen for changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error('Error parsing storage event:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setStoredValue]
}
```

## Key Takeaways

1. **Custom hooks extract reusable logic**: DRY principle for React patterns
2. **Must start with "use"**: React's rules require this naming convention
3. **Can use other hooks**: Custom hooks compose built-in hooks
4. **Return values flexibly**: Array (like useState) or object (named properties)
5. **TypeScript generics**: Make hooks work with any type safely
6. **Lazy initialization**: Optimize expensive initial state calculations
7. **Error handling**: Always handle potential failures gracefully
8. **Side effects in useEffect**: Keep side effects out of render phase

## Common Pitfalls

1. **Forgetting lazy initialization**:
   ```typescript
   // BAD - runs on every render
   const [value, setValue] = useState(localStorage.getItem(key))

   // GOOD - runs once
   const [value, setValue] = useState(() => localStorage.getItem(key))
   ```

2. **Not handling JSON errors**:
   ```typescript
   // BAD - crashes if invalid JSON
   const item = JSON.parse(localStorage.getItem(key))

   // GOOD - handles errors
   try {
     const item = JSON.parse(localStorage.getItem(key))
   } catch {
     return initialValue
   }
   ```

3. **Missing return type**:
   ```typescript
   // BAD - TypeScript infers mutable array
   return [value, toggle]

   // GOOD - tuple type
   return [value, toggle] as const
   ```

4. **Not using functional updates**:
   ```typescript
   // BAD - stale closure issue
   const toggle = () => setValue(!value)

   // GOOD - always uses latest value
   const toggle = () => setValue(prev => !prev)
   ```

## Testing Custom Hooks

You can test custom hooks in isolation using `@testing-library/react-hooks`:

```typescript
import { renderHook, act } from '@testing-library/react'
import { useToggle } from './useToggle'

test('useToggle toggles value', () => {
  const { result } = renderHook(() => useToggle(false))

  expect(result.current[0]).toBe(false)

  act(() => {
    result.current[1]() // Call toggle
  })

  expect(result.current[0]).toBe(true)
})
```

## Further Learning

- **Rules of Hooks**: Only call hooks at the top level, only call from React functions
- **Custom hook patterns**: Composition, dependency injection, configuration
- **Performance optimization**: useMemo, useCallback in custom hooks
- **Advanced patterns**: useDebounce, useAsync, usePrevious, useInterval
