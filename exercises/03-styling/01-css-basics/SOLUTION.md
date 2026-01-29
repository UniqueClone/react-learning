# Solution: Basic CSS Styling

## Key Concepts

### 1. CSS Import in React
React (with bundlers like Vite) allows direct CSS imports:
```tsx
import './Card.css';
```

The CSS becomes globally scoped. Any component can access these classes once imported anywhere in the app.

### 2. className Attribute
React uses `className` instead of `class` (which is a reserved keyword in JavaScript):
```tsx
<div className="card">  // ✓ Correct
<div class="card">      // ✗ Wrong in React
```

### 3. Inline Styles
Inline styles in React use JavaScript objects with camelCase properties:
```tsx
<div style={{ backgroundColor: 'blue', fontSize: '16px' }}>
```

Note: CSS properties with hyphens become camelCase (background-color → backgroundColor).

### 4. When to Use Each Approach

**External CSS (className):**
- Static styles that don't change
- Reusable style patterns
- Complex selectors (hover, media queries)
- Better performance (cached, smaller bundle)

**Inline Styles:**
- Dynamic values from props/state
- One-off unique values
- Runtime calculations

**Trade-offs:**
- External CSS: Better separation of concerns, but global scope can cause conflicts
- Inline styles: No conflicts, but no pseudo-classes, media queries, or CSS features

### 5. CSS Specificity
Inline styles have the highest specificity (except !important):
```css
/* card.css */
.card { border: 1px solid gray; }
```
```tsx
<div className="card" style={{ border: '2px solid red' }}>
  {/* Border will be red - inline style wins */}
</div>
```

## Implementation Notes

The solution demonstrates:
1. **External CSS**: Card layout, typography, spacing
2. **Inline styles**: Dynamic border color based on user role
3. **Combination**: className for structure, style for dynamic values

This pattern is common in React apps: use CSS for the 90% static styling, inline styles for the 10% dynamic values.
