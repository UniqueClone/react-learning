# Styled Components Introduction

**Difficulty:** Beginner
**Type:** Build From Scratch
**Estimated Time:** 20-25 minutes

## Challenge

Learn the fundamentals of styled-components, a popular CSS-in-JS library. You'll create button components using tagged template literals and learn how to interpolate props into styles. This introduces a completely different styling paradigm from CSS files - styles defined directly in JavaScript.

## Requirements

Your implementation must:
- Create a styled Button component using styled-components
- Use tagged template literal syntax (styled.button`...`)
- Interpolate props to change styles dynamically
- Create multiple button variants using prop interpolation
- Understand how styled-components generates unique class names

## Learning Objectives

- Understand CSS-in-JS fundamentals
- Master styled-components tagged template syntax
- Learn prop interpolation in styled-components
- Practice creating reusable styled components
- Understand the benefits and trade-offs of CSS-in-JS

## Instructions

1. Run `pnpm install` to install dependencies (styled-components already added)
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Create styled components in `App.tsx`
5. Implement prop-based styling
6. Run `pnpm dev` to test manually
7. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Button created using `styled.button` syntax
- [ ] Props interpolated into styles using ${props => ...}
- [ ] Different variants render with different colors
- [ ] Hover states implemented
- [ ] Size variants (small, medium, large) supported
- [ ] All tests pass

## Hints

<details>
<summary>Basic styled-components syntax</summary>

```tsx
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  background: blue;
  color: white;
`;
```

Use it like a normal component:
```tsx
<Button>Click me</Button>
```
</details>

<details>
<summary>Prop interpolation</summary>

Access props in template literals:
```tsx
const Button = styled.button<{ $primary?: boolean }>`
  background: ${props => props.$primary ? 'blue' : 'gray'};
`;

<Button $primary>Primary</Button>
<Button>Secondary</Button>
```

Note: Use $ prefix for transient props (props not passed to DOM).
</details>

<details>
<summary>TypeScript with styled-components</summary>

Define prop types using generics:
```tsx
type ButtonProps = {
  $variant?: 'primary' | 'secondary';
  $size?: 'small' | 'large';
};

const Button = styled.button<ButtonProps>`
  background: ${p => p.$variant === 'primary' ? 'blue' : 'gray'};
  padding: ${p => p.$size === 'small' ? '5px 10px' : '10px 20px'};
`;
```
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
