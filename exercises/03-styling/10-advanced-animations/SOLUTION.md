# Solution: Advanced Animations with Framer Motion

## Complete Implementation

### App.tsx Solution

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function App() {
  const [items, setItems] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Learn Framer Motion' },
    { id: 3, text: 'Build animations' },
    { id: 4, text: 'Ship to production' },
  ])

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const addItem = () => {
    const newId = Math.max(...items.map(i => i.id), 0) + 1
    setItems([...items, { id: newId, text: `New item ${newId}` }])
  }

  return (
    <div className="container">
      <h1>Framer Motion Animations</h1>

      <button onClick={addItem} className="add-button">
        Add Item
      </button>

      <AnimatePresence>
        <motion.ul
          className="list"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {items.map(item => (
            <motion.li
              key={item.id}
              className="list-item"
              variants={itemVariants}
              layout
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <span>{item.text}</span>
              <button onClick={() => removeItem(item.id)} className="remove-button">
                Remove
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  )
}
```

## Key Concepts

### 1. Framer Motion Basics

**motion components:**
- `motion.div`, `motion.ul`, `motion.li` - animated versions of HTML elements
- Accept animation props: `initial`, `animate`, `exit`
- Support gestures: `drag`, `whileHover`, `whileTap`

### 2. Variants System

Variants enable coordinated animations:

```tsx
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}
```

Children automatically inherit parent's animation state.

### 3. AnimatePresence

Enables exit animations:

```tsx
<AnimatePresence>
  {items.map(item => (
    <motion.div key={item.id} exit={{ opacity: 0 }}>
      {item.text}
    </motion.div>
  ))}
</AnimatePresence>
```

Without AnimatePresence, removed elements disappear instantly.

### 4. Stagger Animation

`staggerChildren` creates sequential animations:

```tsx
transition: {
  staggerChildren: 0.1  // 100ms delay between children
}
```

### 5. Gesture Recognition

**Drag:**
```tsx
<motion.div
  drag="x"  // or drag="y" or drag (both axes)
  dragConstraints={{ left: 0, right: 0 }}
/>
```

**Hover/Tap:**
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

### 6. Layout Animations

`layout` prop animates position changes:

```tsx
<motion.div layout>
  {/* Automatically animates when position changes */}
</motion.div>
```

## Key Takeaways

1. **Framer Motion** simplifies complex React animations
2. **Variants** enable coordinated multi-element animations
3. **AnimatePresence** required for exit animations
4. **staggerChildren** creates professional sequential effects
5. **Gestures** (drag, hover, tap) work out of the box
6. **layout** prop automatically animates position changes
7. **Performance is built-in** - Framer Motion optimizes for GPU
8. **Declarative API** easier than manual CSS animations

## When to Use Framer Motion

**Good for:**
- Complex orchestrated animations
- Gesture-driven interactions
- Page transitions
- Drag and drop interfaces
- Animated lists/galleries

**Not needed for:**
- Simple hover effects (use CSS)
- Basic transitions (use CSS)
- Tiny bundles (adds ~30kb)

## Further Learning

- Framer Motion docs: framer.com/motion
- Layout animations
- Shared layout animations
- SVG animations
- Scroll-triggered animations
