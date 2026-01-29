# Solution: Code Splitting

## Complete Implementation

```typescript
import { useState, lazy, Suspense } from 'react';
import './index.css';

// Lazy-loaded components
const Dashboard = lazy(() => Promise.resolve({
  default: () => <div className="component"><h2>Dashboard</h2><p>Dashboard content here</p></div>
}));

const Analytics = lazy(() => Promise.resolve({
  default: () => <div className="component"><h2>Analytics</h2><p>Analytics charts here</p></div>
}));

const Settings = lazy(() => Promise.resolve({
  default: () => <div className="component"><h2>Settings</h2><p>Settings options here</p></div>
}));

type Tab = 'dashboard' | 'analytics' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <div className="container">
      <h1>Code Splitting Demo</h1>

      <div className="tabs">
        <button
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={activeTab === 'analytics' ? 'active' : ''}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <Suspense fallback={<div className="loading">Loading...</div>}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'settings' && <Settings />}
      </Suspense>
    </div>
  );
}
```

## Key Concepts

**React.lazy:**
- Dynamic imports for on-demand loading
- Reduces initial bundle size
- Loads code only when needed

**Suspense:**
- Handles loading states declaratively
- Shows fallback while loading
- Works with lazy-loaded components

## Benefits

1. **Smaller initial bundle** - Main bundle excludes lazy components
2. **Faster initial load** - Less JS to parse and execute
3. **Better performance** - Load features as users need them
4. **Automatic code splitting** - Vite/Webpack handles splitting

## Key Takeaways

1. Use **React.lazy** for route-based or feature-based splitting
2. Wrap with **Suspense** to handle loading states
3. Split at **route boundaries** for best results
4. **Measure impact** with bundle analyzer
5. Don't over-split - balance granularity vs overhead

## Further Learning

- [React Docs: Code Splitting](https://react.dev/learn/code-splitting)
- [Web.dev: Code Splitting](https://web.dev/code-splitting/)
