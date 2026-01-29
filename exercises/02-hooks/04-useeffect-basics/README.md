# useEffect Basics - Document Title & Page View Tracker

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 20-25 minutes

## Challenge

Build a component that demonstrates the fundamentals of the `useEffect` hook. You'll create a document title updater and a page view tracker that teaches you about effect timing, dependencies, and cleanup.

## Requirements

Your implementation must:
- Update the document title based on a counter value
- Track page views with a timer
- Implement proper effect cleanup
- Use dependency arrays correctly
- Have a counter that increments/decrements
- Display how long the page has been viewed

## Learning Objectives

- Understanding `useEffect` hook syntax and usage
- Learning when effects run (mount, update, unmount)
- Using dependency arrays correctly
- Implementing cleanup functions
- Understanding effect timing vs. render

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Document title updates when counter changes
- [ ] Page view timer runs and displays seconds
- [ ] Timer starts on mount
- [ ] Timer cleanup happens on unmount
- [ ] Counter buttons work correctly
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1: Basic useEffect Syntax</summary>

```typescript
useEffect(() => {
  // Effect code here

  return () => {
    // Cleanup code here (optional)
  }
}, [dependencies])
```
</details>

<details>
<summary>Hint 2: Updating Document Title</summary>

```typescript
useEffect(() => {
  document.title = `Count: ${count}`
}, [count])  // Re-run when count changes
```
</details>

<details>
<summary>Hint 3: Timer with Cleanup</summary>

```typescript
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)

  return () => clearInterval(timer)  // Cleanup
}, [])  // Empty array = run once on mount
```
</details>

<details>
<summary>Hint 4: Dependency Array Rules</summary>

- No array: Effect runs after every render
- Empty array `[]`: Effect runs once on mount
- With dependencies `[count]`: Effect runs when dependencies change
</details>

## Common Mistakes

1. **Forgetting cleanup**: Timers and listeners must be cleaned up to prevent memory leaks
2. **Wrong dependencies**: Missing dependencies can cause stale closures
3. **Infinite loops**: Setting state without proper dependencies causes infinite re-renders
4. **Running on every render**: Forgetting the dependency array runs effect too often

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

## Further Learning

- [useEffect Hook Documentation](https://react.dev/reference/react/useEffect)
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
