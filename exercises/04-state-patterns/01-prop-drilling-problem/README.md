# Prop Drilling Problem

**Difficulty:** Beginner
**Type:** Fix Broken Code
**Estimated Time:** 15-20 minutes

## Problem

This exercise demonstrates the "prop drilling" problem - a common code smell where data needs to pass through multiple levels of components that don't use the data themselves, just to reach deeply nested child components.

The current implementation has 5+ levels of nested components, all passing props down the chain. While the code works functionally, it's messy, hard to maintain, and violates the DRY principle. Your task is to identify the problem and understand why this is considered a code smell.

## Learning Objectives

- Recognize prop drilling anti-pattern in React applications
- Understand the maintainability issues with excessive prop passing
- Experience the pain points of tightly coupled component hierarchies
- Prepare for learning Context API as a solution (next exercise)

## Instructions

1. Run `pnpm install` to install dependencies
2. Run `pnpm dev` to see the working (but messy) component in action
3. Run `pnpm test` to verify all tests pass
4. Examine the code structure and identify the problems
5. Read the SOLUTION.md to understand the issues and learn about better approaches

## Tasks

- [ ] Review the deeply nested component structure
- [ ] Count how many levels of prop drilling exist
- [ ] Identify components that only pass props without using them
- [ ] Note how adding a new prop would require changes to multiple files
- [ ] Consider how this scales with application complexity
- [ ] Run tests to confirm functionality (they should all pass)
- [ ] Read SOLUTION.md to learn about Context API as the solution

## Hints

<details>
<summary>Hint 1: What is prop drilling?</summary>
Prop drilling occurs when you pass data through components that don't need it, just to get it to deeply nested children. Look for components that receive props only to pass them down.
</details>

<details>
<summary>Hint 2: Count the levels</summary>
Start from the top App component and count how many levels deep the user data travels before being used in the actual display components.
</details>

<details>
<summary>Hint 3: Maintenance nightmare</summary>
Imagine adding a new field like "email". How many files would you need to modify? This is the key problem with prop drilling.
</details>

<details>
<summary>Hint 4: Identifying "Proxy" Components</summary>

Look for components that have this pattern:
```tsx
function MiddleComponent({ user, settings }: Props) {
  return <ChildComponent user={user} settings={settings} />;
}
```

These "proxy" or "pass-through" components don't use the props themselves - they only exist to pass data to children. This is the clearest sign of prop drilling.
</details>

<details>
<summary>Hint 5: Testing the Brittleness</summary>

To see how brittle this pattern is, imagine these scenarios:
1. Adding a new field to user (email, avatar, role)
2. Reordering components in the tree
3. Reusing a deep component in a different part of the app

Each scenario requires touching multiple files. Good architecture should minimize this coupling.
</details>

## When Prop Drilling is OK

Not all prop passing is bad! Prop drilling is acceptable and even preferred in these cases:

### ✓ When to Use Props (Not a Problem):

**1-2 Levels Deep:**
```tsx
<Layout>
  <Header user={user} /> {/* Direct child - props are fine */}
</Layout>
```

**Closely Related Components:**
```tsx
<Form onSubmit={handleSubmit}>
  <FormInput name="email" /> {/* Parent-child relationship */}
</Form>
```

**Data Used by Intermediate Components:**
```tsx
function UserSection({ user }) {
  // UserSection uses user AND passes it down
  return (
    <div>
      <h2>Welcome {user.name}</h2>
      <UserProfile user={user} />
    </div>
  );
}
```

### ✗ When Props Become a Problem:

**3+ Levels of Drilling:**
```tsx
App → Layout → Container → Section → Card → UserDisplay
// user prop passed through 5 levels!
```

**Components That Don't Use the Props:**
```tsx
function Container({ user }) {
  // Container doesn't use user, just passes it
  return <Section user={user} />;
}
```

**Many Props Being Drilled:**
```tsx
// Passing 5+ unrelated props through multiple levels
<Component
  user={user}
  theme={theme}
  settings={settings}
  config={config}
  permissions={permissions}
/>
```

## When to Refactor: Decision Checklist

Use this checklist to decide if you should refactor prop drilling:

- [ ] **Depth Check:** Props pass through 3+ levels without being used by intermediates?
- [ ] **Proxy Component Check:** Multiple components exist only to pass props down?
- [ ] **Maintenance Pain:** Adding a new prop requires editing 4+ files?
- [ ] **Reusability Issue:** Can't reuse deep component elsewhere without the full parent chain?
- [ ] **Coupling Problem:** Changes in one component force changes in unrelated components?
- [ ] **Testing Difficulty:** Testing requires setting up entire component hierarchy?

**If you checked 2+:** Consider Context API or component composition

**If you checked 4+:** Definitely refactor - this is causing real problems

**If you checked 0-1:** Props are probably fine - don't over-engineer

## Common Mistakes

<details>
<summary>Mistake 1: Using Context for Everything</summary>

**Problem:** After learning about Context, using it for all data instead of props

**Why it's wrong:** Context adds complexity and can hurt performance. Props are simpler for direct parent-child communication.

**Solution:** Use props for 1-2 levels, Context only when drilling gets painful (3+ levels).

```tsx
// ✗ Overkill - using context for simple parent-child
const ButtonTextContext = createContext();

function Parent() {
  return (
    <ButtonTextContext.Provider value="Click me">
      <Child />
    </ButtonTextContext.Provider>
  );
}

// ✓ Better - just use props
function Parent() {
  return <Child buttonText="Click me" />;
}
```
</details>

<details>
<summary>Mistake 2: Not Recognizing When Drilling is Acceptable</summary>

**Problem:** Thinking ANY prop passing is "prop drilling" and needs to be fixed

**Why it's wrong:** Props are the primary way to pass data in React. Not all prop passing is a problem.

**Solution:** Prop drilling only becomes an issue with 3+ levels of components that don't use the data. 1-2 levels is normal and fine.
</details>

<details>
<summary>Mistake 3: Ignoring Component Composition as a Solution</summary>

**Problem:** Only thinking of Context as the solution to prop drilling

**Why it's wrong:** Sometimes the real problem is poor component structure. Composition can solve drilling without Context.

**Solution:** Consider passing children instead of drilling props:

```tsx
// Before: Prop drilling
function Page({ user }) {
  return <Layout user={user}><Content user={user} /></Layout>;
}

// After: Composition
function Page({ user }) {
  return (
    <Layout>
      <Content user={user} />
    </Layout>
  );
}
```

Now Layout doesn't need the user prop at all.
</details>

<details>
<summary>Mistake 4: Premature Optimization</summary>

**Problem:** Refactoring prop drilling before it's actually causing problems

**Why it's wrong:** Adds complexity before you need it. Start simple, refactor when pain points emerge.

**Solution:** Wait until you have concrete problems (editing many files, hard to test, can't reuse components) before refactoring. Two levels of props is not worth optimizing.
</details>

<details>
<summary>Mistake 5: Not Considering Component Colocation</summary>

**Problem:** Keeping state high in the tree and drilling down, when state could be moved closer to where it's used

**Why it's wrong:** Sometimes the real solution is moving state down, not adding Context or changing architecture.

**Solution:** If only deeply nested components use data, consider moving the state to those components:

```tsx
// Before: State at top, drilled down
function App() {
  const [count, setCount] = useState(0);
  return <Layout><Container><Counter count={count} setCount={setCount} /></Container></Layout>;
}

// After: State colocated
function App() {
  return <Layout><Container><Counter /></Container></Layout>;
}

function Counter() {
  const [count, setCount] = useState(0);
  // No drilling needed!
}
```
</details>

## Solution

Once you've examined the code and understood the problems, check SOLUTION.md for a detailed explanation and learn about Context API as a better solution.

## Further Learning

- [React Docs: Passing Props to Components](https://react.dev/learn/passing-props-to-a-component) - Understanding props fundamentals
- [React Docs: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context) - When and how to use Context
- [Kent C. Dodds: Prop Drilling](https://kentcdodds.com/blog/prop-drilling) - Understanding the problem and solutions
- [Component Composition](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) - Using composition to avoid drilling
- [When to Use Context vs Props](https://blog.logrocket.com/react-context-api-deep-dive-examples/) - Decision-making guide
