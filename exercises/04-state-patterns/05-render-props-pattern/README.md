# Render Props Pattern

**Difficulty:** Intermediate
**Type:** Complete Missing Code
**Estimated Time:** 25-30 minutes

## Challenge

Build a mouse position tracker and toggle components using the Render Props pattern. This pattern provides component logic reusability by passing a function as a prop that receives internal state and returns React elements. It's a powerful way to share behavior between components without using HOCs or hooks.

## Requirements

Your implementation must:
- Create a MouseTracker component that tracks mouse position
- Create a Toggle component that manages boolean state
- Both components should use render props to expose their state
- Implement example consumers of both components
- Handle proper TypeScript typing for render prop functions
- Show multiple different visualizations of the same data
- Work with the test suite provided

## Learning Objectives

- Master the Render Props pattern
- Understand inversion of control in components
- Learn how to create reusable stateful logic
- Practice TypeScript with function props
- Compare render props to hooks and compound components

## Instructions

1. Run `pnpm install` to install dependencies
2. Look for `TODO` comments in the code
3. Implement the missing functionality
4. Run `pnpm dev` to test your implementation
5. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] MouseTracker exposes x and y coordinates via render prop
- [ ] Toggle exposes on state and toggle function via render prop
- [ ] Multiple different visualizations of mouse position work
- [ ] Multiple different uses of toggle work
- [ ] Proper TypeScript types for all render prop functions
- [ ] All 8 tests pass

## Hints

<details>
<summary>Hint 1: Render Prop Function Type</summary>

The render prop is a function that receives state and returns JSX:

```typescript
interface MouseTrackerProps {
  render: (position: { x: number; y: number }) => React.ReactNode;
}
```
</details>

<details>
<summary>Hint 2: MouseMove Event</summary>

Track mouse position with the mousemove event:

```typescript
useEffect(() => {
  const handleMouseMove = (event: MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };
  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);
```
</details>

<details>
<summary>Hint 3: Alternative Syntax</summary>

Render props can be used in two ways:
```typescript
// As a prop named 'render'
<MouseTracker render={(pos) => <div>{pos.x}, {pos.y}</div>} />

// As children function
<MouseTracker>
  {(pos) => <div>{pos.x}, {pos.y}</div>}
</MouseTracker>
```
</details>

## Testing

Run `pnpm test` to check your implementation. All tests should pass when you're done.
