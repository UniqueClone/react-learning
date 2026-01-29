# Solution: Fix the Broken Counter

## The Bugs

### Bug 1: Increment Function
```typescript
// BROKEN
const increment = setCount(count + 1)
```
This immediately calls `setCount` and assigns the result to `increment`. The button won't work because `increment` is not a function.

### Bug 2: Decrement Function
```typescript
// BROKEN
const decrement = () => {
  setCount(count - 1)
}
```
This uses the `count` variable directly, which can lead to stale closure issues when clicking rapidly.

### Bug 3: Reset Function
```typescript
// BROKEN
const reset = () => {
  setCount(undefined as any)
}
```
Sets count to `undefined` instead of `0`.

### Bug 4: Double Function
```typescript
// BROKEN
const double = () => {
  setCount(count * 2)
}
```
Same issue as decrement - uses stale closure value.

## The Fixes

### Fix 1: Increment
```typescript
// FIXED
const increment = () => {
  setCount(count + 1)
}
```
Wrap in an arrow function so it's called when the button is clicked.

### Fix 2: Decrement
```typescript
// FIXED
const decrement = () => {
  setCount(prev => prev - 1)
}
```
Use functional update to get the latest value.

### Fix 3: Reset
```typescript
// FIXED
const reset = () => {
  setCount(0)
}
```
Reset to 0, not undefined.

### Fix 4: Double
```typescript
// FIXED
const double = () => {
  setCount(prev => prev * 2)
}
```
Use functional update to get the latest value.

## Complete Solution

```typescript
import { useState } from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(prev => prev - 1)
  }

  const reset = () => {
    setCount(0)
  }

  const double = () => {
    setCount(prev => prev * 2)
  }

  return (
    <div className="counter">
      <h1>Counter: {count}</h1>
      <div className="buttons">
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
        <button onClick={double}>Double</button>
      </div>
    </div>
  )
}
```

## Key Takeaways

1. **Event handlers need to be functions**: Use `onClick={increment}` not `onClick={increment()}`
2. **Functional updates**: When the new state depends on the old state, use `setState(prev => prev + 1)`
3. **Type correctness**: Don't set state to `undefined` when it should be a number
4. **Stale closures**: Functional updates prevent bugs from stale closure values
