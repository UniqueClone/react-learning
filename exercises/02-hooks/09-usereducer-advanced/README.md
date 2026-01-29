# useReducer - Advanced (Fix Broken Code)

**Difficulty:** Advanced
**Type:** Fix Broken Code
**Estimated Time:** 30-35 minutes

## Problem

The shopping cart implementation has multiple bugs related to useReducer best practices:
- Missing action types in discriminated union
- State mutations (not immutable updates)
- Missing reducer cases
- Missing default case in switch statement
- Incorrect total calculation

## The Bugs

1. **CartAction type is incomplete** - Missing REMOVE_ITEM and UPDATE_QUANTITY actions
2. **ADD_ITEM mutates state** - Directly modifies existing item and array
3. **REMOVE_ITEM case missing** - No way to remove items from cart
4. **UPDATE_QUANTITY case missing** - No way to update item quantities
5. **Missing default case** - Reducer doesn't handle unknown actions
6. **Incorrect total calculation** - Component calculates total wrong, should be in reducer or computed

## Learning Objectives

- Understanding immutable state updates in reducers
- Using TypeScript discriminated unions properly
- Implementing all necessary reducer cases
- Best practices for reducer patterns
- Avoiding state mutations
- Proper total calculation patterns

## Instructions

1. Run `pnpm install` to install dependencies
2. Run `pnpm dev` to see the broken component in action
3. Run `pnpm test` to see which tests are failing
4. Read the BUG comments in `App.tsx`
5. Fix all bugs one by one
6. Re-run tests until they all pass

## Tasks

- [ ] Add REMOVE_ITEM and UPDATE_QUANTITY to CartAction type
- [ ] Fix ADD_ITEM to use immutable updates
- [ ] Implement REMOVE_ITEM case in reducer
- [ ] Implement UPDATE_QUANTITY case in reducer
- [ ] Add default case to switch statement
- [ ] Fix total calculation

## Hints

<details>
<summary>Hint 1: Complete Action Types</summary>

```typescript
type CartAction =
  | { type: 'ADD_ITEM'; item: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'UPDATE_QUANTITY'; id: number; quantity: number }
  | { type: 'CLEAR_CART' }
```
</details>

<details>
<summary>Hint 2: Immutable Array Updates</summary>

```typescript
// Adding item
return {
  ...state,
  items: [...state.items, newItem]
}

// Updating item
return {
  ...state,
  items: state.items.map(item =>
    item.id === id ? { ...item, quantity } : item
  )
}

// Removing item
return {
  ...state,
  items: state.items.filter(item => item.id !== id)
}
```
</details>

<details>
<summary>Hint 3: Total Calculation</summary>

Calculate total in the component from state:
```typescript
const total = state.items.reduce((sum, item) => {
  return sum + (item.price * item.quantity)
}, 0)
```
</details>

<details>
<summary>Hint 4: UPDATE_QUANTITY with Auto-Remove</summary>

If quantity becomes 0 or less, remove the item:
```typescript
case 'UPDATE_QUANTITY':
  if (action.quantity <= 0) {
    return {
      ...state,
      items: state.items.filter(item => item.id !== action.id)
    }
  }
  return {
    ...state,
    items: state.items.map(item =>
      item.id === action.id ? { ...item, quantity: action.quantity } : item
    )
  }
```
</details>

## Common Mistakes

1. **Mutating arrays**: `state.items.push(...)` creates bugs
2. **Mutating objects**: `existingItem.quantity++` doesn't work
3. **Forgetting default case**: Causes undefined returns
4. **Not filtering removed items**: Leaves empty items in cart
5. **Wrong total formula**: Must multiply price by quantity

## Solution

Once you've attempted the exercise, check SOLUTION.md for the complete solution and explanation.
