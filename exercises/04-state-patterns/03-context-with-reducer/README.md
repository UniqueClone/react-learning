# Context with Reducer

**Difficulty:** Intermediate
**Type:** Complete Missing Code
**Estimated Time:** 30-35 minutes

## Challenge

Build a shopping cart system using Context API combined with useReducer for complex state management. This pattern is ideal when state updates involve multiple related changes or complex logic.

The starter code provides the basic structure, but you need to complete the reducer logic, context setup, and cart operations.

## Requirements

Your implementation must:
- Create a CartContext using createContext and useReducer
- Implement a cart reducer with actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART
- Provide cart state and dispatch through context
- Create custom hooks (useCart, useCartDispatch) for clean API
- Display cart items with quantities and total price
- Handle edge cases (negative quantities, duplicates, etc.)
- Calculate cart totals correctly

## Learning Objectives

- Combine Context API with useReducer for complex state
- Understand reducer pattern for predictable state updates
- Learn separation of concerns (state vs dispatch contexts)
- Practice TypeScript with discriminated unions for actions
- Master compound state management patterns

## Instructions

1. Run `pnpm install` to install dependencies
2. Review the starter code and identify missing pieces
3. Complete the reducer function with all action types
4. Implement the CartProvider component
5. Create custom hooks for accessing cart state
6. Complete the Cart UI components
7. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Reducer handles all cart actions correctly
- [ ] Items can be added, removed, and quantity updated
- [ ] Cart total calculates correctly
- [ ] Duplicate items increase quantity instead of adding new entry
- [ ] Clear cart removes all items
- [ ] All 10 tests pass

## Hints

<details>
<summary>Hint 1: Reducer Structure</summary>

```typescript
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if item exists, update quantity or add new
    case 'REMOVE_ITEM':
      // Filter out item by id
    case 'UPDATE_QUANTITY':
      // Update specific item quantity
    case 'CLEAR_CART':
      // Return empty cart
  }
}
```
</details>

<details>
<summary>Hint 2: Split Contexts</summary>

For better performance, split state and dispatch into separate contexts:

```typescript
const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch<CartAction> | undefined>(undefined);
```
</details>

<details>
<summary>Hint 3: Calculate Total</summary>

Use reduce to calculate cart total:

```typescript
const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
```
</details>

## Solution

Once you've completed the exercise, check SOLUTION.md for the complete implementation and detailed explanations.
