import { useState } from 'react'

// Shopping cart with bugs - fix the array mutations!

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export default function App() {
  const [items, setItems] = useState<CartItem[]>([])
  const [nextId, setNextId] = useState(1)

  // BUG: Using push() mutates the array
  const addItem = (name: string, price: number) => {
    const newItem: CartItem = {
      id: nextId,
      name,
      price,
      quantity: 1
    }
    items.push(newItem)
    setItems(items)  // Same reference - React won't detect change!
    setNextId(nextId + 1)
  }

  // BUG: Using splice() mutates the array
  const removeItem = (id: number) => {
    const index = items.findIndex(item => item.id === id)
    if (index !== -1) {
      items.splice(index, 1)
      setItems(items)  // Same reference again!
    }
  }

  // BUG: Directly mutating item properties
  const updateQuantity = (id: number, quantity: number) => {
    const item = items.find(item => item.id === id)
    if (item) {
      item.quantity = quantity  // Direct mutation!
      setItems(items)  // Same reference!
    }
  }

  // BUG: Not creating a new array
  const clearCart = () => {
    items.length = 0  // Mutation!
    setItems(items)  // Same reference!
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h1>Shopping Cart</h1>

      <div>
        <h2>Add Item</h2>
        <button onClick={() => addItem('Apple', 1.99)}>
          Add Apple ($1.99)
        </button>
        <button onClick={() => addItem('Banana', 0.99)}>
          Add Banana ($0.99)
        </button>
        <button onClick={() => addItem('Orange', 2.49)}>
          Add Orange ($2.49)
        </button>
      </div>

      <div>
        <h2>Cart Items ({items.length})</h2>
        {items.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            <ul>
              {items.map(item => (
                <li key={item.id}>
                  {item.name} - ${item.price} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <p>
              <strong>Total: ${total.toFixed(2)}</strong>
            </p>
            <button onClick={clearCart}>Clear Cart</button>
          </>
        )}
      </div>
    </div>
  )
}
