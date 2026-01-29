# Solution: useCallback for Function Memoization

## Complete Solution

```tsx
import { useState, useCallback, memo } from 'react'

type Task = {
  id: number
  text: string
  completed: boolean
}

const TaskItem = memo(function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}) {
  console.log(`TaskItem ${task.id} rendered`)

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  )
})

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  // Use useCallback to stabilize the function reference
  const toggleTask = useCallback((id: number) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }, []) // Empty deps because we use functional update

  // Use useCallback to stabilize the function reference
  const deleteTask = useCallback((id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }, []) // Empty deps because we use functional update

  // No useCallback needed - not passed to children as prop
  const addTask = () => {
    if (newTask.trim()) {
      setTasks(prev => [...prev, {
        id: Date.now(),
        text: newTask,
        completed: false
      }])
      setNewTask('')
    }
  }

  return (
    <div className="container">
      <h1>useCallback Basics</h1>
      <p>Open console and toggle tasks. Only affected task should re-render!</p>

      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  )
}
```

## Why useCallback is Needed

### The Problem

Functions in JavaScript are compared by **reference**, not by value:

```tsx
const fn1 = () => console.log('hi')
const fn2 = () => console.log('hi')

console.log(fn1 === fn2) // false! Different references
```

On every render, React recreates functions:

```tsx
function Parent() {
  const handleClick = () => {
    // This function is recreated on EVERY render
  }

  return <Child onClick={handleClick} />
}
```

Even if `Child` is wrapped with `React.memo`, it will re-render because `handleClick` is a "new" function each time.

### The Solution

`useCallback` returns the same function reference across renders (unless dependencies change):

```tsx
function Parent() {
  const handleClick = useCallback(() => {
    // This function reference stays the same across renders
  }, [])

  return <Child onClick={handleClick} />
}
```

Now `React.memo` can properly skip re-rendering `Child`.

## How useCallback Works

1. **First Render**:
   - Creates the function and caches it
   - Stores the dependencies

2. **Subsequent Renders**:
   - Compares current dependencies with cached ones
   - If unchanged, returns the cached function reference
   - If changed, creates new function and caches it

3. **Syntax**:
   ```tsx
   const memoizedCallback = useCallback(() => {
     // Function body
   }, [dependency1, dependency2])
   ```

## Functional Updates Pattern

When your callback needs to update state but doesn't need external dependencies, use functional updates:

```tsx
// WRONG: Needs tasks in dependencies
const toggleTask = useCallback((id: number) => {
  setTasks(tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  ))
}, [tasks]) // This defeats the purpose! Function changes when tasks changes

// RIGHT: Use functional update, no dependencies needed
const toggleTask = useCallback((id: number) => {
  setTasks(prev => prev.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  ))
}, []) // Empty deps! Function never changes
```

## When to Use useCallback

### Use useCallback When:

1. **Passing callbacks to memoized children**:
   ```tsx
   const MemoizedChild = memo(Child)

   // DO: Use useCallback
   const handleClick = useCallback(() => {}, [])
   <MemoizedChild onClick={handleClick} />
   ```

2. **Callback is a dependency of other hooks**:
   ```tsx
   const handleClick = useCallback(() => {}, [])

   useEffect(() => {
     // handleClick won't change, so effect runs only on mount
   }, [handleClick])
   ```

3. **Expensive function creation**:
   ```tsx
   // If creating the function itself is expensive
   const expensiveCallback = useCallback(() => {
     // Function that takes a long time to create
   }, [])
   ```

### Don't Use useCallback When:

1. **Not passed to memoized children**:
   ```tsx
   // DON'T: addTask isn't passed to memoized components
   const addTask = useCallback(() => {}, [])
   ```

2. **Inline event handlers**:
   ```tsx
   // DON'T: Unnecessary for simple inline handlers
   <button onClick={() => doSomething()} />
   ```

3. **Non-memoized children**:
   ```tsx
   // DON'T: Child isn't memoized, so no benefit
   const handleClick = useCallback(() => {}, [])
   <UnmemoizedChild onClick={handleClick} />
   ```

## useCallback + React.memo: The Power Combo

For maximum performance, combine both:

```tsx
// 1. Memoize the child component
const TaskItem = memo(function TaskItem({ task, onToggle }) {
  // Only re-renders when task or onToggle changes
})

// 2. Memoize the callback
function Parent() {
  const handleToggle = useCallback((id) => {
    // Stable function reference
  }, [])

  return <TaskItem task={task} onToggle={handleToggle} />
}
```

**Result**: `TaskItem` only re-renders when `task` changes, not when parent re-renders!

## Common Mistakes

1. **Forgetting Dependencies**:
   ```tsx
   // BUG: count is used but not in dependencies
   const handleClick = useCallback(() => {
     console.log(count)
   }, []) // Missing count!
   ```

2. **Not Using Functional Updates**:
   ```tsx
   // WRONG: tasks in dependencies defeats purpose
   const addTask = useCallback(() => {
     setTasks([...tasks, newTask])
   }, [tasks, newTask])

   // RIGHT: Use functional update
   const addTask = useCallback(() => {
     setTasks(prev => [...prev, newTask])
   }, [newTask])
   ```

3. **Using Without React.memo**:
   ```tsx
   // Pointless without memo
   const Child = ({ onClick }) => <button onClick={onClick} />

   const handleClick = useCallback(() => {}, [])
   <Child onClick={handleClick} />
   ```

4. **Over-using useCallback**:
   ```tsx
   // DON'T: Too simple, unnecessary overhead
   const increment = useCallback(() => setCount(c => c + 1), [])
   ```

## useCallback vs useMemo

They're related but serve different purposes:

```tsx
// useCallback: Memoizes a function
const handleClick = useCallback(() => {
  console.log('clicked')
}, [])

// useMemo: Memoizes a value
const expensiveValue = useMemo(() => {
  return computeExpensive()
}, [])

// useCallback is shorthand for useMemo returning a function:
const handleClick = useMemo(() => {
  return () => console.log('clicked')
}, [])
```

## Key Takeaways

- **useCallback stabilizes function references** across renders
- **Combine with React.memo** for child components to prevent re-renders
- **Use functional updates** to avoid dependencies on state
- **Dependencies must be complete** or you'll have stale closure bugs
- **Don't overuse** - only for callbacks passed to memoized children
- **Functions are compared by reference**, not value
- **Empty dependencies array** means function never changes
- **Always measure** - don't optimize prematurely

## Real-World Pattern

```tsx
// Common pattern in real applications:
function DataTable({ data }) {
  // 1. Memoize expensive computation
  const processedData = useMemo(() => {
    return data.filter(/*...*/).sort(/*...*/)
  }, [data])

  // 2. Memoize callbacks for row actions
  const handleRowClick = useCallback((id) => {
    // Handle row click
  }, [])

  const handleRowDelete = useCallback((id) => {
    // Handle row delete
  }, [])

  // 3. Pass to memoized row component
  return processedData.map(row => (
    <MemoizedRow
      key={row.id}
      row={row}
      onClick={handleRowClick}
      onDelete={handleRowDelete}
    />
  ))
}
```

This combination ensures optimal performance with large lists!
