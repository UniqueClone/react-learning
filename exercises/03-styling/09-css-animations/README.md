# CSS Animations and Transitions

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 30-35 minutes

## Challenge

Build an animated modal component with CSS transitions and keyframe animations. You'll create a modal with smooth enter/exit transitions, a rotating loading spinner, and interactive button hover effects. This exercise teaches you the fundamentals of CSS animations, timing functions, and transform properties.

## Requirements

Your implementation must:
- Build a Modal component with enter/exit transitions
- Create a loading spinner using @keyframes
- Implement smooth button hover effects with transitions
- Use transform and opacity for performant animations
- Apply different easing functions (ease, ease-in-out, cubic-bezier)
- Make animations respect user preferences (prefers-reduced-motion)
- Ensure animations are smooth (60fps) using GPU-accelerated properties

## Learning Objectives

- Master CSS transitions vs @keyframes animations
- Learn transform properties (translate, scale, rotate)
- Understand animation timing functions
- Practice GPU-accelerated animations
- Learn accessibility considerations for animations
- Understand will-change and animation performance

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Build your Modal, Spinner, and Button components in `App.tsx`
5. Create animations in `App.module.css` using transitions and @keyframes
6. Run `pnpm dev` to test manually (watch the animations)
7. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Modal fades in (opacity) and slides down (transform)
- [ ] Modal backdrop fades in behind the modal
- [ ] Close button makes modal fade out and slide up
- [ ] Loading spinner rotates continuously
- [ ] Buttons have scale and shadow effects on hover
- [ ] All animations use GPU-accelerated properties
- [ ] Animations respect prefers-reduced-motion
- [ ] All tests pass

## Hints

<details>
<summary>CSS Transitions vs Animations</summary>

**Transitions:** For state changes (hover, focus, class toggle)
```css
.button {
  transition: transform 0.2s ease;
}

.button:hover {
  transform: scale(1.05);
}
```

**@keyframes:** For complex or looping animations
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

Use transitions for interactive states, keyframes for standalone animations.
</details>

<details>
<summary>Modal enter/exit pattern</summary>

```tsx
const [isOpen, setIsOpen] = useState(false);
const [isAnimating, setIsAnimating] = useState(false);

// When opening
setIsOpen(true);
setIsAnimating(true);

// When closing
setIsAnimating(false);
setTimeout(() => setIsOpen(false), 300); // Wait for animation
```

```css
.modal {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal.open {
  opacity: 1;
  transform: translateY(0);
}
```
</details>

<details>
<summary>GPU-accelerated properties</summary>

These properties are optimized (use GPU):
- `transform` (translate, scale, rotate)
- `opacity`
- `filter`

Avoid animating these (cause repaints):
- `width`, `height`
- `top`, `left`
- `margin`, `padding`

```css
/* Bad: Animates top (repaints) */
.element {
  transition: top 0.3s;
}

/* Good: Animates transform (GPU) */
.element {
  transition: transform 0.3s;
  transform: translateY(0);
}
```
</details>

<details>
<summary>Loading spinner with @keyframes</summary>

```css
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: rotate 1s linear infinite;
}
```

`linear` makes rotation constant (no easing).
</details>

<details>
<summary>Timing functions explained</summary>

```css
/* Built-in */
transition: all 0.3s ease;        /* Slow start and end */
transition: all 0.3s ease-in;     /* Slow start */
transition: all 0.3s ease-out;    /* Slow end */
transition: all 0.3s ease-in-out; /* Slow start and end (balanced) */
transition: all 0.3s linear;      /* Constant speed */

/* Custom (cubic-bezier) */
transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce */
```

Try different functions to find what feels right!
</details>

<details>
<summary>Accessibility: prefers-reduced-motion</summary>

Respect user preferences for animations:

```css
.modal {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .modal {
    transition: none; /* Instant for users who prefer it */
  }
}
```

Required for WCAG 2.1 compliance!
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

**Manual testing:**
1. Run `pnpm dev`
2. Click "Open Modal" - watch it fade and slide in
3. Click "Close" or backdrop - watch it animate out
4. Hover over buttons - see scale and shadow effects
5. Check spinner rotation is smooth
