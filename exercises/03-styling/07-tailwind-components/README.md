# Building Components with Tailwind

**Difficulty:** Intermediate
**Type:** Build From Scratch
**Estimated Time:** 25-30 minutes

## Challenge

Build a reusable Button component using Tailwind CSS and clsx for conditional class management. You'll create a flexible button system with multiple variants (size, color, style) that demonstrates modern component library patterns. This exercise teaches you how to build production-ready components with utility-first CSS.

## Requirements

Your implementation must:
- Build a Button component with Tailwind CSS utilities
- Support size variants: `sm`, `md`, `lg`
- Support color variants: `primary`, `secondary`, `danger`
- Support style variants: `solid` (filled) and `outline`
- Use clsx to conditionally combine classes
- Ensure all variant combinations work correctly
- Make the button accept standard button props (onClick, children, etc.)

## Learning Objectives

- Master Tailwind component patterns
- Learn clsx for conditional class composition
- Understand variant system design
- Practice building flexible, reusable components
- Learn how to combine utility classes effectively
- Understand the tradeoffs of utility-first CSS

## Instructions

1. Run `pnpm install` to install dependencies (tailwindcss and clsx already in package.json)
2. Use the existing `tailwind.config.js` and `postcss.config.js` from exercise 06
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Build your Button component in `App.tsx`
5. Implement size, color, and style variants using Tailwind utilities
6. Use clsx to combine base classes with variant classes
7. Run `pnpm dev` to test manually
8. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Button component accepts `size` prop (sm, md, lg)
- [ ] Button component accepts `color` prop (primary, secondary, danger)
- [ ] Button component accepts `variant` prop (solid, outline)
- [ ] All variant combinations render correctly
- [ ] clsx is used to conditionally combine classes
- [ ] Button accepts standard HTML button props
- [ ] Hover states work for all variants
- [ ] Focus states include proper accessibility rings
- [ ] All tests pass

## Hints

<details>
<summary>clsx usage pattern</summary>

```tsx
import clsx from 'clsx';

const buttonClass = clsx(
  'base-classes-here',
  {
    'conditional-class': condition,
    'another-class': anotherCondition,
  },
  specificVariantClass
);
```

clsx filters out falsy values and combines valid classes into a single string.
</details>

<details>
<summary>Tailwind size variants</summary>

Different sizes typically change padding and font size:
```tsx
const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};
```
</details>

<details>
<summary>Tailwind color variants</summary>

For solid buttons:
```tsx
const solidColors = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};
```

For outline buttons:
```tsx
const outlineColors = {
  primary: 'border-blue-600 text-blue-600 hover:bg-blue-50',
  secondary: 'border-gray-600 text-gray-600 hover:bg-gray-50',
  danger: 'border-red-600 text-red-600 hover:bg-red-50',
};
```
</details>

<details>
<summary>Component structure</summary>

```tsx
type ButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'danger';
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  children,
  className,
  ...props
}: ButtonProps) {
  // Build classes using clsx
  // Return button element
}
```
</details>

<details>
<summary>Base button classes</summary>

All buttons should share these base classes:
```
font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
```

These provide:
- Consistent font weight
- Rounded corners
- Smooth color transitions
- Accessible focus states
</summary>
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
