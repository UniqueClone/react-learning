# Debouncing and Throttling

**Difficulty:** intermediate
**Type:** Complete Missing Parts
**Estimated Time:** 25-30 minutes

## Challenge

Implement debounce and throttle custom hooks to control the frequency of expensive operations. Create a search input that debounces API calls and a scroll position tracker that throttles updates.

## Learning Objectives

- Understand the difference between debouncing and throttling
- Implement custom useDebounce and useThrottle hooks
- Apply these techniques to real-world scenarios
- Measure performance improvements
- Recognize when to use each technique

## Instructions

1. Run `pnpm install` to install dependencies
2. Look for `TODO` comments in the code
3. Implement the missing functionality
4. Run `pnpm dev` to test your implementation
5. Run `pnpm test` to verify all tests pass

## Requirements

- [ ] Implement a `useDebounce` hook that delays value updates
- [ ] Implement a `useThrottle` hook that limits callback frequency
- [ ] Create a search input that debounces user input
- [ ] Create a scroll tracker that throttles scroll events
- [ ] Display render counts to show performance improvement
- [ ] Clean up timers on unmount

## Hints

<details>
<summary>Hint 1: Debounce Concept</summary>

**Debouncing** delays execution until after a period of inactivity.

Use case: Search input
- User types "react"
- Wait 500ms after last keystroke
- Then trigger the search

This prevents searching on every keystroke (5 searches → 1 search).

</details>

<details>
<summary>Hint 2: useDebounce Implementation</summary>

The useDebounce hook should:
1. Accept a value and delay
2. Store debounced value in state
3. Use useEffect to set a timeout
4. Clear the timeout on cleanup
5. Return the debounced value

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

</details>

<details>
<summary>Hint 3: Throttle Concept</summary>

**Throttling** limits execution to once per time period.

Use case: Scroll events
- User scrolls rapidly
- Update position every 200ms max
- Ignore other scroll events in between

This prevents hundreds of updates per second (300 updates → 5 updates).

</details>

<details>
<summary>Hint 4: useThrottle Implementation</summary>

The useThrottle hook should:
1. Accept a callback and delay
2. Track last execution time with useRef
3. Return a throttled callback
4. Only execute if enough time has passed
5. Use useCallback for stable reference

</details>

## Testing

Run `pnpm test` to check your implementation. All tests should pass when you're done.

## Comparison

**Without optimization:**
- Search: 5 keystrokes = 5 API calls
- Scroll: 300 events/second = 300 updates

**With optimization:**
- Search (debounced): 5 keystrokes = 1 API call (80% reduction)
- Scroll (throttled): 300 events/second = 5 updates (98% reduction)
