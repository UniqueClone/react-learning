# Code Splitting with React.lazy

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 25-30 minutes

## Challenge

Implement code splitting using React.lazy and Suspense to load components on demand. This reduces initial bundle size and improves load times by splitting code into smaller chunks that load only when needed.

## Requirements

Your implementation must:
- Use React.lazy() to lazy-load heavy components
- Wrap lazy components with Suspense boundary
- Show loading fallback while components load
- Implement tab navigation that loads components on demand
- Demonstrate bundle splitting benefits

## Learning Objectives

- Master React.lazy and Suspense
- Understand dynamic imports
- Learn when to use code splitting
- Practice performance optimization
- Measure bundle size improvements

## Instructions

1. Run `pnpm install` to install dependencies
2. Read requirements and check tests
3. Implement your solution in `App.tsx`
4. Run `pnpm dev` to test manually
5. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Components loaded with React.lazy
- [ ] Suspense boundary with loading fallback
- [ ] Tab navigation between components
- [ ] Loading indicator shown while loading
- [ ] All 8 tests pass

## Hints

<details>
<summary>Hint 1: React.lazy Syntax</summary>

```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```
</details>

<details>
<summary>Hint 2: Conditional Lazy Loading</summary>

Load components only when needed:

```typescript
{activeTab === 'dashboard' && (
  <Suspense fallback={<div>Loading...</div>}>
    <Dashboard />
  </Suspense>
)}
```
</details>

## Further Learning

- [React Docs: React.lazy](https://react.dev/reference/react/lazy)
- [React Docs: Suspense](https://react.dev/reference/react/Suspense)
- [Code Splitting Guide](https://react.dev/learn/code-splitting)
