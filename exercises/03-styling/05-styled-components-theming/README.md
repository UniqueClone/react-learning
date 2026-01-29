# Styled Components Theming

**Difficulty:** Intermediate
**Type:** Complete Missing Code
**Estimated Time:** 25-30 minutes

## Challenge

Implement a theme system using styled-components' built-in `ThemeProvider`. You'll learn how to define theme objects, provide them to your component tree, and access theme values in styled components. This teaches the standard pattern for theming in styled-components applications.

## Requirements

Your implementation must:
- Complete the theme objects for light and dark modes
- Set up the ThemeProvider wrapper
- Complete styled components that access theme values
- Implement theme switching functionality
- Use theme values throughout all styled components

## Learning Objectives

- Master styled-components ThemeProvider
- Learn how to define and structure theme objects
- Practice accessing theme values in styled components
- Understand theme context and prop drilling avoidance
- Learn TypeScript typing for themes

## Instructions

1. Run `pnpm install` to install dependencies (styled-components already added)
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Complete the theme objects in `theme.ts`
5. Complete the ThemeProvider setup in `App.tsx`
6. Complete styled components to use theme
7. Run `pnpm dev` to test manually
8. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Theme objects defined with colors and other design tokens
- [ ] ThemeProvider wraps the app
- [ ] Styled components access theme via props.theme
- [ ] Theme can be switched dynamically
- [ ] All components update when theme changes
- [ ] All tests pass

## Hints

<details>
<summary>ThemeProvider setup</summary>

```tsx
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#3498db',
    background: '#fff'
  }
};

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```
</details>

<details>
<summary>Accessing theme in components</summary>

```tsx
const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
`;
```

The theme is automatically passed as a prop to all styled components.
</details>

<details>
<summary>TypeScript theme typing</summary>

```tsx
// theme.ts
export const lightTheme = {
  colors: {
    primary: '#3498db',
  }
};

export type Theme = typeof lightTheme;

// styled.d.ts
import 'styled-components';
import { Theme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
```
</details>

<details>
<summary>Hint 4: Theme Switching Pattern</summary>

Track the current theme in state and switch between theme objects:

```tsx
function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle Theme
      </button>
      {/* Your components */}
    </ThemeProvider>
  );
}
```

All styled components will automatically re-render with new theme values.
</details>

<details>
<summary>Hint 5: Organizing Theme Structure</summary>

Structure themes with semantic tokens for maintainability:

```tsx
export const lightTheme = {
  colors: {
    // Semantic names
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#333333',
    textMuted: '#6c757d',
    border: '#dee2e6',
    error: '#e74c3c',
    success: '#27ae60',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  borderRadius: '4px',
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.15)',
  }
};
```

Use descriptive names that convey purpose, not just color values.
</details>

## Common Mistakes

<details>
<summary>Mistake 1: Not Wrapping App with ThemeProvider</summary>

**Problem:** Using styled components with theme but forgetting to wrap with ThemeProvider

**Why it's wrong:** Styled components will try to access `props.theme` which will be undefined, causing runtime errors

**Solution:**
```tsx
// ✗ Wrong - no provider
export default function App() {
  return <StyledButton>Click</StyledButton>;
}

// ✓ Correct - wrapped with provider
export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <StyledButton>Click</StyledButton>
    </ThemeProvider>
  );
}
```
</details>

<details>
<summary>Mistake 2: Incorrect Theme Access Syntax</summary>

**Problem:** Using `${theme.colors.primary}` or `${props.colors.primary}` instead of the correct syntax

**Why it's wrong:** Theme is on the `props.theme` object, not available as a standalone variable

**Solution:**
```tsx
// ✗ Wrong
const Button = styled.button`
  background: ${theme.colors.primary};
  color: ${props.colors.text};
`;

// ✓ Correct
const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
`;

// ✓ Also correct - object destructuring
const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
`;
```
</details>

<details>
<summary>Mistake 3: Inconsistent Theme Structure Between Modes</summary>

**Problem:** Light and dark themes have different properties or structure

**Why it's wrong:** Styled components expect the same properties to exist - missing properties cause undefined errors

**Solution:**
```tsx
// ✗ Wrong - different structure
const lightTheme = {
  colors: { primary: '#3498db', background: '#fff' }
};
const darkTheme = {
  colors: { primary: '#5dade2' } // Missing background!
};

// ✓ Correct - matching structure
const lightTheme = {
  colors: { primary: '#3498db', background: '#ffffff' }
};
const darkTheme = {
  colors: { primary: '#5dade2', background: '#1a1a1a' }
};
```

Use TypeScript to enforce this:
```tsx
export type Theme = typeof lightTheme;
export const darkTheme: Theme = { /* must match structure */ };
```
</details>

<details>
<summary>Mistake 4: Not Memoizing Theme Objects</summary>

**Problem:** Creating new theme objects on every render

**Why it's wrong:** Causes all styled components to re-render unnecessarily because theme object reference changes

**Solution:**
```tsx
// ✗ Wrong - new object every render
function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = {
    colors: isDark ? darkColors : lightColors
  };
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}

// ✓ Correct - stable references
const lightTheme = { colors: { ... } }; // Defined outside component
const darkTheme = { colors: { ... } };

function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}
```
</details>

<details>
<summary>Mistake 5: Hardcoding Values Instead of Using Theme</summary>

**Problem:** Mixing hardcoded colors/values with theme values

**Why it's wrong:** Some styles won't update when theme changes, breaking the theme system

**Solution:**
```tsx
// ✗ Wrong - hardcoded values
const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  color: #333; /* Hardcoded - won't change with theme! */
  border: 1px solid #ddd; /* Hardcoded */
`;

// ✓ Correct - all values from theme
const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
```
</details>

<details>
<summary>Mistake 6: Not Typing the Theme for TypeScript</summary>

**Problem:** Skipping TypeScript declaration, losing autocomplete and type safety

**Why it's wrong:** No autocomplete for theme properties, typos not caught until runtime

**Solution:** Always create a `styled.d.ts` file:
```tsx
// styled.d.ts
import 'styled-components';
import { Theme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
```

Now you get full autocomplete for `props.theme.*`
</details>

## Performance Considerations

**Theme Changes:**
- When theme changes, ALL styled components re-render
- This is usually fine for theme switching (infrequent operation)
- Don't put frequently-changing values in theme

**Theme Object Stability:**
- Always define themes outside components or memoize them
- Changing theme object reference causes full re-render tree
- Use stable references (lightTheme/darkTheme constants)

**When to Use Theming:**
- Good: Colors, spacing, typography, borders, shadows
- Good: Values that change together (light/dark mode)
- Bad: Component-specific state
- Bad: Frequently changing values (e.g., animation state)

## Testing

Your implementation must pass all tests in `App.test.tsx`. The tests verify:

- **Theme Objects:** Light and dark themes are properly defined with all required properties
- **ThemeProvider Setup:** App is wrapped with ThemeProvider
- **Theme Access:** Styled components correctly access theme values via props.theme
- **Theme Switching:** Changing theme state causes components to re-render with new theme values
- **TypeScript Types:** Theme types are properly defined and used
- **Color Application:** All components use theme colors, not hardcoded values

Run `pnpm test` to verify your implementation. Use DevTools to inspect computed styles and verify theme colors are applied.

## Further Learning

- [Styled Components: Theming](https://styled-components.com/docs/advanced#theming) - Official theming documentation
- [TypeScript with Styled Components](https://styled-components.com/docs/api#typescript) - TypeScript setup guide
- [Design Tokens](https://css-tricks.com/what-are-design-tokens/) - Understanding semantic design values
- [Theme UI](https://theme-ui.com/) - Advanced theming patterns and conventions
- [Dark Mode Best Practices](https://web.dev/prefers-color-scheme/) - Guidelines for implementing dark mode
