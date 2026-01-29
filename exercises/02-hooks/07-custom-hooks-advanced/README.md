# Custom Hooks - Advanced

**Difficulty:** Advanced
**Type:** Complete Missing Parts
**Estimated Time:** 30-35 minutes

## Challenge

Build advanced custom hooks using TypeScript generics, caching, debouncing, and AbortController patterns. You'll complete `useFetch<T>` for data fetching with caching and `useDebounce<T>` for delaying rapid value changes.

## Learning Objectives

- Using TypeScript generics in custom hooks for type safety
- Implementing caching strategies for API requests
- Using AbortController for fetch cleanup
- Creating debounce functionality with setTimeout
- Understanding performance optimization patterns
- Managing cleanup in useEffect properly
- Composing multiple custom hooks together

## Instructions

1. Run `pnpm install` to install dependencies
2. Look for `TODO` comments in `App.tsx`
3. Implement the missing functionality in both hooks
4. Run `pnpm dev` to test your implementation manually
5. Run `pnpm test` to verify all tests pass

## Requirements

### useFetch Hook
- [ ] Accept a generic type parameter for response data type
- [ ] Return `{ data, loading, error, refetch }` object
- [ ] Implement loading state (true while fetching)
- [ ] Implement error state (null or Error object)
- [ ] Implement data state (null or fetched data)
- [ ] Use AbortController to cancel fetch on cleanup
- [ ] Support optional caching based on URL
- [ ] Provide refetch function to manually re-fetch
- [ ] Handle fetch errors gracefully

### useDebounce Hook
- [ ] Accept a generic type parameter for any value type
- [ ] Accept value and delay parameters
- [ ] Return debounced value that updates after delay
- [ ] Use setTimeout to delay updates
- [ ] Clear timeout on value change or unmount
- [ ] Work with any type (string, number, object, etc.)

### App Component
- [ ] Use useDebounce for search input (500ms delay)
- [ ] Use useFetch with debounced search term
- [ ] Display loading, error, and data states
- [ ] Show both immediate and debounced values
- [ ] Implement refetch button

## Hints

<details>
<summary>Hint 1: useFetch Structure</summary>

```typescript
function useFetch<T>(url: string, options?: { cache?: boolean }) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  // Cache outside component (module scope)
  // useEffect with fetch logic
  // Return { data, loading, error, refetch }
}
```
</details>

<details>
<summary>Hint 2: Caching Strategy</summary>

Store cache outside the hook so it persists across renders:
```typescript
const cache = new Map<string, any>()

function useFetch<T>(url: string, options?: { cache?: boolean }) {
  useEffect(() => {
    // Check cache first
    if (options?.cache && cache.has(url)) {
      setData(cache.get(url))
      setLoading(false)
      return
    }

    // Fetch and store in cache
  }, [url, refetchTrigger])
}
```
</details>

<details>
<summary>Hint 3: AbortController</summary>

```typescript
useEffect(() => {
  const controller = new AbortController()

  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err)
      }
    })

  return () => controller.abort()
}, [url])
```
</details>

<details>
<summary>Hint 4: useDebounce Implementation</summary>

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```
</details>

<details>
<summary>Hint 5: Refetch Function</summary>

Use a trigger state to force re-fetch:
```typescript
const [refetchTrigger, setRefetchTrigger] = useState(0)

const refetch = () => {
  setRefetchTrigger(prev => prev + 1)
}

useEffect(() => {
  // fetch logic
}, [url, refetchTrigger]) // Re-runs when trigger changes
```
</details>

<details>
<summary>Hint 6: TypeScript Generics</summary>

```typescript
// Define generic type
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  // T can be any type
}

// Usage with specific type
interface User { id: number; name: string }
const { data } = useFetch<User[]>(url) // data is User[] | null
```
</details>

## Common Mistakes

1. **Not cleaning up AbortController**: Causes memory leaks and warnings
2. **Not clearing setTimeout**: Debounce timers must be cleaned up
3. **Cache inside component**: Cache should persist across renders
4. **Not handling AbortError**: Abort errors should be ignored, not shown as errors
5. **Wrong dependency array**: Missing dependencies cause stale closures
6. **Not using generics**: Makes hooks less flexible and type-unsafe
7. **Synchronous state updates**: Remember setState is asynchronous

## Testing

Run `pnpm test` to check your implementation. All tests should pass when you're done.

## Further Learning

- [AbortController API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Debouncing and Throttling](https://css-tricks.com/debouncing-throttling-explained-examples/)
- [React Query](https://tanstack.com/query/latest) - Production-ready data fetching library
- [SWR](https://swr.vercel.app/) - React hooks for data fetching with caching
