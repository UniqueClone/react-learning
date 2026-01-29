# Solution: Context with Reducer

## Overview

This exercise demonstrates how to combine React Context API with `useReducer` for managing complex state logic. The shopping cart is a perfect example because it involves multiple related state updates (adding items, updating quantities, calculating totals) that benefit from centralized state management.

## Complete Solution

```typescript
import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import './index.css';

// Types
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== id),
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}

// Context
const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch<CartAction> | undefined>(undefined);

// Custom Hooks
export function useCart() {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
}

// Provider
function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

// Sample products
const PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 29 },
  { id: 3, name: 'Keyboard', price: 79 },
  { id: 4, name: 'Monitor', price: 299 },
];

function ProductList() {
  const dispatch = useCartDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      {PRODUCTS.map((product) => (
        <div key={product.id} className="product-card">
          <div>
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
          </div>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

function CartSummary() {
  const { items } = useCart();
  const dispatch = useCartDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (items.length === 0) {
    return (
      <div className="cart-summary">
        <h2>Shopping Cart</h2>
        <p className="empty-cart">Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-summary">
      <h2>Shopping Cart</h2>
      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-header">
            <h3>{item.name}</h3>
            <span className="cart-item-price">${item.price}</span>
          </div>
          <div className="cart-item-controls">
            <div className="quantity-controls">
              <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                -
              </button>
              <span className="quantity-text">Quantity: {item.quantity}</span>
              <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </div>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <span>Total:</span>
        <span className="cart-total-amount">${total}</span>
      </div>
      <button className="clear-cart-button" onClick={handleClearCart}>
        Clear Cart
      </button>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        <h1>Shopping Cart with Context + Reducer</h1>
        <div className="container">
          <ProductList />
          <CartSummary />
        </div>
      </div>
    </CartProvider>
  );
}
```

## Key Implementation Details

### 1. Discriminated Union for Actions

```typescript
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };
```

TypeScript's discriminated unions provide type safety and autocomplete for actions.

### 2. Reducer Pattern

The reducer handles all state transitions in one place:

- **ADD_ITEM**: Checks if item exists, increments quantity or adds new item
- **REMOVE_ITEM**: Filters out item by id
- **UPDATE_QUANTITY**: Updates quantity or removes if quantity <= 0
- **CLEAR_CART**: Resets to empty state

### 3. Split Contexts for Performance

```typescript
const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch<CartAction> | undefined>(undefined);
```

Separating state and dispatch prevents unnecessary re-renders. Components that only dispatch actions don't re-render when state changes.

### 4. Custom Hooks with Error Handling

```typescript
export function useCart() {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
```

This pattern ensures hooks are only used within the provider and provides clear error messages.

### 5. Immutable State Updates

All state updates create new objects/arrays:

```typescript
return {
  ...state,
  items: state.items.map(item =>
    item.id === action.payload.id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  ),
};
```

## Benefits of This Pattern

1. **Predictable State Updates**: All state logic is centralized in the reducer
2. **Type Safety**: TypeScript ensures correct action types and payloads
3. **Testability**: Reducer is a pure function, easy to test
4. **Scalability**: Easy to add new actions without changing component code
5. **Performance**: Split contexts prevent unnecessary re-renders
6. **Developer Experience**: Clear API through custom hooks

## Common Pitfalls to Avoid

1. **Mutating State**: Always return new objects/arrays
2. **Forgetting Edge Cases**: Handle duplicates, zero quantities, etc.
3. **Complex Nested Updates**: Keep state structure flat when possible
4. **Mixing Concerns**: Keep reducer pure, side effects go in components
5. **Over-Engineering**: Use this pattern for complex state; simple state can use useState

## When to Use Context + Reducer

Use this pattern when:
- State updates involve complex logic
- Multiple related state values need to update together
- State logic should be reusable/testable
- You need predictable state transitions
- Multiple components need to share and update state

Avoid when:
- State is simple (use useState)
- Performance is critical (consider state management libraries)
- State updates are independent (multiple useState hooks)
- Only one component needs the state (lift state up instead)

## Key Takeaways

1. **Context + Reducer** is ideal for complex, shared state with predictable updates
2. **Discriminated unions** provide excellent TypeScript support for actions
3. **Split contexts** (state/dispatch) optimize performance
4. **Custom hooks** provide clean API and error handling
5. **Reducer pattern** centralizes state logic for better maintainability
6. This pattern scales well for medium-complexity applications
7. Consider more advanced solutions (Zustand, Redux) for very large apps
