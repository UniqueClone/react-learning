# Rendering Lists with Keys

**Difficulty:** beginner
**Type:** Fix Broken Code
**Estimated Time:** 15-20 minutes

## Problem

This todo list application has 4 bugs related to improper use of keys in lists. The code works but has performance issues and React warnings. Your job is to find and fix all the key-related bugs.

## Learning Objectives

- Understand why keys are important in React lists
- Learn when to use unique IDs vs indices as keys
- Recognize the problems caused by improper key usage
- Master the `.map()` method for rendering lists
- Understand React's reconciliation algorithm

## Instructions

1. Run `pnpm install` to install dependencies
2. Run `pnpm dev` to see the component (check browser console for warnings)
3. Look at the code and find the 4 bugs related to keys
4. Fix each bug by using proper, unique keys
5. Run `pnpm test` to verify your fixes
6. Ensure there are no console warnings

## Tasks

- [ ] Fix Bug 1: Using index as key in the main todo list
- [ ] Fix Bug 2: Missing key in completed todos list
- [ ] Fix Bug 3: Using non-unique text as key in active todos
- [ ] Fix Bug 4: Fragment without key in mapped list
- [ ] All tests pass without warnings

## Hints

<details>
<summary>Why is using index as key problematic?</summary>

When items are reordered, added, or removed, using the index as a key can cause:
- Component state being preserved incorrectly
- Performance issues with DOM updates
- Unexpected behavior with form inputs

Always use a unique, stable ID when available.
</details>

<details>
<summary>What makes a good key?</summary>

A good key should be:
1. **Unique** among siblings
2. **Stable** (doesn't change between renders)
3. **Predictable** (same item always has same key)

Example: Use `todo.id` instead of `index` or `todo.text`
</details>

<details>
<summary>How do I add a key to a React Fragment?</summary>

Use the full `<React.Fragment>` syntax:
```typescript
{items.map((item) => (
  <React.Fragment key={item.id}>
    <span>{item.name}</span>
  </React.Fragment>
))}
```

The short syntax `<>` doesn't support keys.
</details>

<details>
<summary>Where are the 4 bugs?</summary>

1. "My Todos" section - using `index` as key
2. "Completed Todos" section - no key at all
3. "Active Todos" section - using `todo.text` (not guaranteed unique)
4. "All Todo Titles" section - Fragment needs a key
</details>

## Solution

Once you've attempted the exercise, check [SOLUTION.md](SOLUTION.md) for the complete solution and explanation.
