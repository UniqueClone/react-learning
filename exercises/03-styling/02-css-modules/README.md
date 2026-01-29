# CSS Modules

**Difficulty:** Beginner
**Type:** Complete Missing Code
**Estimated Time:** 20-25 minutes

## Challenge

Complete a button component library using CSS Modules. You'll learn how CSS Modules solve the global scope problem of traditional CSS by automatically scoping class names to components. The starter code has a button library partially implemented - you need to complete the missing pieces.

## Requirements

Your implementation must:
- Complete the Button component with proper CSS Module imports
- Implement button variants (primary, secondary, danger) using CSS Modules
- Use the `composes` keyword to share styles between variants
- Ensure styles are scoped (no global class name conflicts)
- Export and use multiple button variants

## Learning Objectives

- Understand how CSS Modules provide scoped styling
- Master the `composes` keyword for style composition
- Learn the naming convention for CSS Module files (*.module.css)
- Practice importing and using CSS Module classes as objects
- Understand the benefits of scoped styles over global CSS

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Complete the missing code in `Button.module.css`
5. Complete the missing code in `Button.tsx`
6. Complete the button usage in `App.tsx`
7. Run `pnpm dev` to test manually
8. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Button component accepts variant prop (primary, secondary, danger)
- [ ] Each variant has unique styling via CSS Modules
- [ ] Base button styles are composed into variants
- [ ] CSS classes are scoped (check generated class names in devtools)
- [ ] Multiple buttons render with correct styles
- [ ] All tests pass

## Hints

<details>
<summary>CSS Modules import syntax</summary>

CSS Modules use the `.module.css` extension:
```tsx
import styles from './Button.module.css';
```

Then use classes as object properties:
```tsx
<button className={styles.button}>
```
</details>

<details>
<summary>The composes keyword</summary>

CSS Modules allow composing classes:
```css
.base {
  padding: 8px 16px;
  border: none;
}

.primary {
  composes: base;
  background: blue;
  color: white;
}
```

This applies both `.base` and `.primary` styles.
</details>

<details>
<summary>Dynamic variant selection</summary>

Use bracket notation to select classes dynamically:
```tsx
const variantClass = styles[variant]; // styles.primary, styles.secondary, etc.
```
</details>

<details>
<summary>Hint 4: Scoped Class Names and Naming Best Practices</summary>

CSS Modules automatically scope your class names to prevent conflicts:

```css
/* Button.module.css */
.button {
  /* This becomes something like: Button_button__x7k9m */
}
```

**Naming Best Practices:**
- Use simple, semantic names like `.button`, `.primary` - the scoping handles uniqueness
- Use camelCase or kebab-case consistently: `.primaryButton` or `.primary-button`
- Don't prefix with component name (`.buttonBase`) - the module already scopes it
- Use `:global()` for truly global styles (rarely needed):
  ```css
  :global(.app-wide-style) {
    /* Not scoped */
  }
  ```

To verify scoping works, inspect elements in DevTools - you'll see generated class names like `Button_primary__a1b2c3`.
</details>

## Common Mistakes

<details>
<summary>Mistake 1: Forgetting the .module.css Extension</summary>

**Problem:** Naming the file `Button.css` instead of `Button.module.css`

**Why it's wrong:** Without `.module.css`, Vite/webpack treats it as regular global CSS - no scoping happens

**Solution:** Always use the `.module.css` extension:
```tsx
// ✗ Wrong
import styles from './Button.css';

// ✓ Correct
import styles from './Button.module.css';
```
</details>

<details>
<summary>Mistake 2: Using String Class Names Instead of Object Properties</summary>

**Problem:** Writing `className="button"` instead of `className={styles.button}`

**Why it's wrong:** The actual class name is scoped (e.g., `Button_button__x7k9m`), not `"button"`

**Solution:** Always access classes through the styles object:
```tsx
// ✗ Wrong - string literal won't match scoped name
<button className="button">

// ✓ Correct - use styles object
<button className={styles.button}>
```
</details>

<details>
<summary>Mistake 3: Misspelling the composes Keyword</summary>

**Problem:** Writing `compose:`, `composed:`, or `extends:` instead of `composes:`

**Why it's wrong:** Only `composes` is recognized by CSS Modules - other keywords are ignored

**Solution:**
```css
/* ✗ Wrong */
.primary {
  compose: base;
}

/* ✓ Correct */
.primary {
  composes: base;
}
```
</details>

<details>
<summary>Mistake 4: Trying to Compose Classes with String Concatenation</summary>

**Problem:** Attempting to apply multiple classes with `className={styles.button + ' ' + styles.primary}`

**Why it's wrong:** When using `composes`, you only need the final class - CSS Modules handles applying both

**Solution:**
```css
/* In Button.module.css */
.base { padding: 8px; }
.primary { composes: base; color: blue; }
```

```tsx
// ✗ Wrong - redundant
<button className={`${styles.base} ${styles.primary}`}>

// ✓ Correct - composes handles it
<button className={styles.primary}>
```

Note: If you need to apply multiple independent classes (not using composes), then concatenation is fine.
</details>

<details>
<summary>Mistake 5: Global Naming Conflicts Still Possible</summary>

**Problem:** Assuming CSS Modules prevent ALL style conflicts automatically

**Why it's wrong:** Global selectors like element tags (button, div) and :global() styles are still global

**Solution:**
```css
/* ✗ Can still cause conflicts */
button {
  background: blue; /* Affects ALL buttons in app */
}

/* ✓ Scoped to module */
.button {
  background: blue; /* Only affects this module */
}
```
</details>

<details>
<summary>Mistake 6: Not Inspecting Generated Class Names</summary>

**Problem:** Not verifying that scoping actually works

**Why it's wrong:** Without verification, you might not notice if CSS Modules isn't configured correctly

**Solution:**
1. Open browser DevTools
2. Inspect your button element
3. Check the class attribute - should see something like: `Button_primary__a1b2c3`
4. If you see just `primary`, CSS Modules isn't working
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. The tests verify:

- **CSS Module Import:** Button.module.css is properly imported
- **Variant Rendering:** Each variant (primary, secondary, danger) renders with correct scoped class names
- **Style Application:** Styles from the CSS Module are actually applied (computed styles match expectations)
- **Composition:** Base button styles are composed into variant styles
- **Multiple Instances:** Multiple buttons can render simultaneously with different variants
- **Scope Isolation:** Class names are scoped and don't conflict

Run `pnpm test` to verify your implementation. Inspect elements in DevTools to see the generated scoped class names.

## Further Learning

- [CSS Modules GitHub](https://github.com/css-modules/css-modules) - Official CSS Modules specification
- [Vite CSS Modules](https://vitejs.dev/guide/features.html#css-modules) - How Vite handles CSS Modules
- [CSS Modules Best Practices](https://github.com/gajus/react-css-modules#css-modules-best-practices) - Recommended patterns
- [CSS Modules vs CSS-in-JS](https://www.robinwieruch.de/react-css-modules/) - Comparison of styling approaches
