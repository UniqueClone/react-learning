# Advanced CSS Modules with Theming

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 25-30 minutes

## Challenge

Build a themed component system using CSS Modules combined with CSS custom properties (variables). You'll create multiple components (Card, Badge, Button) that share a theme defined with CSS variables, while still maintaining the scoping benefits of CSS Modules. This exercise teaches you how to combine modern CSS features with CSS Modules for powerful, flexible styling.

## Requirements

Your implementation must:
- Create a theme system using CSS custom properties (--variable-name)
- Build Card, Badge, and Button components using CSS Modules
- Implement dynamic class composition based on props
- Support light and dark themes that can be switched
- Use CSS variables for colors while keeping structure in CSS Modules
- Demonstrate combining multiple CSS Module classes dynamically

## Learning Objectives

- Master CSS custom properties with CSS Modules
- Learn dynamic class composition patterns
- Understand theming strategies in CSS Modules
- Practice combining CSS Modules with global CSS variables
- Learn the `clsx` or manual class combination patterns

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Create a `theme.css` file with CSS custom properties
5. Create component files with CSS Modules
6. Implement dynamic theme switching
7. Run `pnpm dev` to test manually
8. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Theme can be switched between light and dark modes
- [ ] CSS variables are properly defined and used
- [ ] Components use CSS Modules for structure
- [ ] Components read colors from CSS variables
- [ ] Multiple classes can be combined on elements
- [ ] Theme switch updates all components
- [ ] All tests pass

## Hints

<details>
<summary>CSS Custom Properties</summary>

Define variables in a root selector:
```css
:root {
  --primary-color: #3498db;
  --background-color: white;
}

[data-theme="dark"] {
  --primary-color: #5dade2;
  --background-color: #1a1a1a;
}
```

Use them in any CSS:
```css
.button {
  background: var(--primary-color);
}
```
</details>

<details>
<summary>Theme Switching</summary>

Use a data attribute on a root element:
```tsx
<div data-theme={theme}>
  {/* children */}
</div>
```

This allows CSS to change based on theme:
```css
[data-theme="dark"] {
  --primary: #xyz;
}
```
</details>

<details>
<summary>Combining Classes</summary>

Combine multiple CSS Module classes:
```tsx
import styles from './Card.module.css';

<div className={`${styles.card} ${styles.elevated}`}>
```

Or use template literals for conditional classes:
```tsx
className={`${styles.card} ${isElevated ? styles.elevated : ''}`}
```
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
