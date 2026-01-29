# Complete Performance Audit

**Difficulty:** advanced
**Type:** Fix Broken Code
**Estimated Time:** 35-40 minutes

## Problem

This dashboard component has severe performance issues. It's slow, laggy, and re-renders unnecessarily. Your task is to identify and fix all performance problems using the techniques learned in previous exercises.

## Learning Objectives

- Identify performance bottlenecks in React components
- Apply React.memo, useMemo, and useCallback appropriately
- Optimize expensive computations
- Prevent unnecessary re-renders
- Use React DevTools Profiler to measure improvements

## Instructions

1. Run `pnpm install` to install dependencies
2. Run `pnpm dev` to see the slow component in action
3. Open React DevTools Profiler and record a session
4. Identify the performance issues
5. Fix the problems one by one
6. Run `pnpm test` to verify all tests pass
7. Measure the performance improvement

## Tasks

- [ ] Memoize the UserCard component to prevent unnecessary re-renders
- [ ] Optimize the expensive fibonacci calculation with useMemo
- [ ] Wrap event handlers with useCallback to prevent child re-renders
- [ ] Memoize the filtered users list computation
- [ ] Ensure the component doesn't re-render when typing in search

## Hints

<details>
<summary>Hint 1: Identifying the Problems</summary>

Use React DevTools Profiler to identify:
1. Which components re-render frequently?
2. Which renders take the most time?
3. Why are components re-rendering?

Common causes:
- New object/function references on every render
- Expensive calculations on every render
- Parent re-renders causing child re-renders

</details>

<details>
<summary>Hint 2: React.memo</summary>

UserCard re-renders every time the parent re-renders, even when its props haven't changed. Wrap it with React.memo:

```typescript
const UserCard = React.memo(({ user, onSelect }: UserCardProps) => {
  // ...
});
```

</details>

<details>
<summary>Hint 3: useMemo for Expensive Calculations</summary>

The fibonacci calculation runs on every render, even when the input hasn't changed:

```typescript
const fibResult = useMemo(() => {
  return fibonacci(fibInput);
}, [fibInput]);
```

</details>

<details>
<summary>Hint 4: useCallback for Event Handlers</summary>

Event handlers are recreated on every render, breaking React.memo. Wrap them:

```typescript
const handleSelect = useCallback((userId: number) => {
  setSelected(userId);
}, []);
```

</details>

<details>
<summary>Hint 5: useMemo for Filtered List</summary>

The filtered list is recalculated on every render. Memoize it:

```typescript
const filteredUsers = useMemo(() => {
  return users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );
}, [users, search]);
```

</details>

## Performance Metrics

**Before optimization:**
- Initial render: ~500ms
- Typing in search: 200ms per keystroke
- Clicking a user: 150ms
- Total re-renders per interaction: 50+

**After optimization:**
- Initial render: ~100ms (5x faster)
- Typing in search: 10ms per keystroke (20x faster)
- Clicking a user: 5ms (30x faster)
- Total re-renders per interaction: 2-3 (25x fewer)

## Solution

Once you've attempted the exercise, check SOLUTION.md for the complete solution and explanation.
