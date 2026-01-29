# Hello Component

**Difficulty:** Beginner
**Type:** Build From Scratch
**Estimated Time:** 10-15 minutes

## Challenge

Create your first React component! Build a simple component that displays a personalized greeting with the current date.

## Requirements

Your implementation must:
- Display a heading with "Hello, React!"
- Show a welcome message: "Welcome to your first React exercise!"
- Display the current date in a readable format
- Use proper JSX syntax

## Learning Objectives

- Understanding React functional components
- Working with JSX
- Using JavaScript within JSX
- Component structure and exports

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Component renders a heading with "Hello, React!"
- [ ] Component renders a welcome message
- [ ] Component displays the current date
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1: JSX Structure</summary>
Remember that React components return JSX. You'll need a containing div with multiple child elements (h1, p, etc.)
</details>

<details>
<summary>Hint 2: Getting the Date</summary>
Use `new Date().toLocaleDateString()` to get a formatted date string
</details>

<details>
<summary>Hint 3: Embedding JavaScript</summary>
Use curly braces `{}` to embed JavaScript expressions within JSX
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
