# Optimistic UI Updates

**Difficulty:** Advanced
**Type:** Build From Scratch
**Estimated Time:** 30-35 minutes

## Challenge

Build a todo list that implements optimistic UI updates. When users add or delete todos, the UI updates immediately before the server response, creating a snappier user experience. If the server request fails, rollback the optimistic change and show an error.

## Requirements

Your implementation must:
- Display a list of todos with add and delete functionality
- Update the UI immediately when user takes an action (optimistic update)
- Simulate API calls with setTimeout (300ms delay)
- Rollback changes if the "API call" fails
- Show error messages when operations fail
- Include a toggle to simulate failures for testing
- Handle loading states during API calls

## Learning Objectives

- Master optimistic UI update patterns
- Learn to handle success and failure scenarios
- Practice rollback strategies for failed operations
- Understand trade-offs between optimistic and pessimistic UIs
- Implement better UX with perceived performance improvements

## Instructions

1. Run `pnpm install` to install dependencies
2. Read requirements and check the tests
3. Implement your solution in `App.tsx`
4. Run `pnpm dev` to test manually
5. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Todos appear immediately when added (before API response)
- [ ] Todos disappear immediately when deleted (before API response)
- [ ] Failed operations rollback to previous state
- [ ] Error messages display when operations fail
- [ ] Toggle to simulate API failures
- [ ] Loading indicators during operations
- [ ] All 10 tests pass

## Hints

<details>
<summary>Hint 1: Optimistic Update Pattern</summary>

The pattern:
1. Update UI immediately (optimistic)
2. Send API request
3. On success: keep the change
4. On failure: rollback + show error

```typescript
const addTodo = async (text: string) => {
  const tempTodo = { id: Date.now(), text };

  // Optimistic update
  setTodos([...todos, tempTodo]);

  try {
    await api.addTodo(tempTodo);
    // Success - nothing more needed
  } catch (err) {
    // Rollback
    setTodos(todos);
    setError('Failed to add todo');
  }
};
```
</details>

<details>
<summary>Hint 2: Mock API Function</summary>

Create a mock API that simulates network delay:

```typescript
const mockApi = {
  addTodo: (todo: Todo) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        shouldFail ? reject(new Error('Failed')) : resolve(todo);
      }, 300);
    }),
};
```
</details>

<details>
<summary>Hint 3: Rollback Strategy</summary>

Store the previous state to enable rollback:

```typescript
const deleteTodo = async (id: number) => {
  const previousTodos = [...todos];

  // Optimistic update
  setTodos(todos.filter(t => t.id !== id));

  try {
    await api.deleteTodo(id);
  } catch (err) {
    // Rollback to previous state
    setTodos(previousTodos);
    setError('Failed to delete');
  }
};
```
</details>

## Common Mistakes

- Not storing previous state for rollback
- Forgetting to clear error messages
- Not handling loading states
- Making UI changes after async operation instead of before
- Not testing failure scenarios

## Further Learning

- [Optimistic UI Patterns](https://www.apollographql.com/docs/react/performance/optimistic-ui/)
- [React Query Optimistic Updates](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)
- [UX Patterns: Optimistic UI](https://uxdesign.cc/optimistic-1000-34d9eefe4c05)
