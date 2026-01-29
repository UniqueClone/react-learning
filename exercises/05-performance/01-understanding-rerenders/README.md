# Understanding Component Re-renders

**Difficulty:** Beginner
**Type:** Build From Scratch
**Estimated Time:** 20-25 minutes

## Challenge

Build a component that demonstrates React's re-rendering behavior. You'll create a parent component with state and multiple child components, then visualize when each component re-renders using console logs. This exercise helps you understand the fundamental concept of re-rendering, which is essential before learning optimization techniques.

## Requirements

Your implementation must:
- Create a `Parent` component with counter and text input state
- Create three child components (`ChildA`, `ChildB`, `ChildC`) that log when they render
- Display counter and text values in the appropriate child components
- Use console logs to track all component renders

## Learning Objectives

- Understand what causes React components to re-render
- Visualize re-renders using console logs and React DevTools
- Learn the relationship between state changes and component updates
- Identify unnecessary re-renders in a component tree

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Parent component manages counter and text state
- [ ] ChildA displays counter value and logs renders
- [ ] ChildB displays static content and logs renders
- [ ] ChildC displays text value and logs renders
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1</summary>
Use console.log() at the top of each component function to track renders. Open the browser console to see the logs.
</details>

<details>
<summary>Hint 2</summary>
Notice that all children re-render when parent state changes, even if their props didn't change. This is React's default behavior before optimization.
</details>

<details>
<summary>Hint 3</summary>
You can use React DevTools' "Highlight updates when components render" option to visualize re-renders in the browser.
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
