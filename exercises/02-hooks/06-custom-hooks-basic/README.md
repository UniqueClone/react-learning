# Custom Hooks - Basic

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 25-30 minutes

## Challenge

Create reusable custom hooks that encapsulate common React patterns. You'll build `useToggle` for boolean state management and `useLocalStorage` for persistent state that syncs with browser storage.

## Requirements

Your implementation must:
- Create a `useToggle` hook that manages boolean state with a toggle function
- Create a `useLocalStorage` hook that persists state to localStorage
- Handle JSON serialization/deserialization automatically
- Read from localStorage on initial mount
- Write to localStorage on every state update
- Handle localStorage errors gracefully (e.g., quota exceeded, private browsing)
- Use proper TypeScript types and generics

## Learning Objectives

- Understanding custom hook patterns and naming conventions
- Learning to extract reusable logic from components
- Working with localStorage API
- Handling side effects in custom hooks
- Using TypeScript generics for flexible, type-safe hooks
- Managing component re-renders efficiently

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually in the browser
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] `useToggle` hook works with initial value
- [ ] `useToggle` returns value and toggle function
- [ ] Toggle function flips boolean state correctly
- [ ] `useLocalStorage` reads from localStorage on mount
- [ ] `useLocalStorage` writes to localStorage on updates
- [ ] `useLocalStorage` handles JSON serialization/deserialization
- [ ] localStorage errors are handled gracefully
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1: Custom Hook Structure</summary>

Custom hooks are just functions that use other hooks:
```typescript
function useToggle(initialValue = false) {
  // Use useState internally
  // Return array with value and toggle function
}
```
Remember: Custom hooks must start with "use" prefix!
</details>

<details>
<summary>Hint 2: useToggle Implementation</summary>

```typescript
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = () => {
    setValue(prev => !prev)
  }

  return [value, toggle] as const
}
```
</details>

<details>
<summary>Hint 3: Reading from localStorage</summary>

Use useState with a function (lazy initialization) to read from localStorage only once:
```typescript
const [value, setValue] = useState(() => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    return initialValue
  }
})
```
</details>

<details>
<summary>Hint 4: Writing to localStorage</summary>

Use useEffect to sync state with localStorage:
```typescript
useEffect(() => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}, [key, value])
```
</details>

<details>
<summary>Hint 5: TypeScript Generics</summary>

Make useLocalStorage generic to support any type:
```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  // T can be string, number, boolean, object, etc.
}
```
</details>

## Common Mistakes

1. **Not using "use" prefix**: Custom hooks must start with "use" for React to recognize them
2. **Not handling errors**: localStorage can fail (quota exceeded, private mode)
3. **Reading localStorage on every render**: Use lazy initialization with useState
4. **Forgetting JSON serialization**: localStorage only stores strings
5. **Not using TypeScript generics**: Makes the hook less flexible and type-safe

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

## Further Learning

- [Building Your Own Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
