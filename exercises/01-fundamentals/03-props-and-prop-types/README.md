# Props and Prop Types

**Difficulty:** beginner
**Type:** Complete Missing Parts
**Estimated Time:** 15-20 minutes

## Challenge

Learn how to pass data between React components using props and define prop types using TypeScript interfaces. You'll create a `Greeting` component that accepts name, age, and an optional location prop.

## Learning Objectives

- Understand how to pass props from parent to child components
- Define TypeScript interfaces for component props
- Work with required and optional props
- Use prop destructuring in function components
- Implement conditional rendering based on optional props

## Instructions

1. Run `pnpm install` to install dependencies
2. Look for `TODO` comments in [src/App.tsx](src/App.tsx)
3. Complete the `GreetingProps` interface with proper TypeScript types
4. Update the `Greeting` component to accept and use props
5. Render multiple `Greeting` components with different prop values
6. Run `pnpm dev` to test your implementation
7. Run `pnpm test` to verify all tests pass

## Requirements

- [ ] Define a `GreetingProps` interface with `name` (string), `age` (number), and `location` (optional string)
- [ ] Update the `Greeting` component to accept props using the interface
- [ ] Destructure props in the function parameters
- [ ] Display the name in an `<h2>` element
- [ ] Display the age in a `<p>` element (e.g., "Age: 25")
- [ ] Conditionally display the location only if it's provided
- [ ] Render three `Greeting` components in `App`:
  - Alice, age 25 (no location)
  - Bob, age 30, location "New York"
  - Charlie, age 35 (no location)

## Hints

<details>
<summary>How do I define an optional property in TypeScript?</summary>

Use a question mark `?` after the property name:

```typescript
interface MyProps {
  required: string
  optional?: string
}
```

</details>

<details>
<summary>How do I destructure props in a function component?</summary>

You can destructure props directly in the function parameters:

```typescript
function MyComponent({ name, age }: MyComponentProps) {
  return <div>{name} is {age} years old</div>
}
```

</details>

<details>
<summary>How do I conditionally render the location?</summary>

Use the logical AND operator `&&`:

```typescript
{location && <p>Location: {location}</p>}
```

This will only render the `<p>` element if `location` has a truthy value.

</details>

<details>
<summary>How do I pass props to a component?</summary>

Pass props as attributes on the component:

```typescript
<Greeting name="Alice" age={25} />
<Greeting name="Bob" age={30} location="New York" />
```

Note: String values can be in quotes, but numbers and other values need curly braces.

</details>

## Testing

Run `pnpm test` to check your implementation. All tests should pass when you're done.

The tests verify:
- All three greetings are rendered
- Names are displayed correctly
- Ages are displayed correctly
- Location is shown only for Bob (who has a location)
- The component has proper TypeScript types

## Solution

When you're stuck or want to compare your solution, check [SOLUTION.md](SOLUTION.md).
