# useReducer - Basics

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 25-30 minutes

## Challenge

Build a complex registration form using `useReducer` instead of multiple `useState` calls. Learn when and why to use useReducer for managing complex state with multiple related values and actions.

## Requirements

Your implementation must:
- Use `useReducer` to manage form state (username, email, password, acceptTerms)
- Define action types: `UPDATE_FIELD`, `RESET_FORM`, `SET_ERRORS`, `SUBMIT`
- Create a reducer function with TypeScript discriminated unions
- Handle form field updates through dispatch
- Implement validation logic (all fields required, terms must be accepted)
- Display validation errors
- Reset form to initial state
- Show success message on valid submission
- All state updates must be immutable

## Learning Objectives

- Understanding when to use useReducer vs useState
- Learning reducer pattern and action/reducer architecture
- Using TypeScript discriminated unions for type-safe actions
- Managing complex state transitions
- Keeping state updates immutable
- Centralizing state logic in one place

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually in the browser
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Form has username, email, password, and acceptTerms fields
- [ ] All field updates go through reducer
- [ ] Validation shows errors for empty required fields
- [ ] Validation requires terms acceptance
- [ ] Submit button triggers validation
- [ ] Valid form shows success message
- [ ] Reset button clears all fields and errors
- [ ] TypeScript types are properly defined
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1: FormState Type</summary>

```typescript
interface FormState {
  username: string
  email: string
  password: string
  acceptTerms: boolean
  errors: Record<string, string>
  submitted: boolean
}
```
</details>

<details>
<summary>Hint 2: Action Types with Discriminated Unions</summary>

```typescript
type FormAction =
  | { type: 'UPDATE_FIELD'; field: string; value: string | boolean }
  | { type: 'RESET_FORM' }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'SUBMIT' }
```

Discriminated unions ensure type safety - TypeScript knows which properties exist for each action type.
</details>

<details>
<summary>Hint 3: Reducer Structure</summary>

```typescript
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {} // Clear errors on input
      }
    case 'RESET_FORM':
      return initialState
    // ... handle other cases
    default:
      return state
  }
}
```
</details>

<details>
<summary>Hint 4: Using useReducer</summary>

```typescript
const initialState: FormState = {
  username: '',
  email: '',
  password: '',
  acceptTerms: false,
  errors: {},
  submitted: false,
}

const [state, dispatch] = useReducer(formReducer, initialState)
```
</details>

<details>
<summary>Hint 5: Dispatching Actions</summary>

```typescript
// Update field
dispatch({
  type: 'UPDATE_FIELD',
  field: 'username',
  value: 'john'
})

// Reset form
dispatch({ type: 'RESET_FORM' })

// Set errors
dispatch({
  type: 'SET_ERRORS',
  errors: { username: 'Username is required' }
})
```
</details>

<details>
<summary>Hint 6: Validation Logic</summary>

```typescript
const validate = () => {
  const errors: Record<string, string> = {}

  if (!state.username) errors.username = 'Username is required'
  if (!state.email) errors.email = 'Email is required'
  if (!state.password) errors.password = 'Password is required'
  if (!state.acceptTerms) errors.terms = 'Must accept terms'

  return errors
}
```
</details>

## Common Mistakes

1. **Mutating state directly**: Always return a new object, never modify the existing state
2. **Forgetting default case**: Always include a default case in switch statements
3. **Not using discriminated unions**: Makes actions harder to type-check
4. **Complex logic in component**: Put state logic in the reducer, not the component
5. **Wrong field name in UPDATE_FIELD**: Use computed property names `[action.field]`

## When to Use useReducer vs useState

Use **useState** when:
- State is simple (single value)
- Updates are straightforward
- State pieces are independent

Use **useReducer** when:
- State is complex (multiple related values)
- Next state depends on previous state
- State has complex update logic
- Multiple actions can modify state
- You want to centralize state logic

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

## Further Learning

- [useReducer Hook Documentation](https://react.dev/reference/react/useReducer)
- [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [TypeScript Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- [Immer](https://immerjs.github.io/immer/) - Library for easier immutable updates
