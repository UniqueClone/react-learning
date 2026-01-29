# Solution: State Machine Pattern

## Complete Implementation

```typescript
import { useReducer, ChangeEvent } from 'react';
import './index.css';

type PersonalData = { name: string; email: string };
type AddressData = { street: string; city: string };
type AllData = PersonalData & AddressData;

type FormState =
  | { step: 'personal'; data: Partial<PersonalData> }
  | { step: 'address'; data: PersonalData & Partial<AddressData> }
  | { step: 'review'; data: AllData };

type Action =
  | { type: 'NEXT'; payload: Partial<PersonalData | AddressData> }
  | { type: 'PREVIOUS' }
  | { type: 'SUBMIT' }
  | { type: 'UPDATE'; payload: Partial<PersonalData | AddressData> };

const initialState: FormState = { step: 'personal', data: {} };

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'NEXT':
      if (state.step === 'personal') {
        return { step: 'address', data: { ...state.data, ...action.payload } as PersonalData };
      }
      if (state.step === 'address') {
        return { step: 'review', data: { ...state.data, ...action.payload } as AllData };
      }
      return state;

    case: 'PREVIOUS':
      if (state.step === 'address') {
        return { step: 'personal', data: state.data };
      }
      if (state.step === 'review') {
        return { step: 'address', data: state.data };
      }
      return state;

    case 'SUBMIT':
      return initialState;

    case 'UPDATE':
      return { ...state, data: { ...state.data, ...action.payload } };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleNext = () => dispatch({ type: 'NEXT', payload: state.data });
  const handlePrevious = () => dispatch({ type: 'PREVIOUS' });
  const handleSubmit = () => dispatch({ type: 'SUBMIT' });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE', payload: { [e.target.name]: e.target.value } });
  };

  return (
    <div className="container">
      <h1>Multi-Step Form</h1>
      <div className="steps">
        Step {state.step === 'personal' ? 1 : state.step === 'address' ? 2 : 3} of 3
      </div>

      {state.step === 'personal' && (
        <div>
          <h2>Personal Information</h2>
          <input name="name" placeholder="Name" onChange={handleChange} value={state.data.name || ''} />
          <input name="email" placeholder="Email" onChange={handleChange} value={state.data.email || ''} />
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {state.step === 'address' && (
        <div>
          <h2>Address</h2>
          <input name="street" placeholder="Street" onChange={handleChange} value={state.data.street || ''} />
          <input name="city" placeholder="City" onChange={handleChange} value={state.data.city || ''} />
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {state.step === 'review' && (
        <div>
          <h2>Review</h2>
          <p>Name: {state.data.name}</p>
          <p>Email: {state.data.email}</p>
          <p>Street: {state.data.street}</p>
          <p>City: {state.data.city}</p>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}
```

## Key Concepts

**State Machine Benefits:**
1. **Explicit states** - No ambiguity about current state
2. **Valid transitions only** - Cannot reach invalid states
3. **Type safety** - TypeScript ensures correctness
4. **Predictable** - Same input = same output

## Key Takeaways

1. **Discriminated unions** provide type-safe state management
2. **State machines** prevent invalid states
3. **useReducer** perfect for state machine logic
4. **Explicit transitions** better than boolean flags
5. Use for: multi-step forms, authentication flows, game states

## Further Learning

- [XState Documentation](https://xstate.js.org/)
- [State Machines in React](https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript)
