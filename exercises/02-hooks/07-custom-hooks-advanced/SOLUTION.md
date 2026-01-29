# Solution: Custom Hooks - Advanced

## Complete Solution

```typescript
import { useState, useEffect } from 'react'

// Cache for fetch results (module scope - persists across renders)
const fetchCache = new Map<string, any>()

// Advanced fetch hook with caching and AbortController
function useFetch<T>(url: string, options?: { cache?: boolean }) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  useEffect(() => {
    // Check cache first
    if (options?.cache && fetchCache.has(url)) {
      setData(fetchCache.get(url))
      setLoading(false)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((json) => {
        setData(json)
        if (options?.cache) {
          fetchCache.set(url, json)
        }
        setLoading(false)
      })
      .catch((err) => {
        // Ignore abort errors
        if (err.name !== 'AbortError') {
          setError(err)
          setLoading(false)
        }
      })

    return () => {
      controller.abort()
    }
  }, [url, refetchTrigger, options?.cache])

  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1)
  }

  return { data, loading, error, refetch }
}

// Debounce hook - delays value updates
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

interface User {
  id: number
  name: string
  email: string
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  // Build URL with search query
  const url = debouncedSearch
    ? `https://jsonplaceholder.typicode.com/users?name_like=${debouncedSearch}`
    : 'https://jsonplaceholder.typicode.com/users'

  const { data: users, loading, error, refetch } = useFetch<User[]>(url, { cache: true })

  return (
    <div>
      <h1>Advanced Custom Hooks</h1>

      <section>
        <h2>Debounced Search</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p>Search term: {searchTerm}</p>
        <p>Debounced: {debouncedSearch}</p>
      </section>

      <section>
        <h2>Fetched Users</h2>
        {loading && <p>Loading...</p>}
        {error && (
          <div>
            <p>Error: {error.message}</p>
          </div>
        )}
        {!loading && !error && users && (
          <div>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
            <button onClick={refetch}>Refetch</button>
          </div>
        )}
      </section>
    </div>
  )
}
```

## Explanation

### 1. useFetch Hook with Generics

```typescript
function useFetch<T>(url: string, options?: { cache?: boolean }) {
  const [data, setData] = useState<T | null>(null)
  // ...
}
```

**Why generics?**
- Makes the hook work with any data type
- Provides type safety: `useFetch<User[]>()` ensures `data` is `User[] | null`
- TypeScript can infer types from usage
- Eliminates need for type assertions

### 2. Cache Implementation

```typescript
const fetchCache = new Map<string, any>()

// In useEffect:
if (options?.cache && fetchCache.has(url)) {
  setData(fetchCache.get(url))
  setLoading(false)
  return
}
```

**Key points:**
- Cache is **module-scoped** (outside the hook) so it persists
- Uses URL as cache key
- Early return prevents unnecessary fetch
- Set loading to false immediately for cache hits

**Why Map instead of object?**
- Better performance for frequent additions/deletions
- Keys can be any type (though we use strings here)
- Has `.has()` and `.get()` methods

### 3. AbortController for Cleanup

```typescript
const controller = new AbortController()

fetch(url, { signal: controller.signal })
  .then(...)
  .catch(err => {
    if (err.name !== 'AbortError') {
      setError(err)
    }
  })

return () => {
  controller.abort()
}
```

**Why AbortController?**
- Cancels in-flight requests when component unmounts
- Prevents setting state on unmounted components
- Avoids memory leaks and React warnings
- Saves bandwidth by canceling unnecessary requests

**Important:** Ignore `AbortError` - it's expected when we cancel

### 4. Refetch Pattern

```typescript
const [refetchTrigger, setRefetchTrigger] = useState(0)

const refetch = () => {
  setRefetchTrigger(prev => prev + 1)
}

useEffect(() => {
  // fetch logic
}, [url, refetchTrigger])
```

**How it works:**
- `refetchTrigger` is a dependency of useEffect
- Incrementing it triggers the effect to re-run
- The actual value doesn't matter, only that it changed
- Alternative: could use a boolean that toggles

### 5. useDebounce Implementation

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
```

**How it works:**
1. User types "test" quickly
2. Each keystroke cancels the previous timer
3. After 500ms of no typing, timer fires
4. `debouncedValue` updates to "test"
5. Component using debounced value re-renders once

**Benefits:**
- Reduces API calls (only fetch after user stops typing)
- Improves performance (fewer renders)
- Better UX (no jitter from rapid updates)

### 6. Composing Multiple Hooks

```typescript
const debouncedSearch = useDebounce(searchTerm, 500)
const { data, loading, error } = useFetch<User[]>(url, { cache: true })
```

Custom hooks compose beautifully:
- Each hook has a single responsibility
- They work together seamlessly
- Easy to test independently
- Reusable across components

## Alternative Implementations

### useFetch with Request Options

```typescript
function useFetch<T>(
  url: string,
  options?: {
    cache?: boolean
    method?: string
    body?: any
    headers?: HeadersInit
  }
) {
  // ...
  fetch(url, {
    signal: controller.signal,
    method: options?.method || 'GET',
    body: options?.body ? JSON.stringify(options.body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
}
```

### useDebounce with Immediate First Call

```typescript
function useDebounce<T>(
  value: T,
  delay: number,
  options?: { leading?: boolean }
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const [isFirstCall, setIsFirstCall] = useState(true)

  useEffect(() => {
    if (options?.leading && isFirstCall) {
      setDebouncedValue(value)
      setIsFirstCall(false)
      return
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay, options?.leading, isFirstCall])

  return debouncedValue
}
```

### useFetch with Loading State per Request

```typescript
function useFetch<T>(url: string) {
  const [state, setState] = useState<{
    data: T | null
    loading: boolean
    error: Error | null
  }>({
    data: null,
    loading: true,
    error: null,
  })

  // Single setState call for atomic updates
  useEffect(() => {
    // ...
    setState({ data: json, loading: false, error: null })
  }, [url])
}
```

## Performance Optimization

### Memoizing Refetch Function

```typescript
import { useCallback } from 'react'

const refetch = useCallback(() => {
  setRefetchTrigger(prev => prev + 1)
}, [])
```

Prevents creating new function on every render.

### Cache Invalidation

```typescript
const clearCache = () => {
  fetchCache.clear()
}

const invalidateCache = (url: string) => {
  fetchCache.delete(url)
}

return { data, loading, error, refetch, clearCache }
```

### Cache Expiration

```typescript
interface CacheEntry<T> {
  data: T
  timestamp: number
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

const fetchCache = new Map<string, CacheEntry<any>>()

// In useEffect:
if (options?.cache && fetchCache.has(url)) {
  const entry = fetchCache.get(url)
  const isExpired = Date.now() - entry.timestamp > CACHE_DURATION

  if (!isExpired) {
    setData(entry.data)
    setLoading(false)
    return
  }
}

// After fetch:
fetchCache.set(url, {
  data: json,
  timestamp: Date.now(),
})
```

## Key Takeaways

1. **TypeScript generics** make hooks flexible and type-safe
2. **AbortController** is essential for fetch cleanup
3. **Caching** must be module-scoped to persist
4. **Debouncing** reduces unnecessary operations
5. **Cleanup functions** prevent memory leaks
6. **Composing hooks** creates powerful, reusable patterns
7. **Error handling** must account for cancellation

## Common Pitfalls

1. **Cache inside hook**: Would reset on every render
   ```typescript
   // BAD
   function useFetch<T>(url: string) {
     const cache = new Map() // Resets every render!
   }

   // GOOD
   const cache = new Map() // Outside hook
   function useFetch<T>(url: string) { ... }
   ```

2. **Not handling AbortError**: Shows error to user unnecessarily
   ```typescript
   // BAD
   .catch(err => setError(err))

   // GOOD
   .catch(err => {
     if (err.name !== 'AbortError') {
       setError(err)
     }
   })
   ```

3. **Missing cleanup**: Memory leaks and warnings
   ```typescript
   // BAD
   useEffect(() => {
     const timer = setTimeout(...)
     // No cleanup!
   }, [value])

   // GOOD
   useEffect(() => {
     const timer = setTimeout(...)
     return () => clearTimeout(timer)
   }, [value])
   ```

4. **Wrong cache check**: Accessing before checking existence
   ```typescript
   // BAD
   if (cache.get(url)) { ... } // Falsy values cause issues

   // GOOD
   if (cache.has(url)) { ... } // Checks existence
   ```

## Testing Tips

### Mocking fetch

```typescript
global.fetch = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  ;(global.fetch as any).mockResolvedValue({
    ok: true,
    json: async () => ({ data: 'test' }),
  })
})
```

### Testing debounce timing

```typescript
import { waitFor } from '@testing-library/react'

await user.type(input, 'test')

// Should not update immediately
expect(screen.queryByText(/debounced: test/i)).not.toBeInTheDocument()

// Should update after delay
await waitFor(
  () => expect(screen.getByText(/debounced: test/i)).toBeInTheDocument(),
  { timeout: 1000 }
)
```

## Production-Ready Alternatives

For production apps, consider these libraries:
- **React Query / TanStack Query**: Full-featured data fetching with caching
- **SWR**: Stale-while-revalidate pattern
- **Apollo Client**: GraphQL data management
- **RTK Query**: Redux Toolkit's data fetching solution

These provide:
- Advanced caching strategies
- Background refetching
- Optimistic updates
- Request deduplication
- Pagination support
- Mutation handling

## Further Learning

- **Request deduplication**: Prevent multiple identical requests
- **Optimistic updates**: Update UI before server responds
- **Infinite queries**: Load more pattern for pagination
- **Prefetching**: Load data before it's needed
- **Error retry**: Automatic retry with exponential backoff
