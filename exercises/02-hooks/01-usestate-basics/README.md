# useState Basics - Counter

**Difficulty:** Beginner
**Type:** Build From Scratch
**Estimated Time:** 15-20 minutes

## Challenge

Build a simple counter application to learn the fundamentals of the `useState` hook. This exercise will help you understand how to initialize state, update it, and handle multiple state operations.

## Requirements

Your implementation must:
- Display a counter that starts at 0
- Have an increment button that adds 1 to the counter
- Have a decrement button that subtracts 1 from the counter
- Have a reset button that sets the counter back to 0
- Show the current count value on the screen
- Use the `useState` hook for state management

## Learning Objectives

- Understanding `useState` hook syntax and usage
- Learning how to initialize state with a default value
- Updating state with setter functions
- Handling multiple button click events
- Understanding when components re-render

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually in the browser
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Counter displays initial value of 0
- [ ] Increment button increases count by 1
- [ ] Decrement button decreases count by 1
- [ ] Reset button returns count to 0
- [ ] Multiple clicks work correctly
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1: Importing useState</summary>

You'll need to import `useState` from React:
```typescript
import { useState } from 'react'
```
</details>

<details>
<summary>Hint 2: Initializing State</summary>

Use `useState` with an initial value:
```typescript
const [count, setCount] = useState(0)
```
This gives you a state variable `count` and a function `setCount` to update it.
</details>

<details>
<summary>Hint 3: Creating Event Handlers</summary>

Create functions that call the setter:
```typescript
const increment = () => {
  setCount(count + 1)
}
```
</details>

<details>
<summary>Hint 4: Functional Updates (Optional)</summary>

While `setCount(count + 1)` works for this simple case, you can also use functional updates:
```typescript
setCount(prev => prev + 1)
```
This is more reliable when state updates depend on the previous value.
</details>

## Common Mistakes

1. **Forgetting to call the setter function**: `count + 1` alone won't update state
2. **Calling the setter immediately**: `onClick={setCount(count + 1)}` runs immediately instead of on click
3. **Mutating state directly**: Never do `count = count + 1`; always use the setter function

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

## Further Learning

- [React useState Hook Documentation](https://react.dev/reference/react/useState)
- [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
