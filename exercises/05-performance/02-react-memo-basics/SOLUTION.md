# Solution: React.memo for Component Memoization

## The Problem

The `TodoItem` component was re-rendering every time the parent component re-rendered, even when the individual todo item's props hadn't changed. This meant:

- Toggling one todo caused ALL todos to re-render
- Typing in the input field caused ALL todos to re-render
- This creates unnecessary work for React and can hurt performance with large lists

## The Fix

Wrap the `TodoItem` component with `React.memo`:

```tsx
import { useState, memo } from 'react'

// Option 1: Wrap in the declaration
const TodoItem = memo(function TodoItem({
  todo,
  onToggle
}: {
  todo: { id: number; text: string; completed: boolean }
  onToggle: (id: number) => void
}) {
  console.log(`TodoItem ${todo.id} rendered`)

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
    </div>
  )
})

// Option 2: Export as memoized
function TodoItemComponent({
  todo,
  onToggle
}: {
  todo: { id: number; text: string; completed: boolean }
  onToggle: (id: number) => void
}) {
  console.log(`TodoItem ${todo.id} rendered`)

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
    </div>
  )
}

const TodoItem = memo(TodoItemComponent)

export default function App() {
  // ... rest of the component stays the same
}
```

## How React.memo Works

1. **Shallow Comparison**: `React.memo` wraps your component and performs a shallow comparison of props before each render

2. **Skip Re-render**: If props haven't changed (shallow equality check), React skips re-rendering the component and reuses the last rendered result

3. **Default Behavior**: By default, it compares all props using `Object.is()` comparison

4. **Custom Comparison**: You can provide a custom comparison function as a second argument:
   ```tsx
   const TodoItem = memo(TodoItemComponent, (prevProps, nextProps) => {
     // Return true if props are equal (skip render)
     // Return false if props are different (re-render)
     return prevProps.todo.id === nextProps.todo.id &&
            prevProps.todo.completed === nextProps.todo.completed
   })
   ```

## What You Should Observe

After applying `React.memo`:

1. **Initial Render**: All items log once
2. **Toggle One Todo**: Only that one item logs a render
3. **Type in Input**: No todo items re-render (because their props didn't change)
4. **Add New Todo**: Only the new item renders

## When to Use React.memo

Use `React.memo` when:
- Component renders often with the same props
- Component is expensive to render
- Component receives object/array props that are stable
- You've measured and confirmed there's a performance issue

Don't use `React.memo` when:
- Component always renders with different props
- Component is simple/cheap to render
- Props change frequently
- You haven't measured a performance problem

## Important Caveats

### Problem: Functions are recreated every render

Notice that `onToggle` is recreated on every parent render. This means the `TodoItem` will still re-render because the function reference changes! To fix this, you'll need `useCallback` (covered in a later exercise).

However, in this case, React.memo still works because the `toggleTodo` function creates a **new** array each time, causing all items to receive new props anyway. The real optimization comes from not re-rendering when typing in the input field.

### Shallow Comparison Gotcha

```tsx
// This WON'T work well with React.memo
<TodoItem todo={{ id: 1, text: 'Hi' }} />  // New object every render!

// This WILL work
const todo = { id: 1, text: 'Hi' }  // Stable reference
<TodoItem todo={todo} />
```

## Key Takeaways

- **React.memo prevents re-renders when props are the same** (using shallow comparison)
- **Check console logs** to verify memoization is working
- **React.memo is a performance optimization**, not a semantic guarantee
- **Use sparingly** - don't wrap every component by default
- **Measure first** - only optimize when there's an actual performance problem
- **Props must be stable** for memoization to work effectively
- **Combine with useCallback and useMemo** for best results (next exercises!)

## Common Mistakes

1. **Over-memoizing**: Wrapping every component by default adds overhead
2. **Forgetting about functions**: Function props change every render unless wrapped in `useCallback`
3. **Forgetting about objects**: Object props need to be stable or you need custom comparison
4. **Not measuring**: Always profile before and after to verify the optimization helps
