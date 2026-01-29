# Solution: CSS Animations and Transitions

## Complete Implementation

See full implementation with Modal, Spinner, and AnimatedButton components using CSS transitions and @keyframes.

### Key Components

**Modal with Transitions:**
- Uses opacity and transform for fade + slide animation
- Manages isAnimating state for smooth exits
- setTimeout delays unmounting until animation completes

**Spinner with @keyframes:**
- Continuous rotation using linear timing
- Border-based circular loader design

**AnimatedButton:**
- Scale transform on hover
- Box-shadow enhancement
- Smooth 0.2s transitions

### Critical CSS Patterns

```css
/* Transitions for state changes */
.element {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* @keyframes for complex animations */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Key Takeaways

1. **Use transitions** for interactive states (hover, focus)
2. **Use @keyframes** for complex/looping animations
3. **GPU-accelerated properties** (transform, opacity) perform better
4. **Timing functions** control animation feel (ease, linear, cubic-bezier)
5. **prefers-reduced-motion** is required for accessibility
6. **Modal exit pattern** needs state + setTimeout for smooth unmounting
7. **Transform is better** than animating position/size properties
8. **Test animations** at different speeds and with motion preferences disabled
