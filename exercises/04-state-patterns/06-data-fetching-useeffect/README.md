# Data Fetching with useEffect

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 30-35 minutes

## Challenge

Build a user list component that fetches data from an API using `useEffect`. You'll need to handle loading states, error states, and race conditions that can occur when components unmount before requests complete.

## Requirements

Your implementation must:
- Fetch users from the JSONPlaceholder API (`https://jsonplaceholder.typicode.com/users`)
- Display a loading indicator while fetching
- Show user data in a list once loaded
- Handle and display error messages if the fetch fails
- Properly clean up to prevent memory leaks
- Handle race conditions with cleanup functions
- Include proper TypeScript types for the API response

## Learning Objectives

- Master the useEffect hook for side effects
- Understand proper cleanup with useEffect
- Learn to handle async operations in React
- Practice state management for loading, error, and success states
- Implement proper TypeScript typing for API responses
- Handle race conditions and component unmounting

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above and check the tests
3. Implement your solution in `App.tsx`
4. Run `pnpm dev` to test manually
5. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Fetches user data from JSONPlaceholder API on component mount
- [ ] Shows "Loading..." text while fetching
- [ ] Displays list of users with name and email after successful fetch
- [ ] Shows error message if fetch fails
- [ ] Cleans up properly to prevent memory leaks
- [ ] Handles race conditions (component unmounting before fetch completes)
- [ ] All 10 tests pass

## Hints

<details>
<summary>Hint 1: State Management</summary>

You'll need three pieces of state:
- `loading`: boolean for loading state
- `users`: array to store fetched users
- `error`: string or null for error messages

```typescript
const [loading, setLoading] = useState(true);
const [users, setUsers] = useState<User[]>([]);
const [error, setError] = useState<string | null>(null);
```
</details>

<details>
<summary>Hint 2: Fetching in useEffect</summary>

Use useEffect with an empty dependency array to fetch on mount:

```typescript
useEffect(() => {
  // Define async function inside useEffect
  const fetchUsers = async () => {
    try {
      const response = await fetch('...');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);
```
</details>

<details>
<summary>Hint 3: Cleanup and Race Conditions</summary>

Use a cleanup function to handle component unmounting:

```typescript
useEffect(() => {
  let isCancelled = false;

  const fetchUsers = async () => {
    try {
      const response = await fetch('...');
      const data = await response.json();

      // Only update state if component is still mounted
      if (!isCancelled) {
        setUsers(data);
        setLoading(false);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  fetchUsers();

  // Cleanup function
  return () => {
    isCancelled = true;
  };
}, []);
```
</details>

<details>
<summary>Hint 4: TypeScript Interface</summary>

Define the User interface based on the API response:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  // Add other fields if needed
}
```
</details>

## Testing

Run `pnpm test` to check your implementation. The tests verify:
- Loading state is shown initially
- Users are fetched and displayed correctly
- Error handling works properly
- Cleanup prevents memory leaks

## Common Mistakes

- Forgetting to handle the loading state
- Not cleaning up the effect (memory leaks)
- Setting state after component unmounts (React warnings)
- Not handling fetch errors
- Missing TypeScript types for API response

## Further Learning

- [React Docs: useEffect](https://react.dev/reference/react/useEffect)
- [React Docs: Fetching Data](https://react.dev/learn/synchronizing-with-effects#fetching-data)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
