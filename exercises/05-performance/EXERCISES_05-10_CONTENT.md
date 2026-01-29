# Performance Exercises 05-10 - Complete Content Guide

This document contains all the complete content for exercises 05-10. Use this as a reference to update the individual exercise files.

---

## Exercise 05: Memoization Patterns (Fix Broken, Advanced, 30-35 min)

### App.tsx (Broken Code with TODOs)
```tsx
import { useState, useMemo, useCallback, memo } from 'react'

// BUG 1: Over-memoization - This simple component doesn't need memo
// TODO: Remove React.memo from this component (it's too simple to benefit)
const Header = memo(function Header({ title }: { title: string }) {
  return <h1>{title}</h1>
})

// BUG 2: Under-memoization - This expensive list item needs memo
// TODO: Wrap this component with React.memo
function ListItem({
  item,
  onToggle
}: {
  item: { id: number; text: string; completed: boolean }
  onToggle: (id: number) => void
}) {
  console.log(`ListItem ${item.id} rendered`)

  // Simulate expensive render
  let i = 0
  while (i < 1000000) i++

  return (
    <div className="list-item">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
      />
      <span>{item.text}</span>
    </div>
  )
}

// BUG 3: Over-memoization - Memoizing primitive calculations
// TODO: Remove useMemo from this simple calculation
function SimpleCounter({ count }: { count: number }) {
  const doubled = useMemo(() => count * 2, [count]) // Unnecessary!
  return <div>Count doubled: {doubled}</div>
}

export default function App() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', completed: false },
    { id: 2, text: 'Item 2', completed: false },
    { id: 3, text: 'Item 3', completed: false },
    { id: 4, text: 'Item 4', completed: false },
    { id: 5, text: 'Item 5', completed: false },
  ])
  const [count, setCount] = useState(0)
  const [filter, setFilter] = useState('')

  // BUG 4: Missing useCallback - function recreated every render
  // TODO: Wrap this with useCallback
  const toggleItem = (id: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  // BUG 5: Wrong dependencies - filter is missing
  // TODO: Add 'filter' to the dependency array
  const filteredItems = useMemo(() => {
    console.log('Filtering items...')
    return items.filter(item =>
      item.text.toLowerCase().includes(filter.toLowerCase())
    )
  }, [items]) // Missing filter!

  return (
    <div className="container">
      <Header title="Memoization Patterns" />

      <div className="controls">
        <button onClick={() => setCount(count + 1)}>
          Increment Count: {count}
        </button>
        <input
          type="text"
          placeholder="Filter items..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <SimpleCounter count={count} />

      <div className="list">
        {filteredItems.map(item => (
          <ListItem
            key={item.id}
            item={item}
            onToggle={toggleItem}
          />
        ))}
      </div>
    </div>
  )
}
```

### SOLUTION.md Summary
**Fixes:**
1. Remove `memo` from Header (too simple)
2. Add `memo` to ListItem (expensive)
3. Remove `useMemo` from SimpleCounter (trivial calculation)
4. Add `useCallback` to toggleItem
5. Add `filter` to filteredItems dependencies

---

## Exercise 06: Code Splitting Basics (Build From Scratch, Intermediate, 25-30 min)

### App.tsx (Guidance Only)
```tsx
// TODO: Import lazy and Suspense from React
// TODO: Import React Router components (BrowserRouter, Routes, Route, Link)

// TODO: Create lazy-loaded components:
// const Home = lazy(() => import('./pages/Home'))
// const About = lazy(() => import('./pages/About'))
// const Dashboard = lazy(() => import('./pages/Dashboard'))

export default function App() {
  return (
    // TODO: Wrap app with BrowserRouter
    <div>
      <h1>Code Splitting Basics</h1>

      <nav>
        {/* TODO: Add Links to /, /about, /dashboard */}
      </nav>

      {/* TODO: Wrap Routes with Suspense fallback=<div>Loading...</div> */}
      {/* TODO: Add Route components for each page */}
    </div>
  )
}
```

### Pages to create:
- `src/pages/Home.tsx`: Simple home page
- `src/pages/About.tsx`: About page
- `src/pages/Dashboard.tsx`: Dashboard with heavy component

### package.json addition:
```json
"react-router-dom": "^6.20.0"
```

---

## Exercise 07: Lazy Loading Images (Complete Missing, Intermediate, 25-30 min)

### App.tsx (Partial Code)
```tsx
import { useState, useEffect, useRef } from 'react'

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // TODO: Create IntersectionObserver
    // TODO: Observe the image element
    // TODO: Set isInView to true when image enters viewport
    // TODO: Cleanup observer on unmount
  }, [])

  useEffect(() => {
    // TODO: If isInView is true, load the actual image
    // TODO: Set isLoaded when image loads
  }, [isInView, src])

  return (
    <div className="lazy-image-container">
      <img
        ref={imgRef}
        src={isInView ? src : ''}
        alt={alt}
        className={isLoaded ? 'loaded' : 'loading'}
      />
      {!isLoaded && <div className="placeholder">Loading...</div>}
    </div>
  )
}

export default function App() {
  // Array of 50 image URLs from placeholder service
  const images = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    src: `https://picsum.photos/300/200?random=${i}`,
    alt: `Image ${i + 1}`
  }))

  return (
    <div className="container">
      <h1>Lazy Loading Images</h1>
      <p>Scroll down to load images as they enter viewport</p>

      <div className="image-gallery">
        {images.map(img => (
          <LazyImage key={img.id} src={img.src} alt={img.alt} />
        ))}
      </div>
    </div>
  )
}
```

---

## Exercise 08: Virtualization (Build From Scratch, Advanced, 30-35 min)

### package.json addition:
```json
"react-window": "^1.8.10"
```

### App.tsx (Guidance Only)
```tsx
// TODO: Import FixedSizeList from 'react-window'

// TODO: Generate 10,000 items
// const items = Array.from({ length: 10000 }, (_, i) => ({
//   id: i,
//   title: `Item ${i + 1}`,
//   description: `Description for item ${i + 1}`
// }))

// TODO: Create Row component that renders individual list items
// - Should accept index and style props
// - Use style prop for positioning

// TODO: Use FixedSizeList component with:
// - height: 600
// - itemCount: items.length
// - itemSize: 80
// - width: '100%'

export default function App() {
  return (
    <div className="container">
      <h1>Virtualization</h1>
      <p>10,000 items rendered efficiently with react-window</p>

      {/* TODO: Add FixedSizeList here */}
    </div>
  )
}
```

---

## Exercise 09: Debouncing & Throttling (Complete Missing, Intermediate, 25-30 min)

### App.tsx (Partial Code)
```tsx
import { useState, useCallback, useRef, useEffect } from 'react'

// TODO: Implement debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // TODO: Set up timeout to update debounced value after delay
    // TODO: Clear timeout if value changes before delay expires
    // TODO: Cleanup on unmount
  }, [value, delay])

  return debouncedValue
}

// TODO: Implement throttle hook
function useThrottle(callback: () => void, delay: number) {
  const lastRun = useRef(Date.now())

  return useCallback(() => {
    // TODO: Only call callback if enough time has passed since last call
    // TODO: Update lastRun timestamp
  }, [callback, delay])
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [scrollCount, setScrollCount] = useState(0)

  // TODO: Use useDebounce hook on searchTerm (500ms delay)

  // TODO: Use useThrottle hook on scroll handler (200ms delay)

  return (
    <div className="container">
      <h1>Debouncing & Throttling</h1>

      <div className="section">
        <h2>Debounced Search</h2>
        <input
          type="text"
          placeholder="Search (debounced 500ms)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p>Searching for: {/* TODO: Show debounced value */}</p>
      </div>

      <div className="section" onScroll={/* TODO: throttled handler */}>
        <h2>Throttled Scroll</h2>
        <p>Scroll count (throttled 200ms): {scrollCount}</p>
        <div style={{ height: '400px', overflow: 'auto' }}>
          <div style={{ height: '2000px' }}>Scroll me!</div>
        </div>
      </div>
    </div>
  )
}
```

---

## Exercise 10: Performance Audit (Fix Broken, Advanced, 35-40 min)

### App.tsx (Multiple Issues)
```tsx
import { useState } from 'react'

// ISSUE 1: Large unoptimized component without code splitting
import HeavyDashboard from './components/HeavyDashboard'

// ISSUE 2: Images loaded all at once
function ImageGallery() {
  const images = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    src: `https://picsum.photos/400/300?random=${i}`
  }))

  return (
    <div className="gallery">
      {images.map(img => (
        // ISSUE 3: No lazy loading
        <img key={img.id} src={img.src} alt="" />
      ))}
    </div>
  )
}

// ISSUE 4: Expensive component not memoized
function ExpensiveListItem({ item, onUpdate }) {
  // Expensive calculation
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += i
  }

  return (
    <div onClick={() => onUpdate(item.id)}>
      {item.name} - {result}
    </div>
  )
}

export default function App() {
  const [items] = useState(
    Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }))
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [showDashboard, setShowDashboard] = useState(false)

  // ISSUE 5: Not memoized, recreated every render
  const handleUpdate = (id: number) => {
    console.log('Update', id)
  }

  // ISSUE 6: Not memoized expensive operation
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>Performance Audit</h1>

      {/* ISSUE 7: Search causes all items to re-render */}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={() => setShowDashboard(!showDashboard)}>
        Toggle Dashboard
      </button>

      {/* ISSUE 8: Heavy component loaded eagerly */}
      {showDashboard && <HeavyDashboard />}

      {/* ISSUE 9: No virtualization for long list */}
      <div>
        {filteredItems.map(item => (
          <ExpensiveListItem
            key={item.id}
            item={item}
            onUpdate={handleUpdate}
          />
        ))}
      </div>

      {/* ISSUE 10: All images loaded at once */}
      <ImageGallery />
    </div>
  )
}
```

### Fixes Required:
1. Lazy load HeavyDashboard
2. Implement image lazy loading
3. Memoize ExpensiveListItem
4. Wrap handleUpdate with useCallback
5. Memoize filteredItems
6. Implement debounce for search
7. Add virtualization for list
8. Optimize ImageGallery
9. Add React.memo where appropriate
10. Remove any over-memoization

---

## Test Files Pattern

All exercises should have similar test structure:
```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('[Exercise Name]', () => {
  it('renders the heading', () => {
    render(<App />)
    expect(screen.getByText(/[exercise name]/i)).toBeInTheDocument()
  })

  // Add specific tests for each exercise's requirements

  it('performs expected optimization', async () => {
    // Test that optimization is working
  })
})
```

---

## CSS Pattern for All Exercises

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.controls {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

/* Exercise-specific styles */
```

---

This completes the content specification for exercises 05-10. Each exercise has:
- Clear learning objectives
- Starter code with guidance (no solutions in comments)
- Complete solution in SOLUTION.md
- Comprehensive tests
- Appropriate difficulty and type
