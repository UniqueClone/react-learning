# useCallback for Function Memoization

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 25-30 minutes

## Challenge

Build a task manager where users can add tasks and mark them as complete. The problem: every time the parent re-renders, new callback functions are created, causing memoized child components to re-render unnecessarily. You'll use `useCallback` to stabilize function references and combine it with `React.memo` for optimal performance.

## Requirements

Your implementation must:
- Create a Parent component with a list of tasks
- Create a memoized TaskItem child component
- Use `useCallback` to stabilize the `onToggle` and `onDelete` callbacks
- Combine `useCallback` with `React.memo` to prevent unnecessary re-renders
- Add console logs to verify optimization is working

## Learning Objectives

- Understand why functions are recreated on every render
- Learn how `useCallback` stabilizes function references
- See how `useCallback` works together with `React.memo`
- Identify when `useCallback` is necessary vs unnecessary

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually
6. Open console to verify memoization is working
7. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Parent component manages tasks array
- [ ] TaskItem is wrapped with React.memo
- [ ] onToggle callback is wrapped with useCallback
- [ ] onDelete callback is wrapped with useCallback
- [ ] Only affected tasks re-render when one is toggled/deleted
- [ ] Typing in the "add task" input doesn't cause task re-renders
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1</summary>
useCallback returns a memoized version of the callback that only changes if dependencies change. Syntax: `useCallback(() => { /* function */ }, [dependencies])`
</details>

<details>
<summary>Hint 2</summary>
Without useCallback, functions are recreated every render, causing React.memo to see "different" props and re-render children.
</details>

<details>
<summary>Hint 3</summary>
Be careful with dependencies! If you use `tasks` in the callback, you might need to use the functional update form: `setTasks(prev => ...)`
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
