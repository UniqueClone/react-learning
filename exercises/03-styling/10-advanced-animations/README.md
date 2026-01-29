# Advanced Animations with Framer Motion

**Difficulty:** Advanced
**Type:** Complete Missing Code
**Estimated Time:** 30-35 minutes

## Challenge

Complete an animated list with Framer Motion featuring staggered animations, enter/exit transitions, and gesture recognition. Learn production-ready animation patterns using one of React's most popular animation libraries.

## Requirements

- Complete AnimatePresence for enter/exit animations
- Implement stagger children animation
- Add drag gesture recognition
- Use Framer Motion variants system
- Implement layout animations
- Add hover and tap gestures

## Learning Objectives

- Master Framer Motion API
- Learn variants and orchestration
- Practice gesture handling
- Understand layout animations
- Learn animation performance patterns

## Instructions

1. Run `pnpm install` (framer-motion already in package.json)
2. Complete TODO items in App.tsx
3. Use motion components and AnimatePresence
4. Implement variants for coordinated animations
5. Run `pnpm dev` and `pnpm test`

## Acceptance Criteria

- [ ] List items animate in with stagger
- [ ] Items can be removed with exit animation
- [ ] Drag gesture works on items
- [ ] Hover effects present
- [ ] AnimatePresence handles exits
- [ ] All tests pass

## Hints

<details>
<summary>Framer Motion basics</summary>

```tsx
import { motion, AnimatePresence } from 'framer-motion'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
/>
```
</details>

<details>
<summary>Variants and stagger</summary>

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.li key={item.id} variants={item} />
  ))}
</motion.ul>
```
</details>

<details>
<summary>Gestures</summary>

```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```
</details>

## Testing

Run `pnpm test` to verify all tests pass.
