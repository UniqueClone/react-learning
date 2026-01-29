# Solution: useEffect Data Fetching - User Profile Loader

## Complete Solution

```typescript
import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
  company: {
    name: string
  }
}

const fetchUser = async (id: number): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500))

  if (id === 999) {
    throw new Error('User not found')
  }

  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
    company: {
      name: `Company ${id}`
    }
  }
}

export default function App() {
  const [userId, setUserId] = useState(1)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false

    const loadUser = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchUser(userId)

        if (!isCancelled) {
          setUser(data)
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'An error occurred')
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    loadUser()

    return () => {
      isCancelled = true
    }
  }, [userId])

  const handleUserSelect = (id: number) => {
    setUserId(id)
  }

  return (
    <div>
      <h1>User Profile Loader</h1>

      <div>
        <button onClick={() => handleUserSelect(1)}>Load User 1</button>
        <button onClick={() => handleUserSelect(2)}>Load User 2</button>
        <button onClick={() => handleUserSelect(3)}>Load User 3</button>
        <button onClick={() => handleUserSelect(999)}>Load Invalid User</button>
      </div>

      {loading && <p>Loading...</p>}

      {error && (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && user && (
        <div>
          <h2>User Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
        </div>
      )}
    </div>
  )
}
```

## Explanation

### 1. State Management for Data Fetching

```typescript
const [userId, setUserId] = useState(1)
const [user, setUser] = useState<User | null>(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
```

Three essential states for data fetching:
- **Data state** (`user`): Holds the fetched data
- **Loading state** (`loading`): Tracks if request is in progress
- **Error state** (`error`): Stores error messages

### 2. The Effect with Cleanup

```typescript
useEffect(() => {
  let isCancelled = false

  const loadUser = async () => {
    // ... fetch logic ...
    if (!isCancelled) {
      setUser(data)
    }
  }

  loadUser()

  return () => {
    isCancelled = true
  }
}, [userId])
```

**Key concepts:**
- `isCancelled` flag prevents state updates after unmount
- Async function inside effect (can't make effect itself async)
- Cleanup function sets flag to true
- Dependency array includes `userId` to refetch when it changes

### 3. Error Handling Pattern

```typescript
try {
  const data = await fetchUser(userId)
  if (!isCancelled) {
    setUser(data)
  }
} catch (err) {
  if (!isCancelled) {
    setError(err instanceof Error ? err.message : 'An error occurred')
  }
} finally {
  if (!isCancelled) {
    setLoading(false)
  }
}
```

**Best practices:**
- Try/catch wraps async operation
- Check `isCancelled` before every state update
- Finally block ensures loading state is cleared
- Type-safe error handling

### 4. Resetting States

```typescript
setLoading(true)
setError(null)  // Clear previous error
```

Always clear error when starting new fetch to avoid showing stale errors.

### 5. Conditional Rendering

```typescript
{loading && <p>Loading...</p>}
{error && <div>Error: {error}</div>}
{!loading && !error && user && <div>User data</div>}
```

Show appropriate UI based on current state combination.

## Alternative: Using AbortController

```typescript
useEffect(() => {
  const controller = new AbortController()

  const loadUser = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/users/${userId}`, {
        signal: controller.signal
      })
      const data = await response.json()
      setUser(data)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  loadUser()

  return () => {
    controller.abort()
  }
}, [userId])
```

`AbortController` cancels the actual fetch request, not just state updates.

## Common Data Fetching Patterns

### Pattern 1: Initial Load Only
```typescript
useEffect(() => {
  fetchData()
}, [])  // Empty array = once on mount
```

### Pattern 2: Refetch on Dependency Change
```typescript
useEffect(() => {
  fetchData(userId)
}, [userId])  // Refetch when userId changes
```

### Pattern 3: Polling (Repeated Fetching)
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    fetchData()
  }, 5000)

  return () => clearInterval(interval)
}, [])
```

### Pattern 4: Conditional Fetching
```typescript
useEffect(() => {
  if (shouldFetch) {
    fetchData()
  }
}, [shouldFetch, otherDep])
```

## Why Cleanup Matters

Without cleanup:
```typescript
// BAD - causes "Can't perform a React state update on an unmounted component" warning
useEffect(() => {
  const loadUser = async () => {
    const data = await fetchUser(userId)
    setUser(data)  // May run after unmount!
  }
  loadUser()
}, [userId])
```

With cleanup:
```typescript
// GOOD - prevents state updates after unmount
useEffect(() => {
  let isCancelled = false

  const loadUser = async () => {
    const data = await fetchUser(userId)
    if (!isCancelled) {
      setUser(data)  // Only if still mounted
    }
  }

  loadUser()

  return () => {
    isCancelled = true
  }
}, [userId])
```

## Race Condition Example

Without cleanup, race conditions can occur:

```
User clicks "Load User 2" → Request 2 starts
User clicks "Load User 3" → Request 3 starts
Request 3 completes → Shows User 3 ✓
Request 2 completes → Shows User 2 ✗ (Wrong!)
```

With cleanup, outdated requests are ignored.

## Key Takeaways

1. **Three states for data fetching**: data, loading, error
2. **Cleanup prevents memory leaks**: Use cancellation flags or AbortController
3. **Reset error state**: Clear errors before new fetches
4. **Handle all states**: Loading, success, and error cases
5. **Can't make effect async**: Create async function inside effect instead
6. **Dependencies trigger refetch**: Include all values used in effect

## When to Fetch Data

### DO fetch in useEffect:
- Initial page load data
- Data based on route parameters
- Polling/real-time updates
- Dependencies that should trigger refetch

### DON'T fetch in useEffect:
- User-triggered actions (use event handlers)
- Data needed immediately (consider SSR)
- If using a data fetching library (React Query, SWR)

## Modern Alternatives

Consider using data fetching libraries for production:
- **React Query**: Caching, refetching, mutations
- **SWR**: Stale-while-revalidate pattern
- **Apollo Client**: GraphQL data fetching
- **Suspense**: Experimental React feature for data fetching

These handle caching, deduplication, and race conditions automatically.
