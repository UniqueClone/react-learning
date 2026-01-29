# Solution: Data Fetching with SWR

## Complete Implementation

```typescript
import useSWR from 'swr';
import './index.css';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    return res.json();
  });

export default function App() {
  const { data, error, isLoading, mutate } = useSWR<Post[]>(API_URL, fetcher);

  if (isLoading) {
    return (
      <div className="container">
        <h1>Posts (SWR)</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Posts (SWR)</h1>
        <div className="error">Error: Failed to load posts</div>
      </div>
    );
  }

  const posts = data?.slice(0, 5) || [];

  return (
    <div className="container">
      <h1>Posts (SWR)</h1>

      <button onClick={() => mutate()} className="refresh-button">
        Refresh
      </button>

      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Key Concepts

### 1. SWR Hook Usage

```typescript
const { data, error, isLoading, mutate } = useSWR<Post[]>(API_URL, fetcher);
```

**SWR returns:**
- `data`: The fetched data (undefined while loading)
- `error`: Any error that occurred
- `isLoading`: Loading state (true while fetching)
- `mutate`: Function to manually revalidate

### 2. Fetcher Function

```typescript
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    return res.json();
  });
```

**Why separate fetcher:**
- SWR is fetch-library agnostic
- Can use fetch, axios, or any Promise-returning function
- Reusable across different useSWR calls
- Easy to test independently

### 3. Manual Revalidation

```typescript
<button onClick={() => mutate()}>Refresh</button>
```

Calling `mutate()` without arguments refetches the data.

## SWR vs useEffect

### With useEffect (Manual)

```typescript
// Lots of boilerplate
const [loading, setLoading] = useState(true);
const [data, setData] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
  let cancelled = false;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!cancelled) {
        setData(data);
        setLoading(false);
      }
    })
    .catch(err => {
      if (!cancelled) {
        setError(err);
        setLoading(false);
      }
    });

  return () => { cancelled = true; };
}, []);
```

### With SWR

```typescript
// One line!
const { data, error, isLoading } = useSWR(url, fetcher);
```

## SWR Benefits

### 1. Automatic Caching

```typescript
// Component A
function CompA() {
  const { data } = useSWR('/api/users', fetcher);
  // ...
}

// Component B
function CompB() {
  const { data } = useSWR('/api/users', fetcher);
  // Uses cached data, no duplicate request!
}
```

### 2. Automatic Revalidation

SWR automatically refetches on:
- Window focus
- Network reconnect
- Component remount (with cache)

```typescript
const { data } = useSWR(url, fetcher, {
  revalidateOnFocus: true,    // Refetch when window gains focus
  revalidateOnReconnect: true, // Refetch when network reconnects
  refreshInterval: 0,          // Poll every N ms (0 = disabled)
});
```

### 3. Optimistic Updates

```typescript
const { mutate } = useSWR('/api/todos', fetcher);

// Optimistically update UI before server response
mutate(
  async () => {
    await fetch('/api/todos', { method: 'POST', body: newTodo });
    return [...data, newTodo];
  },
  {
    optimisticData: [...data, newTodo],
    rollbackOnError: true,
  }
);
```

### 4. Pagination and Infinite Loading

```typescript
import useSWRInfinite from 'swr/infinite';

const { data, size, setSize } = useSWRInfinite(
  (index) => `/api/posts?page=${index + 1}`,
  fetcher
);

// Load more
<button onClick={() => setSize(size + 1)}>Load More</button>
```

## Configuration Options

```typescript
import { SWRConfig } from 'swr';

function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,           // Poll every 3s
        dedupingInterval: 2000,          // Dedupe requests within 2s
        revalidateOnFocus: true,         // Revalidate on window focus
        revalidateOnReconnect: true,     // Revalidate on network reconnect
        shouldRetryOnError: true,        // Retry on error
        errorRetryCount: 3,              // Max retry count
        fetcher: (url) => fetch(url).then(r => r.json()),
      }}
    >
      {/* Your app */}
    </SWRConfig>
  );
}
```

## Common Patterns

### Dependent Fetching

```typescript
function Profile() {
  const { data: user } = useSWR('/api/user', fetcher);
  // Only fetch profile if user exists
  const { data: profile } = useSWR(
    user ? `/api/profile/${user.id}` : null,
    fetcher
  );
}
```

### Conditional Fetching

```typescript
// Pass null to disable fetching
const { data } = useSWR(shouldFetch ? '/api/data' : null, fetcher);
```

### Error Retry

```typescript
const { data, error } = useSWR(url, fetcher, {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Never retry on 404
    if (error.status === 404) return;

    // Only retry up to 3 times
    if (retryCount >= 3) return;

    // Retry after 5 seconds
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
});
```

## When to Use SWR

**Perfect for:**
- REST APIs
- Public APIs
- Data that benefits from caching
- Real-time features (with revalidation)
- Apps with multiple components fetching same data

**Consider alternatives for:**
- GraphQL (use Apollo Client or urql)
- Complex state management (consider Redux, Zustand)
- Server-side rendering (consider React Query with SSR support)

## SWR vs React Query

| Feature | SWR | React Query |
|---------|-----|-------------|
| Size | ~4KB | ~12KB |
| Learning Curve | Lower | Higher |
| Features | Focused | Comprehensive |
| SSR Support | Basic | Excellent |
| DevTools | No | Yes |
| Best For | Simple SPAs | Complex apps |

## Key Takeaways

1. **SWR simplifies data fetching** - No manual state management needed
2. **Automatic caching** - Same data shared across components
3. **Built-in revalidation** - Keep data fresh automatically
4. **One-line implementation** - vs dozens of lines with useEffect
5. **Production-ready** - Used by Vercel, GitHub, and thousands of apps
6. **Fetcher pattern** - Separates how to fetch from what to fetch
7. **Manual control** - Use `mutate()` when you need it

## Further Learning

- [SWR Documentation](https://swr.vercel.app/)
- [SWR Examples](https://swr.vercel.app/examples)
- [React Query Comparison](https://swr.vercel.app/docs/comparison)
- [Vercel's Data Fetching Guide](https://vercel.com/guides/data-fetching)
