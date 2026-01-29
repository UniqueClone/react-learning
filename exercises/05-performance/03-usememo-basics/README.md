# useMemo for Expensive Calculations

**Difficulty:** Intermediate
**Type:** Complete Missing Parts
**Estimated Time:** 25-30 minutes

## Challenge

You have a product list application that performs expensive filtering and sorting operations. Currently, these calculations run on every render, even when the data hasn't changed. You need to use `useMemo` to cache these expensive calculations and only recompute them when necessary.

## Learning Objectives

- Understand when to use `useMemo` to optimize expensive calculations
- Learn how to specify correct dependencies for `useMemo`
- Measure the performance impact of memoization
- Avoid common pitfalls with memoization

## Instructions

1. Run `pnpm install` to install dependencies
2. Look for `TODO` comments in the code
3. Implement the missing `useMemo` calls
4. Run `pnpm dev` to test your implementation
5. Open console to see calculation counts
6. Run `pnpm test` to verify all tests pass

## Requirements

- [ ] Use `useMemo` to cache the filtered products
- [ ] Use `useMemo` to cache the sorted products
- [ ] Ensure calculations only run when dependencies change
- [ ] Verify with console logs that recalculations are minimized
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1</summary>
useMemo takes two arguments: a function that returns the computed value, and an array of dependencies. The computation only re-runs when dependencies change.
</details>

<details>
<summary>Hint 2</summary>
For filtering, the dependencies are: products array, search term, and category filter. For sorting, the dependencies are: filtered products and sort order.
</details>

<details>
<summary>Hint 3</summary>
Watch the console - you should see "Filtering..." and "Sorting..." only when relevant inputs change, not on every render.
</details>

## Testing

Run `pnpm test` to check your implementation. All tests should pass when you're done.
