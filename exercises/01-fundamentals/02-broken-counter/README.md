# Fix the Broken Counter

**Difficulty:** Beginner
**Type:** Fix Broken Code
**Estimated Time:** 15-20 minutes

## Problem

This counter component has several bugs that prevent it from working correctly:
1. The increment button doesn't increase the count
2. The decrement button causes an error
3. The reset button doesn't reset to 0
4. The double button doesn't double the count

Your job is to fix these issues and make all tests pass.

## Learning Objectives

- Understanding React state updates
- Proper event handler syntax
- Using functional state updates
- Debugging common React mistakes

## Instructions

1. Run `pnpm install` to install dependencies
2. Run `pnpm dev` to see the broken component in action
3. Run `pnpm test` to see which tests are failing
4. Fix the bugs in `src/App.tsx`
5. Re-run tests until they all pass

## Tasks

- [ ] Fix the increment button
- [ ] Fix the decrement button error
- [ ] Fix the reset button
- [ ] Fix the double button
- [ ] Ensure all tests pass

## Hints

<details>
<summary>Hint 1: Increment Button</summary>
Check the onClick handler - is it calling the function or just referencing it?
</details>

<details>
<summary>Hint 2: Decrement Button</summary>
Look at how the state is being updated. When you need the previous state value, use the functional form of setState.
</details>

<details>
<summary>Hint 3: Reset Button</summary>
What value should count be set to when resetting? Make sure it's a number, not undefined.
</details>

<details>
<summary>Hint 4: Double Button</summary>
Similar to decrement - you need to use the previous state value correctly.
</details>

## Solution

Once you've attempted the exercise, check SOLUTION.md for the complete solution and explanation.
