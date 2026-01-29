# Event Handling Deep Dive

**Difficulty:** intermediate
**Type:** Fix Broken Code
**Estimated Time:** 20-25 minutes

## Problem

This interactive dashboard has several event handling bugs. Links navigate when they shouldn't, events bubble up causing unwanted side effects, and some buttons don't work at all. Find and fix all 5 event handling bugs.

## Learning Objectives

- Master event.preventDefault() to prevent default browser behavior
- Understand event.stopPropagation() to control event bubbling
- Learn proper event handler binding in React
- Debug common event handling mistakes
- Understand synthetic events in React

## Instructions

1. Run `pnpm install` to install dependencies
2. Run `pnpm dev` to see the broken component in action
3. Run `pnpm test` to see which tests are failing
4. Find and fix all 5 event handling bugs
5. Re-run tests until they all pass

## Tasks

- [ ] Fix Bug 1: Form submission causes page reload
- [ ] Fix Bug 2: Link click navigates (should be prevented)
- [ ] Fix Bug 3: Clicking inner button triggers outer div click
- [ ] Fix Bug 4: Button event handler not bound correctly
- [ ] Fix Bug 5: Double-click event not firing
- [ ] All tests pass

## Hints

<details>
<summary>What does preventDefault() do?</summary>

`preventDefault()` stops the default browser behavior for an event:

```typescript
const handleClick = (e: React.MouseEvent) => {
  e.preventDefault() // Prevents link navigation, form submission, etc.
  // Your custom logic here
}
```

Common uses:
- Preventing form submission
- Preventing link navigation
- Preventing context menu
</details>

<details>
<summary>What does stopPropagation() do?</summary>

`stopPropagation()` prevents the event from bubbling up to parent elements:

```typescript
const handleInnerClick = (e: React.MouseEvent) => {
  e.stopPropagation() // Prevents parent onClick from firing
  // Only this handler runs
}
```

Without it, events "bubble" up the DOM tree, triggering parent handlers.
</details>

<details>
<summary>How do I bind event handlers correctly?</summary>

**❌ Wrong - calls immediately:**
```typescript
<button onClick={handleClick()}>Click</button>
```

**✅ Correct - passes reference:**
```typescript
<button onClick={handleClick}>Click</button>
```

**✅ Correct - inline arrow function:**
```typescript
<button onClick={() => handleClick()}>Click</button>
```
</details>

<details>
<summary>Where are the 5 bugs?</summary>

1. Form submission - missing preventDefault()
2. Link click - missing preventDefault()
3. Nested button click - missing stopPropagation()
4. Delete button - called immediately instead of on click
5. Card double-click - event handler not attached properly
</details>

## Solution

Once you've attempted the exercise, check SOLUTION.md for the complete solution and explanation.
