# State Colocation

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 25-30 minutes

## Challenge

Demonstrate state colocation by refactoring a component with poorly organized state. State colocation means keeping state as close as possible to where it's used, improving performance and maintainability.

## Requirements

Your implementation must:
- Create a dashboard with independent widgets (Weather, Counter, UserProfile)
- Each widget manages its own state
- State is NOT lifted to parent unless shared
- Widgets don't re-render when other widgets update
- Demonstrate performance benefits of colocation

## Learning Objectives

- Understand state colocation principles
- Learn when to lift state vs keep it local
- Practice component composition
- Improve performance through proper state placement
- Avoid unnecessary re-renders

## Instructions

1. Run `pnpm install` to install dependencies
2. Read requirements and check tests
3. Implement your solution in `App.tsx`
4. Run `pnpm dev` to test manually
5. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Dashboard contains 3 independent widgets
- [ ] Each widget manages its own state
- [ ] Updating one widget doesn't affect others
- [ ] No unnecessary re-renders
- [ ] Clean component structure
- [ ] All 8 tests pass

## Hints

<details>
<summary>Hint 1: Colocation Principle</summary>

Keep state as close to where it's used as possible:

```typescript
// BAD - state in parent when only one child needs it
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <SiblingA />
      <SiblingB count={count} setCount={setCount} />
    </div>
  );
}

// GOOD - state colocated with component that uses it
function SiblingB() {
  const [count, setCount] = useState(0);
  // ...
}
```
</details>

<details>
<summary>Hint 2: Independent Components</summary>

Each widget should be self-contained:

```typescript
function Counter() {
  const [count, setCount] = useState(0);
  // All counter logic here
  return <div>...</div>;
}

function Weather() {
  const [temp, setTemp] = useState(72);
  // All weather logic here
  return <div>...</div>;
}
```
</details>

<details>
<summary>Hint 3: Verifying No Unnecessary Re-renders</summary>

Use React DevTools Profiler to verify only the updated widget re-renders:

1. Install React DevTools browser extension
2. Open DevTools → Profiler tab
3. Click record (circle icon)
4. Interact with one widget (e.g., increment counter)
5. Stop recording
6. Check the flamegraph - only that widget should show render time
7. Other widgets should not appear in the render tree

If all widgets re-render when one changes, state is lifted too high.
</details>

<details>
<summary>Hint 4: When to Colocate vs When to Lift</summary>

**Colocate state when:**
- State is used by only one component
- Components are independent features
- Parent doesn't need to know about the state
- No siblings need the same state

**Lift state when:**
- Multiple components need the same state
- Parent needs to coordinate children
- Siblings need to communicate
- State represents shared application data

Example: Independent widgets like Counter and Weather should colocate. A form with validation where the submit button needs to know if all fields are valid should lift state.
</details>

<details>
<summary>Hint 5: Component Composition Pattern</summary>

Structure your app with independent, composable components:

```typescript
// Dashboard only composes widgets, doesn't manage their state
function Dashboard() {
  return (
    <div className="dashboard">
      <Counter />
      <Weather />
      <UserProfile />
    </div>
  );
}

// Each widget is self-contained
function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  return (
    <div className="widget">
      <h3>Counter</h3>
      <p>{count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

This pattern maximizes reusability and performance.
</details>

## When to Use State Colocation

State colocation is the right choice when:

- **Independent Features:** Widgets or components that function independently (counters, timers, toggles)
- **No Shared State:** Components don't need to communicate or share data
- **Self-Contained Logic:** All logic for the feature lives in one component
- **Performance Matters:** Avoiding unnecessary re-renders is important
- **Isolated Updates:** Only the component that owns the state updates it

Examples: Dashboard widgets, independent forms, self-contained modals, isolated toggles

## When to Lift State

You should lift state to a common parent when:

- **Shared Data:** Multiple components need access to the same state
- **Sibling Communication:** Two sibling components need to stay in sync
- **Parent Coordination:** Parent needs to coordinate or orchestrate children
- **Derived State:** Parent computes values from children's state
- **Single Source of Truth:** You need one authoritative source for data

Examples: Multi-step forms, accordion where only one panel opens, filtered lists where filter and list are siblings

## Common Mistakes

<details>
<summary>Mistake 1: Lifting State Prematurely</summary>

**Problem:** Putting all state in the parent component "just in case" it's needed later

**Why it's wrong:** Causes unnecessary re-renders of all children whenever any state changes, harming performance

**Solution:** Start with colocated state. Only lift when you have a concrete need for sharing. It's easy to lift later, but harder to optimize premature lifting.

```typescript
// ✗ Wrong - lifting unnecessarily
function Dashboard() {
  const [count, setCount] = useState(0);
  const [temp, setTemp] = useState(72);
  const [user, setUser] = useState(null);

  return (
    <>
      <Counter count={count} setCount={setCount} />
      <Weather temp={temp} setTemp={setTemp} />
      <UserProfile user={user} setUser={setUser} />
    </>
  );
}

// ✓ Correct - each widget manages its own state
function Dashboard() {
  return (
    <>
      <Counter />
      <Weather />
      <UserProfile />
    </>
  );
}
```
</details>

<details>
<summary>Mistake 2: Not Recognizing Independent State</summary>

**Problem:** Treating all state as if it needs to be shared or coordinated

**Why it's wrong:** Creates unnecessary coupling between components that should be independent

**Solution:** Ask: "Does any other component need to read or update this state?" If no, keep it local.
</details>

<details>
<summary>Mistake 3: Over-Engineering with Context</summary>

**Problem:** Using Context or state management libraries for state that could be colocated

**Why it's wrong:** Adds complexity, makes code harder to understand, and can still cause performance issues

**Solution:** Use Context only for truly global state (theme, auth, language). For component-specific state, colocate it.

```typescript
// ✗ Overkill - creating context for widget state
const CounterContext = createContext();

// ✓ Better - just use local state
function Counter() {
  const [count, setCount] = useState(0);
  // ...
}
```
</details>

<details>
<summary>Mistake 4: Forgetting to Measure Performance Impact</summary>

**Problem:** Not verifying that colocation actually improves performance

**Why it's wrong:** Optimization without measurement is guessing. You might not realize you're still causing unnecessary re-renders.

**Solution:** Always use React DevTools Profiler to verify:
- Only the updated component re-renders
- Sibling components don't re-render
- Parent re-renders are minimal

Record before and after refactoring to see the improvement.
</details>

<details>
<summary>Mistake 5: Collocating Shared State</summary>

**Problem:** Keeping state local when multiple components actually need it

**Why it's wrong:** Forces you to lift state later anyway, or leads to duplicated state and sync issues

**Solution:** If state is truly shared (e.g., a selected item that affects multiple views), lift it to the nearest common parent from the start.

Ask: "How many components need this state?" If the answer is more than one, lift it.
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. The tests verify:

- **Component Structure:** Dashboard renders all three widgets (Counter, Weather, UserProfile)
- **State Independence:** Each widget has its own state that doesn't affect others
- **No Prop Drilling:** Widgets don't receive state management props from parent
- **Functional Widgets:** Each widget can be interacted with independently
- **Isolation:** Updating one widget's state doesn't trigger re-renders in other widgets
- **Self-Contained Logic:** All widget logic is contained within the widget component

Run `pnpm test` to verify your implementation. Use React DevTools Profiler to manually verify no unnecessary re-renders occur.

## Further Learning

- [React Docs: State Structure](https://react.dev/learn/choosing-the-state-structure)
- [Kent C. Dodds: State Colocation](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)
- [Colocation vs Lifting State](https://react.dev/learn/sharing-state-between-components)
