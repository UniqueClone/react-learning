# Solution: Prop Drilling Problem

## The Problem Explained

This exercise demonstrates **prop drilling** - an anti-pattern where data passes through multiple component levels that don't use the data themselves. Let's analyze the issues:

### Component Hierarchy

```
App (has user & theme data)
  └── Dashboard (passes props)
      └── Sidebar (passes props)
          └── Navigation (passes props)
              └── UserMenu (passes props)
                  └── UserProfile (finally uses the data!)
```

### Issues Identified

1. **6 levels of nesting** - Data travels through 6 components to reach its destination
2. **5 unnecessary intermediaries** - Dashboard, Sidebar, Navigation, UserMenu don't use the data
3. **Tight coupling** - Every component depends on the User and Theme types
4. **Maintenance nightmare** - Adding a new field requires changes to 6+ files
5. **Prop interface pollution** - Every intermediate component needs type definitions for data it doesn't use
6. **Refactoring difficulty** - Moving UserProfile to a different location requires rewiring all props

### Code Smell Indicators

```typescript
// BAD: Component that only passes props
function Sidebar({ user, theme }: SidebarProps) {
  // This component doesn't use user or theme!
  return (
    <aside>
      <Navigation user={user} theme={theme} />
    </aside>
  );
}
```

### Maintenance Impact

To add a new field like `email`:

1. Update `User` interface ✓
2. Update `DashboardProps` interface
3. Update `SidebarProps` interface
4. Update `NavigationProps` interface
5. Update `UserMenuProps` interface
6. Update `UserProfileProps` interface
7. Pass `email` through `Dashboard`
8. Pass `email` through `Sidebar`
9. Pass `email` through `Navigation`
10. Pass `email` through `UserMenu`
11. Finally use `email` in `UserProfile`

That's **11 changes across 6 files** for a simple addition!

## The Solution: Context API

The React Context API solves prop drilling by providing a way to share data across the component tree without explicitly passing props through every level.

### How Context Works

```typescript
// 1. Create a context
const UserContext = createContext<User | null>(null);

// 2. Provide the value at the top level
function App() {
  const user = { name: 'John', role: 'Developer' };
  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}

// 3. Consume anywhere in the tree
function UserProfile() {
  const user = useContext(UserContext);
  return <div>{user.name}</div>;
}

// Intermediate components don't need to know about user!
function Dashboard() {
  return <Sidebar />; // No user prop needed!
}

function Sidebar() {
  return <UserProfile />; // No user prop needed!
}
```

### Benefits of Context

1. **Decoupling** - Intermediate components don't need to know about data they don't use
2. **Easy maintenance** - Add fields without touching intermediate components
3. **Flexible structure** - Move components freely without rewiring props
4. **Clean interfaces** - Component props only include data they actually use
5. **Reduced boilerplate** - No need to define props for pass-through data

### Refactored with Context

```typescript
import { createContext, useContext, useState } from 'react';

// Create contexts
const UserContext = createContext<User | null>(null);
const ThemeContext = createContext<Theme | null>(null);

function App() {
  const [user] = useState<User>({ /* ... */ });
  const [theme] = useState<Theme>({ /* ... */ });

  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>
        <Dashboard />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Intermediate components are now clean!
function Dashboard() {
  return <Sidebar />; // No props needed
}

function Sidebar() {
  return <Navigation />; // No props needed
}

function Navigation() {
  return <UserMenu />; // No props needed
}

function UserMenu() {
  return <UserProfile />; // No props needed
}

// Only UserProfile consumes the context
function UserProfile() {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  if (!user || !theme) return null;

  return (
    <div style={{ color: theme.primaryColor }}>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
```

### When to Use Context vs Props

**Use Props when:**
- Data is only needed by direct children
- Component relationship is clear and stable
- You want explicit data flow
- Only 1-2 levels of nesting

**Use Context when:**
- Data is needed by deeply nested components
- Many components need the same data
- Intermediate components don't use the data
- You're passing the same props through multiple levels

## Key Takeaways

1. **Prop drilling is a code smell** - It indicates poor component architecture
2. **Intermediate components should be independent** - They shouldn't depend on data they don't use
3. **Context provides elegant solution** - It eliminates unnecessary prop passing
4. **Choose the right tool** - Props for simple cases, Context for complex hierarchies
5. **Maintenance matters** - Design for future changes, not just current needs

## Next Steps

Move on to **Exercise 02: Context API Basics** to learn how to implement the Context pattern and refactor this prop drilling example properly!
