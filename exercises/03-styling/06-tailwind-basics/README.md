# Tailwind CSS Basics

**Difficulty:** Beginner
**Type:** Fix Broken Code
**Estimated Time:** 20-25 minutes

## Challenge

Fix a broken Tailwind CSS implementation. The code has incorrect utility class names, missing responsive modifiers, and wrong variant syntax. You'll learn Tailwind's utility-first approach and common patterns while debugging real mistakes beginners make.

## Requirements

Your implementation must:
- Fix incorrect Tailwind utility class names
- Add proper responsive modifiers (sm:, md:, lg:)
- Correct hover and focus state variants
- Set up Tailwind config properly (tailwind.config.js, postcss.config.js)
- Ensure all utilities compile correctly

## Learning Objectives

- Master Tailwind utility class syntax
- Learn responsive modifier patterns
- Understand state variants (hover:, focus:, active:)
- Practice debugging Tailwind compilation issues
- Learn proper Tailwind configuration

## Instructions

1. Run `pnpm install` to install dependencies (tailwindcss already added)
2. Create `tailwind.config.js` and `postcss.config.js` files
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Fix the incorrect class names in `App.tsx`
5. Ensure Tailwind CSS compiles properly
6. Run `pnpm dev` to test manually
7. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] All utility classes are valid Tailwind classes
- [ ] Responsive modifiers work at correct breakpoints
- [ ] Hover and focus states applied correctly
- [ ] Tailwind config files created and properly configured
- [ ] Styles compile without errors
- [ ] All tests pass

## Hints

<details>
<summary>Common Tailwind bugs</summary>

**Wrong:**
- `background-blue-500` (CSS property name)
- `text-large` (not a Tailwind size)
- `hover-bg-blue-600` (wrong syntax)

**Correct:**
- `bg-blue-500`
- `text-lg` or `text-xl`
- `hover:bg-blue-600`
</details>

<details>
<summary>Responsive modifiers</summary>

```tsx
// Mobile first approach
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Full width on mobile, half on tablet, third on desktop */}
</div>
```

Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
</details>

<details>
<summary>Config files needed</summary>

**tailwind.config.js:**
```js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

**postcss.config.js:**
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.
