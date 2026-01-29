// Fix the buggy shopping cart implementation
// See README.md for bug descriptions and tests for expected behavior

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

// BUG: Missing action types in this union
type CartAction =
  | { type: 'ADD_ITEM'; item: Omit<CartItem, 'quantity'> }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: [],
  total: 0,
}

// BUG: Missing cases, mutations, and incorrect logic
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find((item) => item.id === action.item.id)

      if (existingItem) {
        // BUG: Mutating state directly
        existingItem.quantity += 1
        return state
      } else {
        // BUG: Mutating array directly
        state.items.push({ ...action.item, quantity: 1 })
        return state
      }

    // BUG: REMOVE_ITEM case is missing entirely

    // BUG: UPDATE_QUANTITY case is missing entirely

    case 'CLEAR_CART':
      return initialState

    // BUG: Missing default case
  }
}

export default function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (id: number, name: string, price: number) => {
    dispatch({ type: 'ADD_ITEM', item: { id, name, price } })
  }

  const removeItem = (id: number) => {
    // BUG: This action type doesn't exist in CartAction
    dispatch({ type: 'REMOVE_ITEM', id } as any)
  }

  const updateQuantity = (id: number, quantity: number) => {
    // BUG: This action type doesn't exist in CartAction
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity } as any)
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  // BUG: Total not calculated correctly (should sum all items)
  const total = state.items.length * 10

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
