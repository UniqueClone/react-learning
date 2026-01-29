# Data Fetching with SWR

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 25-30 minutes

## Challenge

Build a data fetching component using the SWR (Stale-While-Revalidate) library. You'll learn how SWR simplifies data fetching with built-in caching, automatic revalidation, and better developer experience compared to manual useEffect implementations.

## Requirements

Your implementation must:
- Install and use the `swr` library for data fetching
- Fetch posts from JSONPlaceholder API (`https://jsonplaceholder.typicode.com/posts`)
- Display loading states using SWR's built-in loading indicator
- Handle errors gracefully with SWR's error handling
- Demonstrate SWR's caching and revalidation features
- Include a manual revalidate button
- Show proper TypeScript types

## Learning Objectives

- Understand the benefits of using SWR over manual useEffect
- Learn SWR's caching and revalidation strategies
- Master SWR's configuration options
- Practice handling loading and error states with SWR
- Understand when to use data fetching libraries vs manual implementation

## Instructions

1. Run `pnpm install` to install dependencies (SWR is already in package.json)
2. Read the requirements and check the tests
3. Implement your solution in `App.tsx`
4. Run `pnpm dev` to test manually
5. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Uses SWR's `useSWR` hook for data fetching
- [ ] Displays loading state while fetching
- [ ] Shows list of posts with title and body
- [ ] Handles and displays errors
- [ ] Includes manual revalidate button that refetches data
- [ ] Demonstrates caching (data persists between component remounts)
- [ ] All 10 tests pass

## Hints

<details>
<summary>Hint 1: Basic SWR Usage</summary>

Import and use SWR:

```typescript
import useSWR from 'swr';

const { data, error, isLoading } = useSWR(key, fetcher);
```

The `key` is the API URL, and `fetcher` is a function that returns the data.
</details>

<details>
<summary>Hint 2: Creating a Fetcher Function</summary>

SWR requires a fetcher function:

```typescript
const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
});

const { data, error, isLoading } = useSWR('/api/data', fetcher);
```
</details>

<details>
<summary>Hint 3: Manual Revalidation</summary>

SWR provides a `mutate` function for manual revalidation:

```typescript
const { data, error, isLoading, mutate } = useSWR(url, fetcher);

// In a button onClick:
<button onClick={() => mutate()}>Refresh</button>
```
</details>

<details>
<summary>Hint 4: TypeScript Types</summary>

Define types for your data:

```typescript
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const { data, error, isLoading } = useSWR<Post[]>(url, fetcher);
```
</details>

## Common Mistakes

- Not providing a fetcher function
- Forgetting to check `response.ok` in fetcher
- Not handling the loading state
- Missing TypeScript types
- Not understanding SWR's automatic revalidation

## Benefits of SWR Over useEffect

1. **Automatic caching**: Data is cached and reused across components
2. **Revalidation**: Automatically refetches on focus/network reconnect
3. **Less boilerplate**: No need to manage loading/error state manually
4. **Better UX**: Shows stale data while revalidating
5. **Built-in features**: Polling, pagination, infinite loading out of the box

## Further Learning

- [SWR Documentation](https://swr.vercel.app/)
- [SWR vs React Query](https://swr.vercel.app/docs/comparison)
- [Data Fetching Patterns](https://react.dev/learn/synchronizing-with-effects#fetching-data)
