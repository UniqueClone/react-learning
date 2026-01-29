# Solution: useContext - Global State Management

## Complete Solution

```typescript
import { createContext, useContext, useState } from 'react'

// Types
type Theme = 'light' | 'dark'

interface ThemeColors {
  background: string
  text: string
  primary: string
  secondary: string
}

interface ThemeContextType {
  theme: Theme
  colors: ThemeColors
  toggleTheme: () => void
}

// Theme color definitions
const lightTheme: ThemeColors = {
  background: '#ffffff',
  text: '#000000',
  primary: '#007bff',
  secondary: '#f5f5f5',
}

const darkTheme: ThemeColors = {
  background: '#1a1a1a',
  text: '#ffffff',
  primary: '#4dabf7',
  secondary: '#2d2d2d',
}

// Create context with undefined default
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Provider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const colors = theme === 'light' ? lightTheme : darkTheme

  const value: ThemeContextType = {
    theme,
    colors,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Custom hook for consuming context
function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// Component examples using the context

function Header() {
  const { theme, colors, toggleTheme } = useTheme()

  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        padding: '20px',
      }}
    >
      <h2>Header</h2>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

function MainContent() {
  const { colors } = useTheme()

  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        padding: '20px',
        minHeight: '200px',
      }}
    >
      <h2>Main Content</h2>
      <p>This content uses the theme from context!</p>
      <p style={{ color: colors.primary }}>Primary color text</p>
    </div>
  )
}

function Footer() {
  const { colors } = useTheme()

  return (
    <div
      style={{
        backgroundColor: colors.secondary,
        color: colors.text,
        padding: '20px',
      }}
    >
      <h2>Footer</h2>
      <p>Footer content with theme colors</p>
    </div>
  )
}

// App component wrapped with provider
export default function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>Theme System with Context</h1>
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
```

## Explanation

### 1. Creating Context

```typescript
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
```

**Why `undefined` as default?**
- Allows us to detect if hook is used outside provider
- TypeScript helps catch errors at compile time
- Forces proper provider usage

**Alternative with default value:**
```typescript
// Not recommended - hides missing provider errors
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: lightTheme,
  toggleTheme: () => {},
})
```

### 2. Provider Component

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

**Key points:**
- Manages theme state with useState
- Computes colors based on current theme
- Provides value object to context
- Wraps children with Provider component

### 3. Custom Hook

```typescript
function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

**Benefits:**
- Cleaner API for consumers
- Built-in error handling
- Single import for consumers
- Type-safe access

**Without custom hook:**
```typescript
// Consumers would need to:
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

function Component() {
  const context = useContext(ThemeContext)
  // Manual error checking needed
  if (!context) throw new Error(...)
}
```

### 4. Using Context in Components

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

**No prop drilling needed:**
- Component directly accesses theme
- No passing props through intermediaries
- All consumers automatically update

### 5. Wrapping the App

```typescript
export default function App() {
  return (
    <ThemeProvider>
      <div>
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
```

**Provider must wrap consumers:**
- All child components can access context
- Provider is at top level of component tree
- Multiple providers can be nested

## Advanced Patterns

### Combining useReducer with Context

For complex state management:

```typescript
type ThemeAction =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; theme: Theme }

function themeReducer(state: Theme, action: ThemeAction): Theme {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return state === 'light' ? 'dark' : 'light'
    case 'SET_THEME':
      return action.theme
    default:
      return state
  }
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, dispatch] = useReducer(themeReducer, 'light')

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' })
  }

  const setTheme = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', theme })
  }

  // ...
}
```

### Separating State and Dispatch Contexts

Optimize performance by splitting contexts:

```typescript
const ThemeStateContext = createContext<Theme | undefined>(undefined)
const ThemeDispatchContext = createContext<(() => void) | undefined>(undefined)

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={toggleTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  )
}

// Components that only need theme don't re-render when toggleTheme changes
function useThemeState() {
  const context = useContext(ThemeStateContext)
  if (context === undefined) {
    throw new Error('useThemeState must be used within ThemeProvider')
  }
  return context
}

function useThemeDispatch() {
  const context = useContext(ThemeDispatchContext)
  if (context === undefined) {
    throw new Error('useThemeDispatch must be used within ThemeProvider')
  }
  return context
}
```

### Persistent Theme with localStorage

```typescript
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as Theme) || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  // ... rest of provider
}
```

## Performance Considerations

### Memoizing Context Value

```typescript
const value = useMemo(
  () => ({
    theme,
    colors,
    toggleTheme,
  }),
  [theme, colors]
)

return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
```

**Why memoize?**
- Prevents unnecessary re-renders
- Value object changes on every render without memo
- All consumers re-render when value changes

### Splitting Contexts

```typescript
// Instead of one context with everything:
<ThemeContext.Provider value={{ theme, user, settings }}>

// Use multiple contexts:
<ThemeContext.Provider value={theme}>
  <UserContext.Provider value={user}>
    <SettingsContext.Provider value={settings}>
```

Benefits:
- Components only subscribe to what they need
- Fewer unnecessary re-renders
- Better separation of concerns

## Key Takeaways

1. **Context solves prop drilling** - Pass data without intermediary props
2. **Provider pattern** - Wrap consumers with provider component
3. **Custom hooks for context** - Cleaner API and built-in error handling
4. **Initialize with undefined** - Catches missing provider errors
5. **Memoize value object** - Prevents unnecessary re-renders
6. **Don't overuse context** - Only for truly global state

## Common Pitfalls

### 1. Creating New Objects on Every Render

```typescript
// BAD - new object every render
<ThemeContext.Provider value={{ theme, colors, toggleTheme }}>

// GOOD - memoized value
const value = useMemo(() => ({ theme, colors, toggleTheme }), [theme, colors])
<ThemeContext.Provider value={value}>
```

### 2. Not Checking for Undefined

```typescript
// BAD - might be undefined
const context = useContext(ThemeContext)
context.theme // Could error!

// GOOD - check and throw
const context = useContext(ThemeContext)
if (context === undefined) {
  throw new Error('Must be used within provider')
}
return context
```

### 3. Too Much in One Context

```typescript
// BAD - everything in one context
<AppContext.Provider value={{ theme, user, cart, settings, ... }}>

// GOOD - separate concerns
<ThemeContext.Provider>
  <UserContext.Provider>
    <CartContext.Provider>
```

### 4. Using Context for Frequently Changing Values

```typescript
// BAD - causes many re-renders
<MousePositionContext.Provider value={{ x, y }}>

// GOOD - use local state or other solution
```

## Further Learning

- **Context + useReducer**: Powerful state management pattern
- **React Query / SWR**: Better for server state
- **Zustand / Jotai**: Simpler alternatives for client state
- **Redux**: Full-featured state management
- **Context performance**: useMemo, code splitting, React.memo
