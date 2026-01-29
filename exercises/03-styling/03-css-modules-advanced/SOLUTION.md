# Solution: Advanced CSS Modules with Theming

## Key Concepts

### 1. CSS Custom Properties (CSS Variables)
CSS variables provide dynamic, runtime-changeable values:

```css
:root {
  --primary: #3498db;
  --bg: white;
}

.button {
  background: var(--primary);  /* Uses the variable value */
}
```

**Benefits:**
- Change values at runtime (no rebuild needed)
- Cascade through DOM
- Can be changed with JavaScript
- Perfect for theming

### 2. Combining CSS Modules with CSS Variables

**CSS Modules handle:** Structure, layout, spacing (things that don't change)
**CSS Variables handle:** Colors, sizes (things that change with themes)

```css
/* Card.module.css */
.card {
  padding: 20px;              /* Static structure */
  border-radius: 8px;         /* Static structure */
  background: var(--bg);      /* Dynamic theme value */
  color: var(--text);         /* Dynamic theme value */
}
```

### 3. Theme Switching with Data Attributes

Use `data-theme` attribute to switch themes:

```tsx
<div data-theme="dark">
  {/* All children inherit theme */}
</div>
```

```css
:root {
  --primary: #3498db;
}

[data-theme="dark"] {
  --primary: #5dade2;  /* Overrides for dark theme */
}
```

The cascade ensures child elements see the new values.

### 4. Dynamic Class Composition

Combine multiple CSS Module classes conditionally:

```tsx
// Template literal approach
<div className={`${styles.card} ${elevated ? styles.elevated : ''}`}>

// Array filter approach
<div className={[
  styles.card,
  elevated && styles.elevated,
  featured && styles.featured
].filter(Boolean).join(' ')}>
```

### 5. Architecture Pattern

**Global theme.css:**
```css
:root {
  --primary: blue;
  --secondary: gray;
}
```

**Component CSS Modules:**
```css
/* Button.module.css */
.button {
  padding: 10px;               /* Component structure */
  background: var(--primary);  /* Theme color */
}
```

This separates concerns:
- Theme colors are centralized
- Component structure is scoped
- Best of both worlds

### 6. TypeScript Theme Types

Define theme types for safety:
```tsx
type Theme = 'light' | 'dark';

const [theme, setTheme] = useState<Theme>('light');
```

## Why This Pattern?

**Problem with only CSS Modules:**
- Changing themes requires building separate CSS files
- Hard to support user-selected themes
- Color duplication across components

**Problem with only CSS Variables:**
- All styles are global
- Name collisions possible
- No scoping benefits

**Solution - Combine Both:**
- CSS Modules scope structural styles
- CSS Variables handle theme values
- Theme changes cascade automatically
- No rebuilds needed for theme switching

## Implementation Strategy

1. **Define theme variables** in a global `theme.css`
2. **Create component CSS Modules** that reference variables
3. **Wrap app** in a theme container with `data-theme`
4. **Toggle theme** by changing the data attribute
5. **CSS cascade** updates all components automatically

This is the pattern used in production apps like GitHub, VS Code, and many design systems.
