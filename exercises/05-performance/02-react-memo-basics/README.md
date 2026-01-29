# React.memo for Component Memoization

**Difficulty:** Intermediate
**Type:** Fix Broken Code
**Estimated Time:** 25-30 minutes

## Problem

You have a list application that displays todo items. The problem is that every item in the list re-renders whenever ANY state changes in the parent, even if only one item was affected. This causes unnecessary re-renders and poor performance with large lists.

Your task is to fix the unnecessary re-renders by applying `React.memo` correctly to prevent child components from re-rendering when their props haven't changed.

## Learning Objectives

- Understand how `React.memo` prevents unnecessary re-renders
- Learn when to use `React.memo` and when not to
- Identify which components benefit from memoization
- Verify memoization is working with console logs

## Instructions

1. Run `pnpm install` to install dependencies
2. Run `pnpm dev` to see the broken component in action
3. Open the browser console and interact with the app
4. Notice that all todo items re-render even when only one changes
5. Run `pnpm test` to see which tests are failing
6. Fix the bugs by applying `React.memo` where appropriate
7. Re-run tests until they all pass

## Tasks

- [ ] Wrap the `TodoItem` component with `React.memo`
- [ ] Ensure individual items only re-render when their own props change
- [ ] Verify with console logs that memoization is working
- [ ] Make sure all tests pass

## Hints

<details>
<summary>Hint 1</summary>
React.memo is a higher-order component that wraps your component and does a shallow comparison of props to decide if a re-render is necessary.
</details>

<details>
<summary>Hint 2</summary>
You can wrap a component with React.memo like this: `const MemoizedComponent = React.memo(Component)` or use it directly in the export.
</details>

<details>
<summary>Hint 3</summary>
Check the console logs - when you toggle one todo, only that one item should log a render message, not all items.
</details>

## Solution

Once you've attempted the exercise, check SOLUTION.md for the complete solution and explanation.
