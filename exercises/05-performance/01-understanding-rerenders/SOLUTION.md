# Solution: Understanding Component Re-renders

## Implementation

Here's the complete solution:

```tsx
import { useState } from 'react'

function ChildA({ count }: { count: number }) {
  console.log('ChildA rendered')
  return (
    <div className="child">
      <h2>ChildA</h2>
      <p>Count: {count}</p>
    </div>
  )
}

function ChildB() {
  console.log('ChildB rendered')
  return (
    <div className="child">
      <h2>ChildB</h2>
      <p>I'm ChildB - I don't use any props</p>
    </div>
  )
}

function ChildC({ text }: { text: string }) {
  console.log('ChildC rendered')
  return (
    <div className="child">
      <h2>ChildC</h2>
      <p>Text: {text}</p>
    </div>
  )
}

export default function App() {
  console.log('Parent rendered')

  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  return (
    <div className="container">
      <h1>Understanding Re-renders</h1>

      <div className="controls">
        <button onClick={() => setCount(count + 1)}>
          Increment Count
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
      </div>

      <div className="children">
        <ChildA count={count} />
        <ChildB />
        <ChildC text={text} />
      </div>
    </div>
  )
}
```

## What You Should Observe

When you run this code and interact with it, you'll notice:

1. **On Initial Render:**
   - Console logs: "Parent rendered", "ChildA rendered", "ChildB rendered", "ChildC rendered"

2. **When Clicking the Increment Button:**
   - All four logs appear again
   - Even though ChildB and ChildC don't use the `count` prop, they still re-render

3. **When Typing in the Input:**
   - All four logs appear again for every keystroke
   - Even though ChildA and ChildB don't use the `text` prop, they still re-render

## Why This Happens

This demonstrates React's default rendering behavior:

1. **State change triggers parent re-render**: When state changes in a component, React re-renders that component
2. **Parent re-render triggers all children re-renders**: By default, when a parent re-renders, ALL of its children re-render, regardless of whether their props changed
3. **This is intentional**: React's default behavior prioritizes correctness over performance

## Key Takeaways

- **React components re-render when:**
  - Their state changes
  - Their parent re-renders
  - Their props change
  - Context they consume changes

- **By default, all children re-render when parent re-renders**, even if their props haven't changed

- **Console logs are useful** for visualizing render behavior during development

- **This is not necessarily a problem**: React is fast, and unnecessary re-renders often don't cause performance issues unless:
  - Components perform expensive calculations
  - You have many components
  - Re-renders happen very frequently

- **React DevTools** can also highlight re-renders visually (enable "Highlight updates when components render")

## What's Next

In the next exercises, you'll learn how to optimize this behavior using:
- `React.memo` - to prevent child re-renders when props haven't changed
- `useMemo` - to cache expensive calculations
- `useCallback` - to stabilize callback references

Remember: Don't optimize prematurely! Only add these optimizations when you have an actual performance problem.
