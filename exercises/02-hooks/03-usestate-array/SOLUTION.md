# Solution: useState with Arrays - Shopping Cart

## The Bugs

### Bug 1: Adding Items with push()
```typescript
// BROKEN
items.push(newItem)
setItems(items)
```
The `push()` method mutates the original array. Even though we call `setItems()`, we're passing the same array reference, so React doesn't detect the change.

### Bug 2: Removing Items with splice()
```typescript
// BROKEN
items.splice(index, 1)
setItems(items)
```
The `splice()` method also mutates the array in place. Same reference = no re-render.

### Bug 3: Updating Quantity with Direct Mutation
```typescript
// BROKEN
const item = items.find(item => item.id === id)
if (item) {
  item.quantity = quantity
  setItems(items)
}
```
Modifying `item.quantity` directly mutates the object inside the array. Even though items are objects, React won't detect this nested change.

### Bug 4: Clearing Cart with length = 0
```typescript
// BROKEN
items.length = 0
setItems(items)
```
Setting `length = 0` mutates the array. Same reference again!

## The Fixes

### Fix 1: Adding Items
```typescript
// FIXED - Use spread operator
const addItem = (name: string, price: number) => {
  const newItem: CartItem = {
    id: nextId,
    name,
    price,
    quantity: 1
  }
  setItems([...items, newItem])
  setNextId(nextId + 1)
}

// Alternative: Use concat
setItems(items.concat(newItem))
```

### Fix 2: Removing Items
```typescript
// FIXED - Use filter
const removeItem = (id: number) => {
  setItems(items.filter(item => item.id !== id))
}
```

### Fix 3: Updating Quantity
```typescript
// FIXED - Use map
const updateQuantity = (id: number, quantity: number) => {
  setItems(items.map(item =>
    item.id === id
      ? { ...item, quantity }
      : item
  ))
}
```

### Fix 4: Clearing Cart
```typescript
// FIXED - Set to new empty array
const clearCart = () => {
  setItems([])
}
```

## Complete Solution

```typescript
import { useState } from 'react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export default function App() {
  const [items, setItems] = useState<CartItem[]>([])
  const [nextId, setNextId] = useState(1)

  const addItem = (name: string, price: number) => {
    const newItem: CartItem = {
      id: nextId,
      name,
      price,
      quantity: 1
    }
    setItems([...items, newItem])
    setNextId(nextId + 1)
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity }
        : item
    ))
  }

  const clearCart = () => {
    setItems([])
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
```

## Immutable Array Operations Reference

### Adding Elements
```typescript
// At the end
setArray([...array, newItem])
setArray(array.concat(newItem))

// At the beginning
setArray([newItem, ...array])

// At specific index
setArray([
  ...array.slice(0, index),
  newItem,
  ...array.slice(index)
])
```

### Removing Elements
```typescript
// By filter
setArray(array.filter(item => item.id !== id))

// By index
setArray(array.filter((_, i) => i !== index))

// Using slice
setArray([
  ...array.slice(0, index),
  ...array.slice(index + 1)
])
```

### Updating Elements
```typescript
// Update one item
setArray(array.map(item =>
  item.id === targetId
    ? { ...item, property: newValue }
    : item
))

// Update by index
setArray(array.map((item, i) =>
  i === index
    ? { ...item, property: newValue }
    : item
))
```

### Replacing Array
```typescript
// Complete replacement
setArray(newArray)

// Clear array
setArray([])
```

## Why Immutability Matters

React uses reference equality to detect changes:

```typescript
// Same reference - NO re-render
const arr = [1, 2, 3]
arr.push(4)
setArray(arr)  // ❌ arr === arr (same reference)

// New reference - YES re-render
const arr = [1, 2, 3]
setArray([...arr, 4])  // ✅ [1,2,3,4] !== arr (new reference)
```

## Common Array Mutation Methods to Avoid

These methods mutate the original array:
- `push()` - adds to end
- `pop()` - removes from end
- `shift()` - removes from start
- `unshift()` - adds to start
- `splice()` - adds/removes at index
- `reverse()` - reverses in place
- `sort()` - sorts in place

## Safe Immutable Alternatives

These methods return new arrays:
- `concat()` - combines arrays
- `slice()` - extracts portion
- `map()` - transforms elements
- `filter()` - removes elements
- `reduce()` - reduces to value
- Spread operator `[...]`

## Key Takeaways

1. **Never mutate arrays in state**: Always create new arrays
2. **Spread operator is your friend**: `[...array, newItem]` creates a new array
3. **map() for updates**: Transform items while creating new array
4. **filter() for removal**: Remove items while creating new array
5. **Reference equality matters**: React compares references, not contents
6. **Nested objects need spreading too**: `{ ...item, quantity }` creates new object

## Advanced: Why Not Just Clone?

You might think: "Why not just clone the array?"

```typescript
// This works but is inefficient
setItems([...items])
items.push(newItem)  // Still wrong! Mutates original before clone

// Or
setItems(JSON.parse(JSON.stringify(items)))  // Slow and breaks functions/dates
```

The immutable operations (map, filter, etc.) are both correct AND performant.
