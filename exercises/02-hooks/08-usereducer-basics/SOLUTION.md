# Solution: useReducer - Basics

## Complete Solution

```typescript
import { useReducer } from 'react'

// Form state type
interface FormState {
  username: string
  email: string
  password: string
  acceptTerms: boolean
  errors: Record<string, string>
  submitted: boolean
}

// Action types using discriminated unions
type FormAction =
  | { type: 'UPDATE_FIELD'; field: string; value: string | boolean }
  | { type: 'RESET_FORM' }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'SUBMIT' }

// Initial state
const initialState: FormState = {
  username: '',
  email: '',
  password: '',
  acceptTerms: false,
  errors: {},
  submitted: false,
}

// Reducer function
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {}, // Clear errors when user types
        submitted: false,
      }
    case 'RESET_FORM':
      return initialState
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
        submitted: false,
      }
    case 'SUBMIT':
      return {
        ...state,
        submitted: true,
        errors: {},
      }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleInputChange = (field: string, value: string | boolean) => {
    dispatch({ type: 'UPDATE_FIELD', field, value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const errors: Record<string, string> = {}
    if (!state.username) errors.username = 'Username is required'
    if (!state.email) errors.email = 'Email is required'
    if (!state.password) errors.password = 'Password is required'
    if (!state.acceptTerms) errors.terms = 'Must accept terms'

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors })
    } else {
      dispatch({ type: 'SUBMIT' })
    }
  }

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' })
  }

  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={state.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
          {state.errors.username && <p style={{ color: 'red' }}>{state.errors.username}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={state.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          {state.errors.email && <p style={{ color: 'red' }}>{state.errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={state.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
          {state.errors.password && <p style={{ color: 'red' }}>{state.errors.password}</p>}
        </div>

        <div>
          <label htmlFor="acceptTerms">
            <input
              id="acceptTerms"
              type="checkbox"
              checked={state.acceptTerms}
              onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
            />
            Accept Terms
          </label>
          {state.errors.terms && <p style={{ color: 'red' }}>{state.errors.terms}</p>}
        </div>

        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {state.submitted && (
          <div style={{ color: 'green' }}>
            <p>Registration successful!</p>
          </div>
        )}
      </form>
    </div>
  )
}
```

## Explanation

### 1. Defining State Type

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

**Why include errors and submitted in state?**
- All related form state in one place
- Reducer can manage error lifecycle
- Single source of truth

### 2. Discriminated Unions for Actions

```typescript
type FormAction =
  | { type: 'UPDATE_FIELD'; field: string; value: string | boolean }
  | { type: 'RESET_FORM' }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'SUBMIT' }
```

**Benefits:**
- TypeScript knows which properties each action has
- Autocomplete works in reducer
- Compile-time safety for action creators
- Self-documenting code

### 3. Reducer Pattern

```typescript
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {},
      }
    // ...
    default:
      return state
  }
}
```

**Key points:**
- Pure function (no side effects)
- Always returns new state
- Switch statement on action.type
- Default case returns unchanged state
- Computed property names: `[action.field]`

### 4. Using useReducer

```typescript
const [state, dispatch] = useReducer(formReducer, initialState)
```

Similar to useState, but:
- First argument: reducer function
- Second argument: initial state
- Returns: [state, dispatch]

### 5. Dispatching Actions

```typescript
dispatch({
  type: 'UPDATE_FIELD',
  field: 'username',
  value: 'john'
})
```

**Dispatch:**
- Takes an action object
- Calls reducer with current state and action
- Updates state with reducer's return value
- Triggers re-render

### 6. Centralized Validation

Validation logic lives in component, but errors managed by reducer:

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  const errors: Record<string, string> = {}
  // ... validation logic ...

  if (Object.keys(errors).length > 0) {
    dispatch({ type: 'SET_ERRORS', errors })
  } else {
    dispatch({ type: 'SUBMIT' })
  }
}
```

## When to Use useReducer

### Choose useReducer when:

1. **Multiple related values**
   ```typescript
   // BAD with useState - too many pieces
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [errors, setErrors] = useState({})
   const [submitted, setSubmitted] = useState(false)

   // GOOD with useReducer - one piece
   const [state, dispatch] = useReducer(formReducer, initialState)
   ```

2. **Complex state transitions**
   ```typescript
   // Multiple state updates needed together
   dispatch({ type: 'SUBMIT' })
   // vs
   setSubmitted(true)
   setErrors({})
   setLoading(false)
   ```

3. **State depends on previous state**
   ```typescript
   case 'ADD_TO_CART':
     return {
       ...state,
       items: [...state.items, action.item],
       total: state.total + action.item.price
     }
   ```

### Choose useState when:

1. **Simple, independent values**
   ```typescript
   const [count, setCount] = useState(0)
   const [name, setName] = useState('')
   ```

2. **Straightforward updates**
   ```typescript
   setCount(count + 1)
   setName('John')
   ```

## Alternative Implementations

### With Immer for Easier Updates

```typescript
import { useImmerReducer } from 'use-immer'

function formReducer(draft: FormState, action: FormAction) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      // Direct mutation (Immer handles immutability)
      draft[action.field] = action.value
      draft.errors = {}
      break
    case 'RESET_FORM':
      return initialState
  }
}

const [state, dispatch] = useImmerReducer(formReducer, initialState)
```

### With Action Creators

```typescript
const actions = {
  updateField: (field: string, value: string | boolean) => ({
    type: 'UPDATE_FIELD' as const,
    field,
    value,
  }),
  resetForm: () => ({ type: 'RESET_FORM' as const }),
  setErrors: (errors: Record<string, string>) => ({
    type: 'SET_ERRORS' as const,
    errors,
  }),
  submit: () => ({ type: 'SUBMIT' as const }),
}

// Usage:
dispatch(actions.updateField('username', 'john'))
dispatch(actions.resetForm())
```

### With Validation in Reducer

```typescript
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SUBMIT':
      const errors: Record<string, string> = {}
      if (!state.username) errors.username = 'Username is required'
      if (!state.email) errors.email = 'Email is required'
      if (!state.password) errors.password = 'Password is required'
      if (!state.acceptTerms) errors.terms = 'Must accept terms'

      if (Object.keys(errors).length > 0) {
        return { ...state, errors, submitted: false }
      }
      return { ...state, errors: {}, submitted: true }

    // ...
  }
}
```

Pros: All logic in reducer
Cons: Harder to test validation separately

## Key Takeaways

1. **useReducer is useState on steroids** for complex state
2. **Discriminated unions** provide type safety for actions
3. **Reducers must be pure** - no side effects, return new state
4. **Centralize state logic** - easier to understand and test
5. **Immutability is critical** - always spread state
6. **Default case is required** - return state unchanged

## Common Pitfalls

### 1. Mutating State

```typescript
// BAD - mutates state
case 'UPDATE_FIELD':
  state[action.field] = action.value
  return state

// GOOD - creates new state
case 'UPDATE_FIELD':
  return {
    ...state,
    [action.field]: action.value
  }
```

### 2. Missing Default Case

```typescript
// BAD - no default
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
  }
} // Returns undefined for unknown actions!

// GOOD - has default
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    default:
      return state
  }
}
```

### 3. Side Effects in Reducer

```typescript
// BAD - side effect
case 'SUBMIT':
  fetch('/api/submit', { method: 'POST', body: JSON.stringify(state) })
  return { ...state, submitted: true }

// GOOD - side effects in useEffect
case 'SUBMIT':
  return { ...state, submitted: true }

// In component:
useEffect(() => {
  if (state.submitted) {
    fetch('/api/submit', { method: 'POST', body: JSON.stringify(state) })
  }
}, [state.submitted])
```

### 4. Not Using Discriminated Unions

```typescript
// BAD - loses type safety
type FormAction = {
  type: string
  field?: string
  value?: any
}

// GOOD - precise types
type FormAction =
  | { type: 'UPDATE_FIELD'; field: string; value: string | boolean }
  | { type: 'RESET_FORM' }
```

## Testing Reducers

Reducers are pure functions, so they're easy to test:

```typescript
import { describe, it, expect } from 'vitest'

describe('formReducer', () => {
  it('updates field', () => {
    const state = initialState
    const action = {
      type: 'UPDATE_FIELD' as const,
      field: 'username',
      value: 'john',
    }

    const newState = formReducer(state, action)

    expect(newState.username).toBe('john')
    expect(newState.errors).toEqual({})
    expect(state.username).toBe('') // Original unchanged
  })

  it('resets form', () => {
    const state = {
      ...initialState,
      username: 'john',
      errors: { email: 'Required' },
    }

    const newState = formReducer(state, { type: 'RESET_FORM' })

    expect(newState).toEqual(initialState)
  })
})
```

## Further Learning

- **useReducer with Context** - Share state across components
- **Redux** - Global state management inspired by reducers
- **State machines** - XState for complex state logic
- **Immer** - Simplify immutable updates
- **React Hook Form** - Form library with useReducer under the hood
