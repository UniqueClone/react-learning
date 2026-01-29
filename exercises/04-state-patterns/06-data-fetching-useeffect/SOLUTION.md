# Solution: Data Fetching with useEffect

## Complete Implementation

```typescript
import { useState, useEffect } from 'react';
import './index.css';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!isCancelled) {
          setUsers(data);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1>User List</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>User List</h1>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>User List</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Key Implementation Details

### 1. TypeScript Interface

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}
```

Define the shape of data from the API. This provides type safety and autocomplete.

### 2. Three-State Management

```typescript
const [loading, setLoading] = useState(true);
const [users, setUsers] = useState<User[]>([]);
const [error, setError] = useState<string | null>(null);
```

Managing async operations requires three states:
- **loading**: Initial state is `true`, prevents showing empty state
- **users**: Array of fetched data, typed as `User[]`
- **error**: Null when no error, string message when error occurs

### 3. useEffect for Data Fetching

```typescript
useEffect(() => {
  // Fetch logic here
}, []);
```

Empty dependency array `[]` ensures the effect runs only once on mount. This is ideal for initial data fetching.

### 4. Cleanup with Cancellation Flag

```typescript
let isCancelled = false;

// ... async operations

if (!isCancelled) {
  setUsers(data);
}

return () => {
  isCancelled = true;
};
```

**Why this is critical:**
- Component can unmount while fetch is in progress
- Setting state on unmounted component causes React warnings
- Cancellation flag prevents state updates after unmount
- Cleanup function runs when component unmounts

### 5. Async Function Inside useEffect

```typescript
useEffect(() => {
  const fetchUsers = async () => {
    // async logic
  };

  fetchUsers();
}, []);
```

**Why not make useEffect async directly?**
```typescript
// DON'T DO THIS
useEffect(async () => {
  // This is wrong!
}, []);
```

useEffect expects either nothing or a cleanup function to be returned. An async function returns a Promise, which would break the cleanup mechanism.

### 6. Error Handling

```typescript
try {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  // ...
} catch (err) {
  if (!isCancelled) {
    setError(err instanceof Error ? err.message : 'An error occurred');
  }
}
```

Handle both network errors and HTTP errors:
- `fetch` only rejects on network errors
- Check `response.ok` for HTTP errors (404, 500, etc.)
- Type guard `err instanceof Error` for TypeScript safety

### 7. Conditional Rendering

```typescript
if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}

return <div>/* Normal content */</div>;
```

Early returns for loading and error states keep the code clean and prevent nested conditions.

## Common Pitfalls Avoided

### ❌ Pitfall 1: Forgetting Cleanup

```typescript
// BAD: No cleanup
useEffect(() => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => setUsers(data)); // Can run after unmount!
}, []);
```

**Problem:** State update after unmount causes React warnings and potential bugs.

**Solution:** Use cancellation flag as shown in the solution.

### ❌ Pitfall 2: Not Handling Loading State

```typescript
// BAD: Users defaults to empty array
const [users, setUsers] = useState<User[]>([]);
```

**Problem:** Can't distinguish between "loading" and "no data".

**Solution:** Separate loading state, start as `true`.

### ❌ Pitfall 3: Making useEffect Async

```typescript
// BAD: Async useEffect
useEffect(async () => {
  const data = await fetch(API_URL);
  setUsers(data);
}, []);
```

**Problem:** Breaks cleanup mechanism, TypeScript error.

**Solution:** Define async function inside useEffect, call it immediately.

### ❌ Pitfall 4: Not Checking response.ok

```typescript
// BAD: Doesn't handle HTTP errors
const response = await fetch(API_URL);
const data = await response.json(); // Might be error HTML!
```

**Problem:** `fetch` doesn't throw on 404, 500, etc.

**Solution:** Check `response.ok` and throw manually.

### ❌ Pitfall 5: Incorrect Dependency Array

```typescript
// BAD: Missing dependencies or wrong dependencies
useEffect(() => {
  fetch(`${API_URL}/${userId}`)
    .then(/* ... */);
}, []); // userId should be in dependencies!
```

**Problem:** Effect doesn't re-run when dependencies change.

**Solution:** Include all external values used inside effect.

## Performance Considerations

### Race Conditions

Without cleanup:
1. User navigates to page (fetch starts)
2. User immediately navigates away (component unmounts)
3. Fetch completes, tries to update state
4. React warning: "Can't perform a React state update on an unmounted component"

With cleanup:
1. User navigates to page (fetch starts)
2. User immediately navigates away (cleanup sets `isCancelled = true`)
3. Fetch completes, but checks `isCancelled` before state update
4. No warning, no bug

### When to Use This Pattern

**Good for:**
- Initial data loading on mount
- Data that doesn't change often
- Simple CRUD operations
- Learning useEffect fundamentals

**Not ideal for:**
- Data that needs frequent refetching
- Complex caching requirements
- Optimistic updates
- Real-time data

Consider using libraries like **SWR**, **React Query**, or **RTK Query** for complex data fetching needs.

## Alternative Approaches

### Using AbortController (Modern Approach)

```typescript
useEffect(() => {
  const abortController = new AbortController();

  fetch(API_URL, { signal: abortController.signal })
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    });

  return () => {
    abortController.abort();
  };
}, []);
```

**Pros:**
- Actually cancels the network request
- Modern browser API
- More explicit cancellation

**Cons:**
- More complex error handling
- Need to filter out AbortError
- Not supported in older browsers (but fine with polyfills)

### Using a Custom Hook

```typescript
function useUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Same fetch logic
  }, []);

  return { loading, users, error };
}

// In component:
function App() {
  const { loading, users, error } = useUsers();
  // ...
}
```

**Benefits:**
- Reusable across components
- Separates data fetching from UI
- Easier to test
- Can add refetch functionality

## Key Takeaways

1. **useEffect with empty deps** runs once on mount, perfect for initial data loading
2. **Always handle three states**: loading, success, error
3. **Cleanup is critical** to prevent state updates on unmounted components
4. **Type your data** with TypeScript interfaces for safety
5. **Check response.ok** because fetch doesn't throw on HTTP errors
6. **Define async functions** inside useEffect, don't make effect itself async
7. **Early returns** for loading/error states keep code clean
8. **Consider libraries** like SWR for complex data fetching needs

## Further Learning

- [React Docs: useEffect](https://react.dev/reference/react/useEffect)
- [React Docs: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [SWR Library](https://swr.vercel.app/) - Consider for production apps
- [React Query](https://tanstack.com/query) - Another excellent option
