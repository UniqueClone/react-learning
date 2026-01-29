import { useState } from 'react'
import './App.css'

// This counter has several bugs - fix them!
export default function App() {
  const [count, setCount] = useState(0)

  // BUG: Missing function call parentheses - this sets count to the result immediately
  const increment = setCount(count + 1)

  // BUG: Not using functional update - will use stale count value
  const decrement = () => {
    setCount(count - 1)
  }

  // BUG: Resetting to undefined instead of 0
  const reset = () => {
    setCount(undefined as any)
  }

  // BUG: Not using functional update
  const double = () => {
    setCount(count * 2)
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
