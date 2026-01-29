# useState with Objects - User Profile Editor

**Difficulty:** Beginner
**Type:** Complete Missing Parts
**Estimated Time:** 20-25 minutes

## Challenge

Build a user profile editor that demonstrates how to manage object state in React. You'll learn the crucial concept of immutable updates and how to properly update nested properties.

## Requirements

Your implementation must:
- Display a form with fields for: name, email, age, and bio
- Show the current values in the form inputs
- Update the state when any field changes
- Maintain immutability (don't mutate the state object directly)
- Display the current profile data somewhere on the page
- Use the `useState` hook with an object as the state value

## Learning Objectives

- Managing object state with `useState`
- Understanding immutability in React
- Using the spread operator for object updates
- Handling controlled form inputs with object state
- Updating individual properties without losing others

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Look for `// TODO:` comments in `App.tsx`
4. Complete the missing parts
5. Run `pnpm dev` to test manually in the browser
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Form displays all fields (name, email, age, bio)
- [ ] Inputs are controlled (show current state values)
- [ ] Updating one field doesn't clear others
- [ ] Profile data is displayed on the page
- [ ] State updates are immutable
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1: Initial State Object</summary>

Create an initial state object with all the profile fields:
```typescript
const [profile, setProfile] = useState({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  bio: 'Software developer'
})
```
</details>

<details>
<summary>Hint 2: Updating Object State</summary>

Use the spread operator to create a new object:
```typescript
setProfile({
  ...profile,  // Copy all existing properties
  name: newName  // Override the specific property
})
```
This creates a new object with all the old properties plus the updated one.
</details>

<details>
<summary>Hint 3: Controlled Inputs</summary>

Make inputs controlled by setting their value prop:
```typescript
<input
  value={profile.name}
  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
/>
```
</details>

<details>
<summary>Hint 4: Generic Update Handler</summary>

You can create a reusable handler that works for any field:
```typescript
const handleChange = (field: keyof typeof profile, value: string | number) => {
  setProfile({ ...profile, [field]: value })
}
```
</details>

## Common Mistakes

1. **Direct mutation**: Never do `profile.name = newName`. This mutates the state directly.
2. **Forgetting spread operator**: `setProfile({ name: newName })` loses all other properties.
3. **Not converting input values**: Age input gives a string, but you might want a number.
4. **Uncontrolled inputs**: Forgetting to set the `value` prop makes inputs uncontrolled.

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

## Further Learning

- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [JavaScript Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Controlled Components](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
