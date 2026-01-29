# useState with Arrays - Shopping Cart (Fix Bugs)

**Difficulty:** Intermediate
**Type:** Fix Broken Code
**Estimated Time:** 20-25 minutes

## Problem

This shopping cart component has several bugs caused by direct array mutations. The cart isn't updating correctly when items are added, removed, or quantities are changed. Your job is to fix these issues by implementing proper immutable array operations.

## Bugs to Fix

1. Adding items doesn't work correctly
2. Removing items causes errors or doesn't update the UI
3. Updating quantities mutates the array directly
4. Clearing the cart has issues

All of these bugs stem from mutating the state array directly instead of creating new arrays.

## Learning Objectives

- Understanding why array mutations break React state
- Learning immutable array operations (map, filter, concat)
- Using the spread operator with arrays
- Avoiding common array mutation pitfalls
- Understanding array reference equality in React

## Instructions

1. Run `pnpm install` to install dependencies
2. Run `pnpm dev` to see the broken component in action
3. Run `pnpm test` to see which tests are failing
4. Fix the bugs in `App.tsx`
5. Re-run tests until they all pass

## Tasks

- [ ] Fix the addItem function to use immutable operations
- [ ] Fix the removeItem function to avoid mutations
- [ ] Fix the updateQuantity function to create a new array
- [ ] Fix the clearCart function
- [ ] Ensure all tests pass

## Hints

<details>
<summary>Hint 1: Adding Items</summary>

Instead of `push()`, use the spread operator or `concat()`:
```typescript
// WRONG
items.push(newItem)
setItems(items)

// RIGHT
setItems([...items, newItem])
// or
setItems(items.concat(newItem))
```
</details>

<details>
<summary>Hint 2: Removing Items</summary>

Use `filter()` to create a new array without the item:
```typescript
setItems(items.filter(item => item.id !== idToRemove))
```
</details>

<details>
<summary>Hint 3: Updating Items</summary>

Use `map()` to create a new array with the updated item:
```typescript
setItems(items.map(item =>
  item.id === targetId
    ? { ...item, quantity: newQuantity }
    : item
))
```
</details>

<details>
<summary>Hint 4: Clearing Cart</summary>

Set to a new empty array:
```typescript
setItems([])
```
</details>

## Common Mistakes

1. **Using push(), splice(), or other mutating methods**: These modify the original array
2. **Mutating then setting**: `items.push(x); setItems(items)` - same reference!
3. **Modifying properties**: `items[0].quantity = 5` - mutates nested objects
4. **Not creating new objects**: When updating, create new objects with spread operator

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

## Further Learning

- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Immutability in React](https://react.dev/learn/tutorial-tic-tac-toe#why-immutability-is-important)
