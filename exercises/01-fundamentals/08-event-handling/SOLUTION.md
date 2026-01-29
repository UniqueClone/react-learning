# Solution: Event Handling Deep Dive

## The Bugs

This exercise contained 5 common event handling bugs in React:

1. **Form submission caused page reload** - Missing `preventDefault()`
2. **Link navigation occurred** - Missing `preventDefault()`
3. **Event bubbling caused unwanted side effects** - Missing `stopPropagation()`
4. **Function called immediately instead of on click** - Incorrect event handler binding
5. **Wrong event type used** - Used `onClick` instead of `onDoubleClick`

## The Fixes

### Bug 1: Form Submission

**❌ Broken:**
```typescript
const handleSubmit = (e: React.FormEvent) => {
  // Missing preventDefault()
  setMessage('Form submitted successfully!')
}
```

**✅ Fixed:**
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault() // Prevents page reload
  setMessage('Form submitted successfully!')
}
```

**Why:** By default, form submission causes a page reload. `preventDefault()` stops this browser default behavior so we can handle it with JavaScript.

---

### Bug 2: Link Navigation

**❌ Broken:**
```typescript
const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  // Missing preventDefault()
  setMessage('Link clicked (but not navigated)')
}
```

**✅ Fixed:**
```typescript
const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault() // Prevents navigation
  setMessage('Link clicked (but not navigated)')
}
```

**Why:** Links navigate by default. `preventDefault()` stops the navigation so we can implement custom behavior.

---

### Bug 3: Event Bubbling

**❌ Broken:**
```typescript
const handleInnerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // Missing stopPropagation()
  setMessage('Inner button clicked')
}
```

**✅ Fixed:**
```typescript
const handleInnerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation() // Stops event from bubbling to parent
  setMessage('Inner button clicked')
}
```

**Why:** Events bubble up the DOM tree by default. Without `stopPropagation()`, the outer div's click handler also fires, showing "Outer div clicked" instead.

---

### Bug 4: Function Called Immediately

**❌ Broken:**
```typescript
<button onClick={handleDelete(index)}>
  Delete
</button>
```

**✅ Fixed:**
```typescript
<button onClick={() => handleDelete(index)}>
  Delete
</button>
```

**Why:** `onClick={handleDelete(index)}` calls the function immediately during render. The parentheses execute it right away! We need to pass a function reference, not call it. Wrap it in an arrow function so it only runs on click.

**Alternative fixes:**
```typescript
// Option 1: Arrow function
onClick={() => handleDelete(index)}

// Option 2: Bind
onClick={handleDelete.bind(null, index)}

// Option 3: Separate handler
const handleClick = () => handleDelete(index)
onClick={handleClick}
```

---

### Bug 5: Wrong Event Type

**❌ Broken:**
```typescript
<div onClick={handleDoubleClick}>
  Double-click me! Count: {clickCount}
</div>
```

**✅ Fixed:**
```typescript
<div onDoubleClick={handleDoubleClick}>
  Double-click me! Count: {clickCount}
</div>
```

**Why:** `onClick` fires on every click. For double-clicks, use `onDoubleClick` which only fires when the user clicks twice quickly.

---

## Complete Solution

```typescript
import { useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('')
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])
  const [clickCount, setClickCount] = useState(0)

  // Fix 1: Add preventDefault to prevent page reload
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Form submitted successfully!')
  }

  // Fix 2: Add preventDefault to prevent navigation
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMessage('Link clicked (but not navigated)')
  }

  const handleOuterClick = () => {
    setMessage('Outer div clicked')
  }

  // Fix 3: Add stopPropagation to prevent bubbling
  const handleInnerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setMessage('Inner button clicked')
  }

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
    setMessage(`Deleted item ${index + 1}`)
  }

  const handleDoubleClick = () => {
    setClickCount(clickCount + 1)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Event Handling Bugs</h1>

      {message && (
        <div
          style={{
            padding: '12px',
            marginBottom: '20px',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
          }}
        >
          {message}
        </div>
      )}

      {/* Fix 1: Form with preventDefault */}
      <section style={{ marginBottom: '24px' }}>
        <h2>Bug 1: Form Submission</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter some text"
            style={{ padding: '8px', marginRight: '8px' }}
          />
          <button type="submit">Submit Form</button>
        </form>
      </section>

      {/* Fix 2: Link with preventDefault */}
      <section style={{ marginBottom: '24px' }}>
        <h2>Bug 2: Link Click</h2>
        <a href="https://example.com" onClick={handleLinkClick}>
          Click this link (should not navigate)
        </a>
      </section>

      {/* Fix 3: Button with stopPropagation */}
      <section style={{ marginBottom: '24px' }}>
        <h2>Bug 3: Event Bubbling</h2>
        <div
          onClick={handleOuterClick}
          style={{
            padding: '20px',
            backgroundColor: '#f0f0f0',
            border: '2px solid #ccc',
            borderRadius: '4px',
          }}
        >
          Outer Div (clickable)
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleInnerClick}>
              Inner Button (should NOT trigger outer click)
            </button>
          </div>
        </div>
      </section>

      {/* Fix 4: Proper function binding */}
      <section style={{ marginBottom: '24px' }}>
        <h2>Bug 4: Delete Buttons</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              {item}
              <button
                onClick={() => handleDelete(index)}
                style={{ marginLeft: '10px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Fix 5: Use onDoubleClick instead of onClick */}
      <section style={{ marginBottom: '24px' }}>
        <h2>Bug 5: Double-Click</h2>
        <div
          onDoubleClick={handleDoubleClick}
          style={{
            padding: '20px',
            backgroundColor: '#e3f2fd',
            border: '2px solid #2196f3',
            borderRadius: '4px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          Double-click me! Count: {clickCount}
        </div>
      </section>
    </div>
  )
}
```

## Key Concepts

### 1. preventDefault()

Stops the default browser behavior for an event.

**Common use cases:**
```typescript
// Prevent form submission
<form onSubmit={(e) => { e.preventDefault(); /* handle */ }}>

// Prevent link navigation
<a onClick={(e) => { e.preventDefault(); /* handle */ }}>

// Prevent context menu
<div onContextMenu={(e) => { e.preventDefault(); /* handle */ }}>

// Prevent drag default behavior
<div onDragStart={(e) => { e.preventDefault(); /* handle */ }}>
```

### 2. stopPropagation()

Stops the event from bubbling up to parent elements.

**Event Bubbling:**
```
Button Click → Parent Div → Grandparent → ... → Document
```

Without `stopPropagation()`, all handlers in the chain fire.

**Example:**
```typescript
<div onClick={() => console.log('parent')}>
  <button onClick={(e) => {
    e.stopPropagation()
    console.log('child')
  }}>
    Click
  </button>
</div>
// Only logs "child", not "parent"
```

### 3. Proper Event Handler Binding

**❌ Calls immediately:**
```typescript
onClick={handleClick()}        // Executes on render
onClick={handleClick(arg)}     // Executes on render
```

**✅ Passes reference:**
```typescript
onClick={handleClick}          // Passes function reference
onClick={() => handleClick()}  // Arrow function
onClick={(e) => handleClick(e, arg)} // With arguments
```

### 4. React Synthetic Events

React wraps native browser events in `SyntheticEvent` objects for cross-browser compatibility.

**Important:**
- Event objects are pooled and reused (nullified after handler)
- To access event properties asynchronously, call `e.persist()`
- Or save values to variables:
  ```typescript
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value // Save value
    setTimeout(() => {
      console.log(value) // Use saved value
    }, 1000)
  }
  ```

### 5. Common Event Types

```typescript
// Mouse Events
onClick, onDoubleClick, onMouseEnter, onMouseLeave

// Form Events
onChange, onSubmit, onFocus, onBlur

// Keyboard Events
onKeyDown, onKeyUp, onKeyPress

// Drag Events
onDragStart, onDrop, onDragOver

// Touch Events (mobile)
onTouchStart, onTouchEnd, onTouchMove
```

## Common Mistakes

### ❌ Forgetting preventDefault
```typescript
const handleSubmit = (e: React.FormEvent) => {
  // Page reloads!
  console.log('submitted')
}
```

### ✅ Adding preventDefault
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  console.log('submitted')
}
```

---

### ❌ Calling function immediately
```typescript
<button onClick={handleClick()}>Click</button>
// Runs on render, not on click!
```

### ✅ Passing function reference
```typescript
<button onClick={handleClick}>Click</button>
<button onClick={() => handleClick()}>Click</button>
```

---

### ❌ Not handling bubbling
```typescript
<div onClick={handleOuter}>
  <button onClick={handleInner}>Click</button>
</div>
// Both handlers fire!
```

### ✅ Stopping propagation when needed
```typescript
<div onClick={handleOuter}>
  <button onClick={(e) => {
    e.stopPropagation()
    handleInner()
  }}>Click</button>
</div>
```

---

### ❌ Accessing event asynchronously
```typescript
const handleClick = (e: React.MouseEvent) => {
  setTimeout(() => {
    console.log(e.target) // null! Event pooled
  }, 1000)
}
```

### ✅ Saving values or using persist
```typescript
const handleClick = (e: React.MouseEvent) => {
  const target = e.target // Save reference
  setTimeout(() => {
    console.log(target) // Works!
  }, 1000)
}
```

## When to Use Each

### preventDefault()
- Preventing form submission
- Preventing link navigation
- Preventing default drag/drop behavior
- Preventing context menu
- Custom keyboard shortcuts

### stopPropagation()
- Nested clickable elements
- Modal backdrop clicks
- Dropdown menus
- Nested forms or buttons
- Any nested interactive elements

### Both
Sometimes you need both:
```typescript
const handleClick = (e: React.MouseEvent) => {
  e.preventDefault()    // Don't navigate
  e.stopPropagation()   // Don't trigger parent
  // Your logic
}
```

## Key Takeaways

1. **preventDefault()** stops browser default behavior (navigation, submission, etc.)
2. **stopPropagation()** stops events from bubbling to parents
3. **Pass function references**, don't call them: `onClick={handler}` not `onClick={handler()}`
4. **Use arrow functions** when you need to pass arguments: `onClick={() => handler(arg)}`
5. **Choose the right event** - `onClick` vs `onDoubleClick`, `onChange` vs `onInput`, etc.
6. **Synthetic events** are pooled - save values if accessing asynchronously
7. **Understand bubbling** - events propagate up the tree by default

## Further Practice

- Add keyboard event handling (Enter to submit, Escape to close)
- Implement drag and drop functionality
- Create a custom right-click context menu
- Handle touch events for mobile
- Implement event delegation patterns
- Build a modal that closes on backdrop click but not content click
- Create keyboard shortcuts (Ctrl+S to save, etc.)
