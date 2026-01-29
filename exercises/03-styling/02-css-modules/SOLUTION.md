# Solution: CSS Modules

## Key Concepts

### 1. CSS Modules File Naming
CSS Modules use the `.module.css` extension:
```
Button.module.css  ✓ Will be processed as CSS Module
Button.css         ✗ Regular global CSS
```

Vite and most bundlers automatically recognize this convention and scope the classes.

### 2. Importing CSS Modules
Import CSS Modules as JavaScript objects:
```tsx
import styles from './Button.module.css';
```

Each class name becomes a property on the `styles` object.

### 3. Using CSS Module Classes
Classes are accessed as object properties:
```tsx
<button className={styles.primary}>
```

At build time, this becomes something like:
```html
<button class="Button_primary__x7k2m">
```

The hash ensures uniqueness across your entire application.

### 4. The composes Keyword
CSS Modules' killer feature - compose classes from other classes:
```css
.base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.primary {
  composes: base;
  background: #3498db;
  color: white;
}
```

Benefits:
- DRY principle - reuse styles without duplication
- Multiple classes applied automatically
- Type-safe composition

### 5. Why CSS Modules?

**Problem with global CSS:**
```css
/* ComponentA.css */
.button { background: red; }

/* ComponentB.css */
.button { background: blue; }  /* Conflict! */
```

**CSS Modules solution:**
```tsx
// ComponentA.tsx
import styles from './ComponentA.module.css';
<button className={styles.button}>  // .ComponentA_button__x7k2m

// ComponentB.tsx
import styles from './ComponentB.module.css';
<button className={styles.button}>  // .ComponentB_button__a3j9p
```

No conflicts! Each component's styles are isolated.

### 6. TypeScript Support
For TypeScript autocomplete, you can use:
```tsx
import styles from './Button.module.css';

// TypeScript knows about styles.primary, styles.secondary, etc.
```

Some setups use declaration files (`*.module.css.d.ts`) for full type safety.

## Implementation Strategy

1. **Define base styles**: Common button styles (padding, font, cursor)
2. **Compose variants**: Each variant composes base and adds specific colors
3. **Dynamic selection**: Use props to select the appropriate class
4. **Type safety**: Define allowed variants in TypeScript

## Benefits Over Traditional CSS

1. **No naming conflicts**: Each class is automatically scoped
2. **Explicit dependencies**: Import makes CSS dependencies clear
3. **Dead code elimination**: Unused CSS can be removed
4. **Composition**: Reuse styles without copy-paste
5. **Colocated**: CSS lives next to the component that uses it
