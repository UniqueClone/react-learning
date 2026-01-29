# Combined Memoization Patterns

**Difficulty:** Advanced
**Type:** Fix Broken Code
**Estimated Time:** 30-35 minutes

## Problem

This exercise contains code with both over-memoization and under-memoization issues. Some components are memoized when they shouldn't be (adding unnecessary overhead), while others desperately need memoization but don't have it (causing performance problems). Your task is to identify and fix both types of issues.

## Learning Objectives

- Identify when memoization helps vs when it hurts
- Understand the overhead cost of memoization
- Learn to combine React.memo, useMemo, and useCallback effectively
- Practice measuring performance before and after optimization

## Instructions

1. Run `pnpm install` to install dependencies
2. Run `pnpm dev` to see the broken component in action
3. Open browser console to see excessive renders
4. Run `pnpm test` to see which tests are failing
5. Fix the over-memoization and under-memoization bugs
6. Re-run tests until they all pass

## Tasks

- [ ] Remove unnecessary memoization from simple components
- [ ] Add memoization to expensive list rendering
- [ ] Fix incorrect dependency arrays
- [ ] Ensure console logs show optimal re-render behavior
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1</summary>
Over-memoization: Simple components that render quickly don't benefit from React.memo. The comparison overhead can actually be slower than just re-rendering.
</details>

<details>
<summary>Hint 2</summary>
Under-memoization: Large lists with many items definitely benefit from memoization, especially when each item receives callbacks.
</details>

<details>
<summary>Hint 3</summary>
Check dependency arrays carefully. Missing dependencies cause bugs, but unnecessary dependencies prevent memoization from working.
</details>

## Solution

Once you've attempted the exercise, check SOLUTION.md for the complete solution and explanation.
