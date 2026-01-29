# Solution: Styled Components Introduction

## Key Concepts

### 1. CSS-in-JS Philosophy
Styled-components brings CSS into JavaScript:
- Styles are defined as components
- Scoped automatically (no global conflicts)
- Full JavaScript power (variables, functions, logic)
- Props can directly affect styles

### 2. Tagged Template Literals
Styled-components uses ES6 tagged templates:
```tsx
const Button = styled.button`
  background: blue;
`;
```

This is JavaScript syntax: `styled.button` is a function that processes the template literal.

### 3. Prop Interpolation
Access props inside template literals:
```tsx
const Button = styled.button<{ $primary?: boolean }>`
  background: ${props => props.$primary ? 'blue' : 'gray'};
  ${props => props.$primary && `
    font-weight: bold;
  `}
`;
```

The `$` prefix creates transient props (not passed to DOM).

### 4. Generated Class Names
Styled-components automatically generates unique class names:
```tsx
const Button = styled.button`...`;
// Renders as: <button class="sc-abc123">
```

Benefits:
- No naming conflicts
- Automatic scoping
- Dead code elimination

### 5. Component Composition
Style existing components:
```tsx
const Button = styled.button`...`;
const PrimaryButton = styled(Button)`
  background: blue;
`;
```

### 6. TypeScript Integration
Define prop types using generics:
```tsx
type ButtonProps = {
  $variant?: 'primary' | 'secondary';
};

const Button = styled.button<ButtonProps>`
  background: ${p => p.$variant === 'primary' ? 'blue' : 'gray'};
`;
```

## Benefits of Styled-Components

1. **Automatic Scoping**: No class name conflicts
2. **Dynamic Styling**: Props directly affect styles
3. **Component-based**: Styles are components
4. **Dead Code Elimination**: Unused styles removed
5. **Theme Support**: Built-in theming system
6. **No Class Names**: Don't need to invent class names

## Trade-offs

**Pros:**
- Component-scoped styles
- Dynamic styling with props
- No naming conventions needed
- Full JavaScript power

**Cons:**
- Runtime overhead (styles generated on mount)
- Larger bundle size
- Different mental model from CSS
- Debugging can be harder (generated class names)

## When to Use Styled-Components

**Good for:**
- Component libraries
- Apps with lots of dynamic styling
- Teams that prefer JavaScript over CSS
- Projects needing component-scoped styles

**Consider alternatives for:**
- Static content sites
- Performance-critical apps (use CSS Modules or Tailwind)
- Teams with strong CSS expertise

## Implementation Pattern

The solution demonstrates:
1. **Basic styled component**: `styled.button`
2. **Prop interpolation**: `${props => ...}`
3. **Type safety**: TypeScript generics
4. **Variants**: Using props to change styles
5. **Pseudo-selectors**: `:hover`, `:active`
