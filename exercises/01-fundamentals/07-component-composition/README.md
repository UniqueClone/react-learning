# Component Composition with Children

**Difficulty:** intermediate
**Type:** Build From Scratch
**Estimated Time:** 25-30 minutes

## Challenge

Build a flexible Card component system using the `children` prop and component composition patterns. Create Card, CardHeader, CardBody, and CardFooter components that can be composed together in different ways to create various card layouts.

## Requirements

Your implementation must:
- Create a `Card` component that accepts children
- Create `CardHeader`, `CardBody`, and `CardFooter` components
- All components should accept and render children
- Render at least 3 different card examples with various compositions
- Components should have appropriate styling

## Learning Objectives

- Master the `children` prop and component composition
- Build flexible, reusable component APIs
- Understand composition vs inheritance in React
- Create compound components that work together
- Practice building component libraries

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Create Card, CardHeader, CardBody, and CardFooter components
6. Use these components to create at least 3 different card variations
7. Run `pnpm dev` to test manually
8. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Card component renders children with border and padding
- [ ] CardHeader, CardBody, and CardFooter components all work
- [ ] At least 3 different card variations are displayed
- [ ] Components can be composed in different orders
- [ ] All tests pass

## Hints

<details>
<summary>How do I use the children prop?</summary>

The `children` prop is automatically passed to every component:

```typescript
interface CardProps {
  children: React.ReactNode
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>
}

// Usage
<Card>
  <p>This content becomes children</p>
</Card>
```

</details>

<details>
<summary>What is component composition?</summary>

Component composition is building complex UIs by combining simpler components:

```typescript
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content here</CardBody>
  <CardFooter>Footer text</CardFooter>
</Card>
```

Instead of passing everything as props, you compose components together. This creates more flexible and reusable APIs.

</details>

<details>
<summary>How should I style the components?</summary>

Use inline styles or className. Here's an example:

```typescript
function Card({ children }: CardProps) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px'
    }}>
      {children}
    </div>
  )
}
```

</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
