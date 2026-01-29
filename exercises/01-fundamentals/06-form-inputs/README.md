# Controlled Form Inputs

**Difficulty:** intermediate
**Type:** Complete Missing Parts
**Estimated Time:** 20-25 minutes

## Challenge

Complete a registration form component using controlled inputs. You'll implement state management for multiple input types (text, email, password, checkbox, select), handle form submissions, and add validation logic.

## Learning Objectives

- Master controlled component pattern for form inputs
- Handle different input types (text, email, password, checkbox, select)
- Implement form validation
- Prevent default form submission behavior
- Manage complex form state with multiple fields
- Display validation errors and success messages

## Instructions

1. Run `pnpm install` to install dependencies
2. Open [src/App.tsx](src/App.tsx)
3. Look for `TODO` comments in the code
4. Implement the missing state management for each form field
5. Complete the form submission handler with validation
6. Add error display logic
7. Run `pnpm dev` to test your implementation
8. Run `pnpm test` to verify all tests pass

## Requirements

- [ ] All form inputs are controlled (value from state)
- [ ] Form submission is handled correctly (preventDefault)
- [ ] Validation checks for:
  - Name must be at least 2 characters
  - Email must be valid format
  - Password must be at least 8 characters
  - Terms must be accepted
- [ ] Error messages display for validation failures
- [ ] Success message displays after valid submission
- [ ] All tests pass

## Hints

<details>
<summary>What is a controlled component?</summary>

A controlled component is an input whose value is controlled by React state:

```typescript
const [name, setName] = useState('')

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

The input's value always reflects the state, and state updates on every change.
</details>

<details>
<summary>How do I handle different input types?</summary>

**Text/Email/Password:**
```typescript
onChange={(e) => setValue(e.target.value)}
```

**Checkbox:**
```typescript
onChange={(e) => setChecked(e.target.checked)}
```

**Select:**
```typescript
onChange={(e) => setSelected(e.target.value)}
```
</details>

<details>
<summary>How do I validate an email?</summary>

Use a simple regex pattern:
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isValidEmail = emailRegex.test(email)
```

Or use the built-in email input validation:
```typescript
<input type="email" />
```
</details>

<details>
<summary>How do I prevent form submission?</summary>

Use `preventDefault()` on the form submit event:
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // Your validation and submission logic
}
```
</details>

## Testing

Run `pnpm test` to verify your implementation. The tests check:
- All form fields are rendered
- Inputs update correctly when typing
- Form submission validation works
- Error messages display correctly
- Success state is shown after valid submission

## Solution

When you're done or need help, check [SOLUTION.md](SOLUTION.md) for a complete implementation with explanations.
