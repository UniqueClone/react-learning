# Solution: Render Props Pattern

## Overview

The Render Props pattern is a technique for sharing code between React components using a prop whose value is a function. The component doesn't render anything itself but calls the render prop function with its internal state, allowing the consumer to decide what to render.

## Complete Solution

```typescript
import { useState, useEffect, ReactNode } from 'react';
import './index.css';

interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (position: MousePosition) => ReactNode;
}

function MouseTracker({ render }: MouseTrackerProps) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <>{render(position)}</>;
}

interface ToggleState {
  on: boolean;
  toggle: () => void;
}

interface ToggleProps {
  render: (state: ToggleState) => ReactNode;
}

function Toggle({ render }: ToggleProps) {
  const [on, setOn] = useState(false);

  const toggle = () => setOn((prev) => !prev);

  return <>{render({ on, toggle })}</>;
}

export default function App() {
  return (
    <div className="app">
      <h1>Render Props Pattern</h1>
      <p>Reusable logic through function-as-children</p>

      <section className="demo-section">
        <h2>Mouse Tracker Examples</h2>

        <div className="demo-box">
          <h3>Coordinates Display</h3>
          <MouseTracker
            render={(position) => (
              <div className="coordinates">
                <p>X: {position.x}</p>
                <p>Y: {position.y}</p>
              </div>
            )}
          />
        </div>

        <div className="demo-box">
          <h3>Visual Indicator</h3>
          <MouseTracker
            render={(position) => (
              <div className="mouse-area">
                <div
                  className="mouse-indicator"
                  style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                  }}
                />
                <p className="hint">Move your mouse to see the indicator follow</p>
              </div>
            )}
          />
        </div>
      </section>

      <section className="demo-section">
        <h2>Toggle Examples</h2>

        <div className="demo-box">
          <h3>Button Toggle</h3>
          <Toggle
            render={({ on, toggle }) => (
              <div className="toggle-demo">
                <button onClick={toggle}>Toggle</button>
                <p className="status">Status: {on ? 'ON' : 'OFF'}</p>
              </div>
            )}
          />
        </div>

        <div className="demo-box">
          <h3>Switch Toggle</h3>
          <Toggle
            render={({ on, toggle }) => (
              <div className="toggle-demo">
                <div
                  className={`switch ${on ? 'on' : 'off'}`}
                  onClick={toggle}
                >
                  <div className="switch-handle" />
                </div>
                <p className="status">Status: {on ? 'ON' : 'OFF'}</p>
              </div>
            )}
          />
        </div>
      </section>
    </div>
  );
}
```

## Key Implementation Details

### 1. Render Prop Type Definition

```typescript
interface MouseTrackerProps {
  render: (position: MousePosition) => ReactNode;
}
```

The render prop is a function that:
- Receives the component's internal state as arguments
- Returns React elements (ReactNode)
- Gives full control to the consumer about what to render

### 2. Mouse Position Tracking

```typescript
useEffect(() => {
  const handleMouseMove = (event: MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);
```

Important points:
- Event listener attached on mount
- Cleanup function removes listener on unmount
- Empty dependency array ensures effect runs once

### 3. Calling the Render Prop

```typescript
return <>{render(position)}</>;
```

The component:
- Calls the render prop function with its state
- Renders whatever the function returns
- Doesn't make assumptions about what to render

### 4. Multiple Consumers

```typescript
<MouseTracker
  render={(position) => (
    <div>X: {position.x}, Y: {position.y}</div>
  )}
/>

<MouseTracker
  render={(position) => (
    <div style={{ left: position.x, top: position.y }}>Indicator</div>
  )}
/>
```

Each consumer can render completely different UIs using the same logic.

## Benefits of This Pattern

1. **Maximum Flexibility**: Consumer has full control over rendering
2. **Logic Reusability**: Same logic, many different UIs
3. **Type Safety**: TypeScript ensures correct usage
4. **Explicit Dependencies**: Props make dependencies clear
5. **No Naming Collisions**: Unlike HOCs, no prop name conflicts

## Comparison with Other Patterns

### vs. Custom Hooks

**Render Props:**
```typescript
<MouseTracker render={(pos) => <div>{pos.x}</div>} />
```

**Custom Hook:**
```typescript
const pos = useMousePosition();
return <div>{pos.x}</div>;
```

Hooks are simpler for most cases, but render props work in class components.

### vs. Compound Components

**Render Props:**
- More flexible, consumer controls everything
- Less structured, more boilerplate
- Better for varying use cases

**Compound Components:**
- More structured, pre-defined parts
- Less flexible, specific use cases
- Better DX for common patterns

### vs. HOCs

**Render Props:**
- More explicit, no naming conflicts
- Composition clear in JSX
- Can be verbose with nesting

**HOCs:**
- Less explicit, potential naming conflicts
- Composition happens outside JSX
- Static composition (hard to debug)

## Alternative Syntax: Children as Function

```typescript
interface MouseTrackerProps {
  children: (position: MousePosition) => ReactNode;
}

function MouseTracker({ children }: MouseTrackerProps) {
  // ... same logic
  return <>{children(position)}</>;
}

// Usage
<MouseTracker>
  {(position) => <div>{position.x}, {position.y}</div>}
</MouseTracker>
```

This is often preferred because:
- More natural JSX syntax
- Looks like composition
- Still provides same flexibility

## Common Use Cases

Render props are ideal for:
- Mouse tracking and gestures
- Window dimensions and responsive logic
- Scroll position tracking
- Toggle and disclosure logic
- Data fetching with different display states
- Animation and transition logic

## Trade-offs and Considerations

### Advantages

- Extremely flexible
- No prop naming conflicts
- Works in class components
- Clear data flow
- Easy to understand data source

### Disadvantages

- Can create "pyramid of doom" with nesting
- More verbose than hooks
- Performance: creates new function on each render
- Less common in modern React (hooks preferred)

## When to Use This Pattern

**Use when:**
- Building component libraries (pre-hooks era)
- Need maximum rendering flexibility
- Working with class components
- Consumer needs full control over rendering
- Logic needs to be used in many different ways

**Avoid when:**
- Simple use case (use hooks instead)
- You control both provider and consumer
- Multiple render props would nest deeply
- Modern React codebase (prefer hooks)

## Migration to Hooks

Most render props can be converted to custom hooks:

**Before (Render Props):**
```typescript
<MouseTracker render={(pos) => <div>{pos.x}</div>} />
```

**After (Custom Hook):**
```typescript
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

// Usage
const position = useMousePosition();
return <div>{position.x}</div>;
```

Hooks are simpler and more composable for function components.

## Key Takeaways

1. **Render props** provide maximum flexibility through inversion of control
2. **The pattern** shares logic while letting consumers control rendering
3. **Type safety** is excellent with TypeScript function types
4. **Multiple consumers** can use the same logic completely differently
5. **Children as function** syntax is often more natural
6. **Hooks have largely replaced** render props in modern React
7. **Still valuable** in component libraries and for understanding patterns
8. **Consider custom hooks** for new code unless you need class component support
