# Solution: State Colocation

## Complete Implementation

```typescript
import { useState } from 'react';
import './index.css';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="widget">
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

function Weather() {
  const [temperature, setTemperature] = useState(72);

  return (
    <div className="widget">
      <h2>Weather</h2>
      <p>Temperature: {temperature}°F</p>
      <button onClick={() => setTemperature(temperature + 1)}>Warmer</button>
      <button onClick={() => setTemperature(temperature - 1)}>Cooler</button>
    </div>
  );
}

function UserProfile() {
  const [name, setName] = useState('Guest');

  return (
    <div className="widget">
      <h2>User Profile</h2>
      <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <p>Hello, {name}!</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="dashboard">
        <Counter />
        <Weather />
        <UserProfile />
      </div>
    </div>
  );
}
```

## Key Concepts

### State Colocation Benefits

1. **Performance** - Components only re-render when their own state changes
2. **Maintainability** - State logic is with the component that uses it
3. **Reusability** - Components are self-contained and portable
4. **Simplicity** - No prop drilling, less complexity

### When to Colocate vs Lift State

**Colocate (keep local):**
- State used by only one component
- Independent widgets/features
- UI state (modals, dropdowns, form inputs)

**Lift state:**
- State shared by multiple components
- Data that needs synchronization
- State that affects parent rendering

## Key Takeaways

1. **Keep state close to where it's used**
2. **Don't lift state until you need to share it**
3. **Colocated state improves performance**
4. **Independent components are easier to maintain**
5. **Avoid unnecessary coupling between components**

## Further Learning

- [Kent C. Dodds: State Colocation](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)
- [React Docs: Choosing State Structure](https://react.dev/learn/choosing-the-state-structure)
