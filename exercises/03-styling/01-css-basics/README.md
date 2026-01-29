# Basic CSS Styling

**Difficulty:** Beginner
**Type:** Build From Scratch
**Estimated Time:** 15-20 minutes

## Challenge

Create a styled card component that demonstrates the three main ways to apply CSS in React: external CSS files with className, inline styles, and global CSS. You'll build a user profile card with various styling techniques to understand when to use each approach.

## Requirements

Your implementation must:
- Create a Card component that accepts user data (name, bio, avatar URL, role)
- Style the card using an external CSS file with multiple classes
- Use inline styles for dynamic styling (e.g., border color based on role)
- Demonstrate CSS specificity by combining className and inline styles
- Import and apply the CSS file in your component

## Learning Objectives

- Understand how to import and use CSS files in React components
- Master the difference between className and class attributes
- Learn when to use inline styles vs external stylesheets
- Practice CSS specificity in React
- Understand the trade-offs between different styling approaches

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Create a `Card.css` file with your styles
5. Implement the Card component in `App.tsx`
6. Run `pnpm dev` to test manually
7. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Card component renders with all user information
- [ ] External CSS classes are properly applied using className
- [ ] Inline styles dynamically change based on props
- [ ] CSS is imported and styles are visible
- [ ] Card has proper layout, spacing, and visual hierarchy
- [ ] All tests pass

## Hints

<details>
<summary>How to import CSS files</summary>

In React with Vite, you can import CSS files directly:

```tsx
import './Card.css';
```

The styles become globally available after import.
</details>

<details>
<summary>className vs style props</summary>

Use `className` for static, reusable styles defined in CSS files:
```tsx
<div className="card">
```

Use `style` prop for dynamic styles that depend on props or state:
```tsx
<div style={{ borderColor: color }}>
```
</details>

<details>
<summary>Role-based styling</summary>

You can map role values to colors:
```tsx
const roleColors = {
  admin: '#e74c3c',
  user: '#3498db',
  guest: '#95a5a6'
};
```
</details>

<details>
<summary>Hint 4: CSS Specificity and Combining Styles</summary>

When you combine className and inline styles, inline styles have higher specificity and will override CSS file styles:

```tsx
// CSS file defines: .card { border: 1px solid gray; }
// Inline style will override the border property:
<div className="card" style={{ border: '2px solid blue' }}>
```

Use this to your advantage - define base styles in CSS, override specific properties inline when needed.
</details>

<details>
<summary>Hint 5: When to Use Each Styling Approach</summary>

**External CSS (className):** Use for:
- Static styles that don't change
- Reusable style patterns
- Layout and positioning
- Media queries and pseudo-selectors

**Inline Styles (style prop):** Use for:
- Dynamic values based on props/state
- Styles that change at runtime
- Component-specific values like colors, sizes
- One-off styles that won't be reused

Combine both for flexible, maintainable components.
</details>

## Common Mistakes

<details>
<summary>Mistake 1: Forgetting to Import the CSS File</summary>

**Problem:** Creating a CSS file but not importing it in the component

**Why it's wrong:** CSS files are not automatically loaded - they must be explicitly imported for their styles to apply

**Solution:** Add the import statement at the top of your component file:
```tsx
import './Card.css';
```
</details>

<details>
<summary>Mistake 2: Using 'class' Instead of 'className'</summary>

**Problem:** Writing `<div class="card">` in JSX

**Why it's wrong:** `class` is a reserved keyword in JavaScript. React uses `className` instead

**Solution:** Always use `className` in JSX:
```tsx
<div className="card">  // ✓ Correct
<div class="card">      // ✗ Wrong - will cause warnings
```
</details>

<details>
<summary>Mistake 3: Inline Style Syntax Errors</summary>

**Problem:** Using CSS string syntax in inline styles: `style="color: red"`

**Why it's wrong:** React's style prop expects a JavaScript object, not a CSS string. Property names must be camelCase.

**Solution:** Use object syntax with camelCase properties:
```tsx
// ✗ Wrong
<div style="background-color: blue; font-size: 16px">

// ✓ Correct
<div style={{ backgroundColor: 'blue', fontSize: '16px' }}>
```
</details>

<details>
<summary>Mistake 4: CSS Specificity Confusion</summary>

**Problem:** Expecting className styles to override inline styles

**Why it's wrong:** Inline styles always have higher specificity than class selectors in CSS

**Solution:** Understand the specificity hierarchy:
1. Inline styles (highest priority)
2. IDs (#myId)
3. Classes, attributes (.myClass)
4. Elements (div, span)

If you need className to win, don't use inline styles for that property.
</details>

<details>
<summary>Mistake 5: Global Style Conflicts</summary>

**Problem:** Using generic class names like `.card` or `.button` that might conflict with other components

**Why it's wrong:** Plain CSS is globally scoped - styles can leak between components

**Solution:** Use more specific class names or consider CSS Modules (next exercise) for scoped styles:
```css
/* Less specific - might conflict */
.card { }

/* More specific - less likely to conflict */
.user-profile-card { }
```
</details>

<details>
<summary>Mistake 6: Not Using Semicolons in Inline Style Objects</summary>

**Problem:** Putting semicolons between inline style properties: `{{ color: 'red'; fontSize: '16px' }}`

**Why it's wrong:** Inline styles are JavaScript objects - use commas to separate properties, not semicolons

**Solution:**
```tsx
// ✗ Wrong - semicolons
<div style={{ color: 'red'; fontSize: '16px' }}>

// ✓ Correct - commas
<div style={{ color: 'red', fontSize: '16px' }}>
```
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. The tests verify:

- **Component Rendering:** Card component renders all user data (name, bio, role, avatar)
- **CSS Classes Applied:** Elements have the correct className attributes from your CSS file
- **CSS File Imported:** Styles from Card.css are actually applied and visible in the DOM
- **Inline Styles:** Dynamic border color changes based on the role prop
- **Visual Styling:** Card has proper spacing, layout, and typography as defined in your CSS

Run `pnpm test` to check your implementation against these criteria.

## Further Learning

- [MDN: CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics) - Comprehensive guide to CSS fundamentals
- [React Docs: Styling and CSS](https://react.dev/learn/styling-components) - Official React documentation on styling approaches
- [MDN: CSS Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) - Understanding how CSS specificity works
- [CSS-Tricks: When to Use className vs style](https://css-tricks.com/the-difference-between-className-and-style-in-react/) - Best practices for choosing styling methods
- [Inline Styles vs CSS Files in React](https://www.robinwieruch.de/react-css-styling/) - Comprehensive comparison of React styling approaches
