# State Machine Pattern

**Difficulty:** Advanced
**Type:** Build From Scratch
**Estimated Time:** 35-40 minutes

## Challenge

Build a multi-step form using the state machine pattern. State machines make complex state logic explicit and prevent invalid states. You'll create a form with distinct steps where only valid transitions are allowed.

## Requirements

Your implementation must:
- Implement a 3-step form (Personal Info → Address → Review)
- Use TypeScript discriminated unions for states
- Only allow valid state transitions
- Prevent going to Review without completing previous steps
- Show current step indicator
- Support Next, Previous, and Submit actions
- Reset form after submission

## Learning Objectives

- Master state machine patterns in React
- Use TypeScript discriminated unions for type-safe states
- Prevent invalid state transitions
- Understand explicit state management benefits
- Learn when state machines improve code quality

## Instructions

1. Run `pnpm install` to install dependencies
2. Read requirements and check the tests
3. Implement your solution in `App.tsx`
4. Run `pnpm dev` to test manually
5. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Form has 3 steps with distinct screens
- [ ] Can navigate forward and backward between steps
- [ ] Cannot skip steps (must go in order)
- [ ] Submit button only appears on Review step
- [ ] Form resets after submission
- [ ] Current step is clearly indicated
- [ ] All 10 tests pass

## Hints

<details>
<summary>Hint 1: State Type Definition</summary>

Use discriminated union for type-safe states:

```typescript
type FormState =
  | { step: 'personal'; data: PersonalData }
  | { step: 'address'; data: PersonalData & AddressData }
  | { step: 'review'; data: PersonalData & AddressData };
```
</details>

<details>
<summary>Hint 2: Transition Function</summary>

Create a function that handles valid transitions:

```typescript
function transition(
  state: FormState,
  action: 'next' | 'previous' | 'submit'
): FormState {
  switch (state.step) {
    case 'personal':
      if (action === 'next') return { step: 'address', data: state.data };
      break;
    case 'address':
      if (action === 'next') return { step: 'review', data: state.data };
      if (action === 'previous') return { step: 'personal', data: state.data };
      break;
    // ... etc
  }
  return state; // Invalid transition
}
```
</details>

<details>
<summary>Hint 3: useReducer Pattern</summary>

Use useReducer for state machine logic:

```typescript
const [state, dispatch] = useReducer(formReducer, initialState);

// Actions
dispatch({ type: 'NEXT', payload: formData });
dispatch({ type: 'PREVIOUS' });
dispatch({ type: 'SUBMIT' });
```
</details>

## Further Learning

- [State Machines in React](https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript)
- [XState Library](https://xstate.js.org/) - Production state machine library
- [TypeScript Discriminated Unions](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html)
