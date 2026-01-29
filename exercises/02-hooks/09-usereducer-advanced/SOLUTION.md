# Solution: useReducer - Advanced

## The Bugs and Fixes

### Bug 1: Incomplete CartAction Type

**Problem:**
```typescript
// Missing REMOVE_ITEM and UPDATE_QUANTITY
type CartAction =
  | { type: 'ADD_ITEM'; item: Omit<CartItem, 'quantity'> }
  | { type: 'CLEAR_CART' }
```

**Fix:**
```typescript
type CartAction =
  | { type: 'ADD_ITEM'; item: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'UPDATE_QUANTITY'; id: number; quantity: number }
  | { type: 'CLEAR_CART' }
```

### Bug 2: Mutating State in ADD_ITEM

**Problem:**
```typescript
case 'ADD_ITEM':
  const existingItem = state.items.find(item => item.id === action.item.id)
  if (existingItem) {
    existingItem.quantity += 1  // BUG: Mutates state!
    return state
  } else {
    state.items.push({ ...action.item, quantity: 1 })  // BUG: Mutates array!
    return state
  }
```

**Fix:**
```typescript
case 'ADD_ITEM':
  const existingItem = state.items.find(item => item.id === action.item.id)
  if (existingItem) {
    return {
      ...state,
      items: state.items.map(item =>
        item.id === action.item.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }
  } else {
    return {
      ...state,
      items: [...state.items, { ...action.item, quantity: 1 }]
    }
  }
```

### Bug 3 & 4: Missing REMOVE_ITEM and UPDATE_QUANTITY Cases

**Add these cases:**
```typescript
case 'REMOVE_ITEM':
  return {
    ...state,
    items: state.items.filter(item => item.id !== action.id)
  }

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

### Bug 5: Missing Default Case

**Add:**
```typescript
default:
  return state
```

### Bug 6: Wrong Total Calculation

**Problem:**
```typescript
const total = state.items.length * 10  // Wrong!
```

**Fix:**
```typescript
const total = state.items.reduce((sum, item) => {
  return sum + (item.price * item.quantity)
}, 0)
```

## Complete Fixed Solution

```typescript
import { useReducer } from 'react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; item: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'UPDATE_QUANTITY'; id: number; quantity: number }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: [],
  total: 0,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find((item) => item.id === action.item.id)

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.item, quantity: 1 }],
        }
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      }

    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.id),
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (id: number, name: string, price: number) => {
    dispatch({ type: 'ADD_ITEM', item: { id, name, price } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', id })
  }

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const total = state.items.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  return (
    <div>
      <h1>Shopping Cart</h1>

      <div>
        <h2>Available Products</h2>
        <button onClick={() => addItem(1, 'Widget', 9.99)}>Add Widget ($9.99)</button>
        <button onClick={() => addItem(2, 'Gadget', 19.99)}>Add Gadget ($19.99)</button>
        <button onClick={() => addItem(3, 'Doohickey', 14.99)}>Add Doohickey ($14.99)</button>
      </div>

      <div>
        <h2>Cart Items</h2>
        {state.items.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            <ul>
              {state.items.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <p>Total: ${total.toFixed(2)}</p>
            <button onClick={clearCart}>Clear Cart</button>
          </>
        )}
      </div>
    </div>
  )
}
```

## Key Lessons

### 1. Immutability is Critical

**Never** directly mutate state in reducers:
```typescript
// BAD
existingItem.quantity += 1
state.items.push(newItem)

// GOOD
{ ...item, quantity: item.quantity + 1 }
[...state.items, newItem]
```

### 2. Array Methods for Immutable Updates

- **Add**: `[...array, newItem]`
- **Update**: `array.map(item => condition ? { ...item, changes } : item)`
- **Remove**: `array.filter(item => item.id !== idToRemove)`

### 3. Default Case Required

Always include default case to handle unknown actions gracefully.

### 4. TypeScript Discriminated Unions

Complete union type ensures all actions are type-checked and prevents runtime errors.

## Further Learning

- **Immer library**: Simplifies immutable updates
- **Redux patterns**: Similar principles but for global state
- **Normalized state**: For complex nested data
- **useImmerReducer**: Combines useReducer with Immer
