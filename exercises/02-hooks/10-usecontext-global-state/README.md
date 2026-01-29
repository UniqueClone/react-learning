# useContext - Global State Management

**Difficulty:** Advanced
**Type:** Build From Scratch
**Estimated Time:** 30-35 minutes

## Challenge

Build a complete theme system using Context API to share state across multiple components without prop drilling. Create a ThemeContext, ThemeProvider, and custom useTheme hook following React best practices.

## Requirements

Your implementation must:
- Create ThemeContext with createContext
- Build ThemeProvider component that wraps the app
- Implement useTheme custom hook for accessing context
- Support 'light' and 'dark' themes
- Provide theme colors for each mode
- Include toggleTheme function
- Apply theme colors to multiple components
- Throw error when useTheme used outside provider
- All components access same shared theme state

## Learning Objectives

- Understanding Context API for global state
- Creating and providing context
- Consuming context with useContext
- Building custom hooks for context access
- Provider pattern for wrapping components
- Avoiding prop drilling
- TypeScript with Context
- Error handling for context misuse

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually in the browser
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] ThemeContext created with proper types
- [ ] ThemeProvider component wraps app
- [ ] useTheme hook accesses context
- [ ] Light and dark themes defined
- [ ] Theme colors applied to components
- [ ] Toggle function switches themes
- [ ] All components see same theme
- [ ] Error thrown if hook used incorrectly
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1: Creating Context</summary>

```typescript
import { createContext } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  colors: ThemeColors
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
```
</details>

<details>
<summary>Hint 2: Theme Colors</summary>

```typescript
interface ThemeColors {
  background: string
  text: string
  primary: string
}

const lightTheme: ThemeColors = {
  background: '#ffffff',
  text: '#000000',
  primary: '#007bff',
}

const darkTheme: ThemeColors = {
  background: '#1a1a1a',
  text: '#ffffff',
  primary: '#4dabf7',
}
```
</details>

<details>
<summary>Hint 3: Provider Component</summary>

```typescript
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const colors = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```
</details>

<details>
<summary>Hint 4: Custom Hook</summary>

```typescript
function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```
</details>

<details>
<summary>Hint 5: Using the Hook</summary>

```typescript
function Header() {
  const { theme, colors, toggleTheme } = useTheme()

  return (
    <div style={{ backgroundColor: colors.background, color: colors.text }}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}
```
</details>

<details>
<summary>Hint 6: Wrapping App</summary>

```typescript
export default function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>Theme System</h1>
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
```
</details>

## Common Mistakes

<details>
<summary>Mistake 1: Not Memoizing Context Values</summary>

**Problem:** Creating a new object for the context value on every render

**Why it's wrong:** Every time the provider re-renders, all consumers re-render even if the actual values haven't changed, because a new object reference is created

**Solution:** Memoize the context value with useMemo:

```typescript
// ✗ Wrong - new object every render
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✓ Correct - memoized value
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const value = useMemo(
    () => ({ theme, setTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```
</details>

<details>
<summary>Mistake 2: Putting Too Much in One Context</summary>

**Problem:** Creating a single massive context with all app state (user, theme, notifications, settings, etc.)

**Why it's wrong:** Any component that uses the context will re-render when ANY part of it changes, even if that component only cares about one piece

**Solution:** Split contexts by concern. Create separate contexts for independent features:

```typescript
// ✗ Wrong - everything in one context
const AppContext = createContext({
  theme: 'light',
  user: null,
  notifications: [],
  settings: {},
  // ... 20 more things
});

// ✓ Correct - separate contexts
const ThemeContext = createContext(undefined);
const UserContext = createContext(undefined);
const NotificationContext = createContext(undefined);
```

Now a component that only needs theme won't re-render when notifications change.
</details>

<details>
<summary>Mistake 3: Causing Unnecessary Re-renders</summary>

**Problem:** Not understanding that all context consumers re-render when context value changes

**Why it's wrong:** Can create performance bottlenecks if many components consume a frequently-changing context

**Solution:**
1. Split contexts so components only subscribe to what they need
2. Memoize context values (see Mistake 1)
3. For frequently-changing values, consider alternatives like state management libraries or local state

```typescript
// If your theme context includes user preferences that change often:
// Split them into separate contexts

// Rarely changes - safe for context
<ThemeContext.Provider value={{ colors, mode }}>

// Changes frequently - separate context or different solution
<UserPreferencesContext.Provider value={{ fontSize, language }}>
```
</details>

<details>
<summary>Mistake 4: Not Initializing Context with Undefined</summary>

**Problem:** Providing a default value in createContext, then not checking for undefined in the hook

**Why it's wrong:** Makes it impossible to detect when the hook is used outside a provider, leading to bugs

**Solution:** Always initialize with undefined and check in your custom hook:

```typescript
// ✗ Wrong - default value masks misuse
const ThemeContext = createContext({ theme: 'light' });

function useTheme() {
  return useContext(ThemeContext); // No error if used outside provider!
}

// ✓ Correct - undefined default with error check
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```
</details>

<details>
<summary>Mistake 5: Using Context for All State</summary>

**Problem:** Replacing all props with context, or using context when props/composition would work better

**Why it's wrong:** Context adds complexity and can cause performance issues. Props are simpler and more explicit.

**Solution:** Use context only for truly global state. For parent-child communication or shallow hierarchies, use props:

```typescript
// ✗ Wrong - using context for simple parent-child
<UserContext.Provider value={user}>
  <UserProfile /> {/* uses useUser() hook */}
</UserContext.Provider>

// ✓ Correct - just pass props
<UserProfile user={user} />

// ✓ Context is good when state is needed deep in tree
<UserContext.Provider value={user}>
  <App>
    <Layout>
      <Sidebar>
        <UserMenu /> {/* deep - context makes sense */}
      </Sidebar>
    </Layout>
  </App>
</UserContext.Provider>
```
</details>

<details>
<summary>Mistake 6: Not Splitting Contexts by Update Frequency</summary>

**Problem:** Putting both stable values and frequently-changing values in the same context

**Why it's wrong:** All consumers re-render even if they only use the stable values

**Solution:** Separate stable configuration from dynamic state:

```typescript
// ✗ Wrong - mixing stable and dynamic
const ThemeContext = createContext({
  colors: { ... },        // Stable - changes rarely
  currentTime: new Date() // Dynamic - changes every second
});

// ✓ Correct - separate contexts
const ThemeContext = createContext({ colors: { ... } });
const TimeContext = createContext(new Date());

// Components using ThemeContext won't re-render every second
```
</details>

<details>
<summary>Mistake 7: Forgetting to Wrap App with Provider</summary>

**Problem:** Creating context and custom hook but forgetting to wrap the app with the provider

**Why it's wrong:** The custom hook will throw an error when components try to use it

**Solution:** Always wrap your app (or the part that needs the context) with the provider:

```typescript
// ✗ Wrong - no provider
export default function App() {
  return (
    <div>
      <Header /> {/* useTheme() will throw error */}
    </div>
  );
}

// ✓ Correct - wrapped with provider
export default function App() {
  return (
    <ThemeProvider>
      <div>
        <Header /> {/* useTheme() works */}
      </div>
    </ThemeProvider>
  );
}
```
</details>

## When to Use Context

### Use Context when:
- State needed by many components at different levels
- Prop drilling becomes cumbersome (3+ levels deep)
- Theme, authentication, language settings
- UI state that affects entire app

### Don't Use Context when:
- State only needed by 1-2 components (use props)
- State changes very frequently (can cause performance issues)
- You need advanced features (use Redux/Zustand instead)
- Parent and child relationship is simple (use props)

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

## Further Learning

- [useContext Hook Documentation](https://react.dev/reference/react/useContext)
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [Context Performance](https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions)
