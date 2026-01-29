# Solution: Context API Basics

## Complete Implementation

```typescript
import { createContext, useContext, useState, ReactNode } from 'react';
import './index.css';

// User interface
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Context value interface
interface UserContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context
const UserContext = createContext<UserContextValue | undefined>(undefined);

// Custom hook for consuming context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value: UserContextValue = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Header component using context
function Header() {
  const { user, isAuthenticated, login, logout } = useUser();

  const handleLogin = () => {
    login({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Senior Developer',
    });
  };

  return (
    <header className="header">
      <div>
        <h2>User Dashboard</h2>
        {isAuthenticated && user && (
          <div className="user-info">
            <div className="user-avatar">{user.name.charAt(0)}</div>
            <div>
              <div>{user.name}</div>
              <div className="welcome">{user.role}</div>
            </div>
          </div>
        )}
      </div>
      <div>
        <span
          data-testid="auth-status"
          className={`auth-status ${isAuthenticated ? 'authenticated' : 'unauthenticated'}`}
        >
          {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
        </span>
        {isAuthenticated ? (
          <button onClick={logout} className="logout">Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </header>
  );
}

// Deeply nested UserProfile - no prop drilling!
function UserProfile() {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated || !user) {
    return <div className="protected-message">Please log in to view your profile</div>;
  }

  return (
    <div className="user-profile" data-testid="user-profile">
      <h3>User Profile</h3>
      <p data-testid="user-name"><strong>Name:</strong> {user.name}</p>
      <p data-testid="user-email"><strong>Email:</strong> {user.email}</p>
      <p data-testid="user-role"><strong>Role:</strong> {user.role}</p>
      <p><strong>ID:</strong> {user.id}</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content">
      <h3>Profile Content</h3>
      <UserProfile />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Sidebar</h3>
      <Content />
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <Sidebar />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <div className="app">
        <h1>Context API Example</h1>
        <Header />
        <Dashboard />
      </div>
    </UserProvider>
  );
}
```

## Key Concepts

### 1. Creating Context
- Use `createContext` with TypeScript types
- Default to `undefined` to catch missing Provider

### 2. Custom Hook Pattern
- Validates Provider existence
- Simplifies consumer code
- Better error messages

### 3. Provider Component
- Manages state internally
- Exposes minimal API
- Includes computed values

### 4. No Prop Drilling
- Components access data directly
- Intermediate components stay clean
- Easy refactoring

## When to Use Context

**Good:** Authentication, theming, localization
**Bad:** Frequently changing data, form state, simple parent-child

## Key Takeaways

1. Context eliminates prop drilling
2. Custom hooks improve developer experience
3. Type safety prevents runtime errors
4. Split contexts by concern for better performance
5. Don't overuse - props are fine for nearby components
