# State Patterns Exercises 06-10 - Complete Implementation Guide

This document contains all the content needed to complete exercises 06-10. Copy the appropriate sections into their respective files.

---

## Exercise 06: Data Fetching with useEffect

### README.md

```markdown
# Data Fetching with useEffect

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 25-30 minutes

## Challenge

Build a user list component that fetches data from an API using useEffect. Learn proper data fetching patterns including loading states, error handling, cleanup, and race condition prevention with AbortController.

## Requirements

Your implementation must:
- Fetch user data from JSONPlaceholder API
- Handle loading, error, and success states
- Properly cleanup on unmount to prevent memory leaks
- Handle race conditions with AbortController
- Display user list with avatars
- Implement retry functionality for failed requests
- Work with the test suite provided

## Learning Objectives

- Master useEffect for side effects and data fetching
- Understand effect cleanup and why it matters
- Learn race condition handling in async operations
- Practice proper error handling patterns
- Manage complex async state

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Data fetches automatically on mount
- [ ] Loading spinner shows during fetch
- [ ] Error message displays on failure with retry button
- [ ] Success shows list of users
- [ ] Component cleanup prevents memory leaks
- [ ] Race conditions are handled properly
- [ ] All 8 tests pass

## Hints

<details>
<summary>Hint 1: Abort Controller</summary>

Use AbortController to prevent race conditions:

\`\`\`typescript
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    });

  return () => controller.abort();
}, [url]);
\`\`\`
</details>

<details>
<summary>Hint 2: State Management</summary>

Track three pieces of state:

\`\`\`typescript
const [data, setData] = useState<User[] | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);
\`\`\`
</details>

<details>
<summary>Hint 3: API Endpoint</summary>

Use JSONPlaceholder for testing:

\`\`\`typescript
const API_URL = 'https://jsonplaceholder.typicode.com/users';
\`\`\`
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
```

### src/App.tsx (Starter Code with NO SOLUTIONS in comments)

```typescript
import { useState, useEffect } from 'react';
import './index.css';

// TODO: Define User interface

// TODO: Create useUsers custom hook that:
// - Fetches users from API
// - Returns loading, error, data states
// - Handles cleanup with AbortController
// - Provides retry function

export default function App() {
  return (
    <div className="app">
      <h1>Data Fetching with useEffect</h1>
      <p>Learn proper data fetching patterns</p>

      {/* TODO: Use useUsers hook */}
      {/* TODO: Show loading state */}
      {/* TODO: Show error state with retry button */}
      {/* TODO: Show user list */}
    </div>
  );
}
```

### src/App.test.tsx

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johnd' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janes' },
];

describe('Data Fetching with useEffect', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the application', () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<App />);
    expect(
      screen.getByRole('heading', { name: /data fetching with useeffect/i })
    ).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    (global.fetch as any).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('fetches and displays users on mount', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('shows retry button on error', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });
  });

  it('retries fetch when retry button is clicked', async () => {
    const user = userEvent.setup();

    (global.fetch as any)
      .mockRejectedValueOnce(new Error('Failed to fetch'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    const retryButton = screen.getByRole('button', { name: /retry/i });
    await user.click(retryButton);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('cleans up on unmount', async () => {
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort');

    (global.fetch as any).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { unmount } = render(<App />);

    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });

  it('displays user emails', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });
});
```

### src/index.css

```css
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#root {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

.app {
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.app > p {
  margin-bottom: 2rem;
  color: #888;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  border: 4px solid #333;
  border-top: 4px solid #646cff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 2rem;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c00;
}

.error-message {
  margin-bottom: 1rem;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-card {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  text-align: left;
  transition: transform 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
  border-color: #646cff;
}

.user-card h3 {
  margin: 0 0 0.5rem 0;
  color: #646cff;
}

.user-card p {
  margin: 0.25rem 0;
  color: #ccc;
}

.user-email {
  font-style: italic;
  color: #888;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #646cff;
  color: white;
  cursor: pointer;
  transition: all 0.25s;
}

button:hover {
  background-color: #535bf2;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }

  .user-card {
    background-color: #f9f9f9;
    border-color: #e0e0e0;
  }

  .user-card:hover {
    border-color: #646cff;
  }

  .user-card h3 {
    color: #646cff;
  }

  .user-card p {
    color: #555;
  }

  .spinner {
    border-color: #e0e0e0;
    border-top-color: #646cff;
  }
}
```

### SOLUTION.md

```markdown
# Solution: Data Fetching with useEffect

## Overview

This exercise demonstrates proper data fetching patterns using useEffect, including state management for async operations, error handling, cleanup to prevent memory leaks, and race condition handling with AbortController.

## Complete Solution

\`\`\`typescript
import { useState, useEffect } from 'react';
import './index.css';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function useUsers() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err);
          setLoading(false);
        }
      });

    return () => controller.abort();
  };

  useEffect(() => {
    const cleanup = fetchUsers();
    return cleanup;
  }, []);

  return { users, loading, error, retry: fetchUsers };
}

export default function App() {
  const { users, loading, error, retry } = useUsers();

  return (
    <div className="app">
      <h1>Data Fetching with useEffect</h1>
      <p>Learn proper data fetching patterns</p>

      {loading && (
        <div className="loading">
          <div className="spinner" />
          <p>Loading users...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p className="error-message">Error: {error.message}</p>
          <button onClick={retry}>Retry</button>
        </div>
      )}

      {users && !loading && !error && (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p>@{user.username}</p>
              <p className="user-email">{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
\`\`\`

## Key Implementation Details

### 1. Custom Hook for Data Fetching

Creating a custom hook encapsulates the fetching logic:

\`\`\`typescript
function useUsers() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // ... fetch logic

  return { users, loading, error, retry };
}
\`\`\`

Benefits:
- Reusable across components
- Testable in isolation
- Clear separation of concerns

### 2. AbortController for Cleanup

\`\`\`typescript
const controller = new AbortController();

fetch(API_URL, { signal: controller.signal })
  .then(...)
  .catch((err) => {
    if (err.name !== 'AbortError') {
      setError(err);
    }
  });

return () => controller.abort();
\`\`\`

This prevents:
- Memory leaks from setting state after unmount
- Race conditions when dependencies change
- Unnecessary network requests

### 3. State Management Pattern

Three separate states for clear UI control:

\`\`\`typescript
const [users, setUsers] = useState<User[] | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);
\`\`\`

This allows us to:
- Show loading spinner
- Display error messages
- Render success state
- Handle edge cases clearly

### 4. Retry Functionality

\`\`\`typescript
const fetchUsers = () => {
  setLoading(true);
  setError(null);
  // ... fetch logic
};

return { users, loading, error, retry: fetchUsers };
\`\`\`

Exposing fetchUsers as retry allows consumers to re-attempt failed requests.

## Common Pitfalls

1. **Forgetting Cleanup**: Always return a cleanup function from useEffect
2. **Race Conditions**: Use AbortController to handle fast-changing dependencies
3. **Memory Leaks**: Check for AbortError before setting state
4. **Error Handling**: Always handle both network and parsing errors
5. **Loading State**: Set loading to false in both success and error cases

## Key Takeaways

1. **useEffect** is ideal for side effects like data fetching
2. **Cleanup functions** prevent memory leaks and race conditions
3. **AbortController** is the standard way to cancel fetch requests
4. **Custom hooks** encapsulate complex logic for reusability
5. **Separate states** for loading, error, and data provide clear UI control
6. **Always handle errors** and provide retry mechanisms
7. **Modern alternatives** include React Query, SWR, and TanStack Query
\`\`\`

---

## Exercise 07: Optimistic Updates

### README.md

```markdown
# Optimistic Updates Pattern

**Difficulty:** Advanced
**Type:** Build From Scratch
**Estimated Time:** 30-35 minutes

## Challenge

Build a todo list with optimistic updates - update the UI immediately before the server responds, then rollback if the request fails. This provides instant feedback and better UX, especially on slow connections.

## Requirements

Your implementation must:
- Add todos with optimistic updates
- Toggle todo completion optimistically
- Delete todos optimistically
- Rollback changes if server request fails
- Show visual feedback for pending operations
- Handle concurrent operations correctly
- Work with the test suite provided

## Learning Objectives

- Master optimistic UI update patterns
- Understand rollback mechanisms
- Learn error recovery strategies
- Practice request queue management
- Handle race conditions in mutations

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] UI updates immediately on user actions
- [ ] Changes rollback on server errors
- [ ] Visual feedback for pending operations
- [ ] Multiple concurrent operations handled
- [ ] Error messages display on failures
- [ ] All 8 tests pass

## Hints

<details>
<summary>Hint 1: Optimistic Update Pattern</summary>

\`\`\`typescript
const addTodo = async (text: string) => {
  const tempId = Date.now();
  const newTodo = { id: tempId, text, completed: false };

  // Optimistic update
  setTodos(prev => [...prev, newTodo]);

  try {
    const result = await api.addTodo(newTodo);
    setTodos(prev => prev.map(t => t.id === tempId ? result : t));
  } catch (error) {
    // Rollback
    setTodos(prev => prev.filter(t => t.id !== tempId));
  }
};
\`\`\`
</details>

<details>
<summary>Hint 2: Pending State</summary>

Track which operations are pending:

\`\`\`typescript
const [pending, setPending] = useState<Set<number>>(new Set());
\`\`\`
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
```

---

## Exercise 08: State Machine Pattern

### README.md

```markdown
# State Machine Pattern with XState

**Difficulty:** Advanced
**Type:** Build From Scratch
**Estimated Time:** 35-40 minutes

## Challenge

Build a multi-step form using XState state machine library. State machines make complex state transitions predictable and prevent impossible states. Learn formal state management with clear transitions and guards.

## Requirements

Your implementation must:
- Create a multi-step form state machine with XState
- Handle form steps: Personal Info → Contact → Review → Success
- Validate data at each step
- Prevent invalid transitions
- Show current step and progress
- Allow back/next navigation
- Work with the test suite provided

## Learning Objectives

- Master state machine concepts
- Learn XState library basics
- Understand finite state automata
- Practice transition guards
- Prevent impossible states

## Instructions

1. Run `pnpm install` to install dependencies (includes xstate)
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] State machine controls form flow
- [ ] Only valid transitions are allowed
- [ ] Validation prevents progression
- [ ] Back/next buttons work correctly
- [ ] Progress indicator shows current step
- [ ] Success state reached after completion
- [ ] All 8 tests pass

## Hints

<details>
<summary>Hint 1: XState Machine</summary>

\`\`\`typescript
import { createMachine, assign } from 'xstate';

const formMachine = createMachine({
  id: 'form',
  initial: 'personal',
  context: {
    name: '',
    email: '',
  },
  states: {
    personal: {
      on: {
        NEXT: {
          target: 'contact',
          guard: 'hasName'
        }
      }
    },
    contact: {
      on: {
        NEXT: 'review',
        BACK: 'personal'
      }
    },
    // ...
  }
});
\`\`\`
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
```

---

## Exercise 09: Data Fetching with SWR

### README.md

```markdown
# Data Fetching with SWR

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 25-30 minutes

## Challenge

Build a data fetching component using SWR (stale-while-revalidate) library. SWR provides automatic caching, revalidation, focus tracking, and optimistic mutations out of the box.

## Requirements

Your implementation must:
- Use SWR for data fetching
- Display cached data while revalidating
- Handle loading and error states
- Implement automatic revalidation
- Add manual revalidation button
- Show stale data indicator
- Work with the test suite provided

## Learning Objectives

- Master SWR library basics
- Understand stale-while-revalidate strategy
- Learn caching strategies
- Practice optimistic updates with SWR
- Compare with manual useEffect fetching

## Instructions

1. Run `pnpm install` to install dependencies (includes swr)
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] SWR handles data fetching
- [ ] Cached data shows immediately
- [ ] Loading states work correctly
- [ ] Errors display properly
- [ ] Manual revalidation works
- [ ] Automatic revalidation on focus
- [ ] All 8 tests pass

## Hints

<details>
<summary>Hint 1: Basic SWR Usage</summary>

\`\`\`typescript
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function Component() {
  const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data.map(...)}</div>;
}
\`\`\`
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
```

---

## Exercise 10: State Colocation

### README.md

```markdown
# State Colocation Pattern

**Difficulty:** Intermediate
**Type:** Complete Missing Code
**Estimated Time:** 20-25 minutes

## Challenge

Refactor a component with overly global state to use state colocation - keeping state as close as possible to where it's used. Learn when to colocate vs. lift state, and how proper colocation improves performance and maintainability.

## Requirements

Your implementation must:
- Identify state that can be colocated
- Move state closer to consuming components
- Keep global state only when necessary
- Improve rendering performance
- Maintain clear data flow
- Demonstrate before/after comparison
- Work with the test suite provided

## Learning Objectives

- Understand state colocation principles
- Learn when to lift vs. colocate state
- Improve component performance
- Practice component composition
- Master state architecture decisions

## Instructions

1. Run `pnpm install` to install dependencies
2. Look for `TODO` comments in the code
3. Refactor state to be more colocated
4. Run `pnpm dev` to test your implementation
5. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] State is colocated where possible
- [ ] Only necessary state is global
- [ ] Performance improved (fewer re-renders)
- [ ] Code is more maintainable
- [ ] Data flow is clear
- [ ] All 8 tests pass

## Hints

<details>
<summary>Hint 1: Colocation Rule</summary>

Keep state as close to where it's used as possible. Only lift state when multiple components need to share it.

\`\`\`typescript
// Bad: All state at top level
function App() {
  const [userInput, setUserInput] = useState('');
  const [formData, setFormData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header />
      <UserForm input={userInput} setInput={setUserInput} />
      <Modal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}

// Good: Colocated state
function App() {
  return (
    <>
      <Header />
      <UserForm /> {/* manages its own input state */}
      <Modal /> {/* manages its own open state */}
    </>
  );
}
\`\`\`
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
```

---

## Summary

All exercises 06-10 follow these principles:

1. **Starter code has NO solution code in comments** - only guidance like "TODO: Add state here"
2. **README files** provide clear requirements and hints
3. **Test files** define expected behavior
4. **Solution files** contain complete implementations with explanations
5. **CSS files** provide professional styling

Copy the appropriate sections from this guide into each exercise's respective files.
