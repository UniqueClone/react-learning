# Context API Basics

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 25-30 minutes

## Challenge

Build a user authentication context system using React's Context API. You'll refactor the prop drilling example from Exercise 01 into a clean, maintainable solution that demonstrates proper Context usage patterns.

Create a `UserContext` that provides user data and authentication methods throughout your component tree without prop drilling.

## Requirements

Your implementation must:
- Create a UserContext using `createContext`
- Implement a UserProvider component that wraps the app
- Provide user data (name, role, email, isAuthenticated) through context
- Create a custom `useUser` hook for consuming context
- Include login/logout functionality that updates context
- Display user information in deeply nested components without prop drilling
- Show different UI based on authentication status

## Learning Objectives

- Master `createContext`, `Provider`, and `useContext` APIs
- Understand when and how to use Context effectively
- Learn to create custom context hooks for better DX
- Practice context value updates and state management
- Recognize Context advantages over prop drilling

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] UserContext created with proper TypeScript types
- [ ] UserProvider component manages authentication state
- [ ] Custom useUser hook provides clean API for consumers
- [ ] Login/logout buttons update authentication status
- [ ] Nested components access user data without prop drilling
- [ ] Protected content only shows when authenticated
- [ ] All 8 tests pass

## Hints

<details>
<summary>Hint 1: Context Structure</summary>

```typescript
const UserContext = createContext<UserContextValue | undefined>(undefined);

interface UserContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}
```
</details>

<details>
<summary>Hint 2: Custom Hook Pattern</summary>

Create a `useUser` hook that throws an error if used outside a Provider. This prevents runtime bugs and provides better DX:

```typescript
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
```
</details>

<details>
<summary>Hint 3: Provider Implementation</summary>

The Provider should manage state internally and expose methods to update it:

```typescript
function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const value = {
    user,
    isAuthenticated: user !== null,
    login,
    logout
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

## Solution

Once you've completed the exercise, check SOLUTION.md for a complete implementation and detailed explanations of Context patterns and best practices.
