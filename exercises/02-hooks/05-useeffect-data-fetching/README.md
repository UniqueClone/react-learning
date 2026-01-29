# useEffect Data Fetching - User Profile Loader

**Difficulty:** Intermediate
**Type:** Complete Missing Parts
**Estimated Time:** 25-30 minutes

## Challenge

Build a component that fetches user data from an API, demonstrating proper data fetching patterns with useEffect. You'll implement loading states, error handling, and cleanup for cancelled requests.

## Requirements

Your implementation must:
- Fetch user data from a mock API
- Display loading state while fetching
- Display error state if fetch fails
- Display user data when successful
- Implement cleanup to prevent state updates on unmounted components
- Allow selecting different users to fetch

## Learning Objectives

- Fetching data with useEffect
- Managing async operations in effects
- Implementing loading and error states
- Cleanup for cancelled requests
- Avoiding memory leaks with unmounted components

## Instructions

1. Run `pnpm install` to install dependencies
2. Look for `// TODO:` comments in `App.tsx`
3. Complete the missing parts
4. Run `pnpm dev` to test manually
5. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Shows loading state while fetching
- [ ] Displays user data when loaded
- [ ] Shows error message if fetch fails
- [ ] Can select different users
- [ ] Implements proper cleanup
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1: Loading State Pattern</summary>

```typescript
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
const [data, setData] = useState(null)
```
</details>

<details>
<summary>Hint 2: Fetching in useEffect</summary>

```typescript
useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [url])
```
</details>

<details>
<summary>Hint 3: Cleanup with Cancelled Flag</summary>

```typescript
useEffect(() => {
  let isCancelled = false

  const fetchData = async () => {
    // ... fetch code ...
    if (!isCancelled) {
      setData(data)
    }
  }

  fetchData()

  return () => {
    isCancelled = true
  }
}, [userId])
```
</details>

## Common Mistakes

1. **Not handling loading state**: Users see stale data while new data loads
2. **Forgetting error handling**: App crashes on network errors
3. **No cleanup**: Setting state on unmounted components causes warnings
4. **Not resetting states**: Error from previous fetch shows with new data

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

## Further Learning

- [Fetching Data](https://react.dev/learn/synchronizing-with-effects#fetching-data)
- [AbortController API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
