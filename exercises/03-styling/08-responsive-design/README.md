# Responsive Design

**Difficulty:** Intermediate
**Type:** Complete Missing Code
**Estimated Time:** 25-30 minutes

## Challenge

Complete a responsive layout that adapts from mobile to tablet to desktop using modern CSS techniques. You'll use CSS Grid for the main page layout and Flexbox for component-level layouts, with media queries at standard breakpoints. This exercise teaches you mobile-first design principles and when to use Grid vs Flexbox.

## Requirements

Your implementation must:
- Complete the responsive layout with mobile-first approach
- Use CSS Grid for the main page structure (header, sidebar, main, footer)
- Use Flexbox for the card components and navigation
- Implement media queries at breakpoints: sm (640px), md (768px), lg (1024px)
- Make images responsive using max-width and object-fit
- Ensure text remains readable at all screen sizes
- Test that layout adapts smoothly across breakpoints

## Learning Objectives

- Master mobile-first CSS development
- Understand when to use CSS Grid vs Flexbox
- Learn standard responsive breakpoints
- Practice writing effective media queries
- Understand responsive image techniques
- Learn how to test responsive designs

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the starter code in `App.tsx` and `App.module.css`
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Complete the missing CSS in `App.module.css`
5. Implement media queries for tablet (md) and desktop (lg) breakpoints
6. Ensure Grid and Flexbox properties work together
7. Run `pnpm dev` to test manually (resize browser window)
8. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Mobile layout (< 768px): Single column, stacked cards
- [ ] Tablet layout (768px+): Two-column card grid, visible sidebar
- [ ] Desktop layout (1024px+): Three-column card grid, wider sidebar
- [ ] CSS Grid used for main page layout
- [ ] Flexbox used for navigation and card layouts
- [ ] Images scale properly at all sizes
- [ ] No horizontal scrolling on mobile
- [ ] All tests pass

## Hints

<details>
<summary>Mobile-first approach</summary>

Write base styles for mobile, then add media queries for larger screens:

```css
/* Mobile (default) */
.container {
  display: flex;
  flex-direction: column;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

This is easier to maintain than desktop-first (max-width queries).
</details>

<details>
<summary>CSS Grid for page layout</summary>

Grid is perfect for page-level layouts:

```css
.layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main"
    "footer";
}

@media (min-width: 768px) {
  .layout {
    grid-template-columns: 250px 1fr;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
  }
}
```

Named areas make layouts readable and easy to change.
</details>

<details>
<summary>Flexbox for components</summary>

Flexbox is better for component layouts:

```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 100%; /* Mobile: full width */
}

@media (min-width: 768px) {
  .card {
    flex: 1 1 calc(50% - 1rem); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .card {
    flex: 1 1 calc(33.333% - 1rem); /* Desktop: 3 columns */
  }
}
```
</details>

<details>
<summary>Responsive images</summary>

Make images scale within their container:

```css
.image {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
```

- `max-width: 100%` prevents overflow
- `height: auto` maintains aspect ratio
- `object-fit: cover` fills container without distortion
</details>

<details>
<summary>Standard breakpoints</summary>

Common breakpoints (mobile-first):
```css
/* Small devices (landscape phones, 640px and up) */
@media (min-width: 640px) { }

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { }

/* Large devices (desktops, 1024px and up) */
@media (min-width: 1024px) { }

/* Extra large devices (large desktops, 1280px and up) */
@media (min-width: 1280px) { }
```

These match Tailwind's default breakpoints.
</details>

<details>
<summary>Grid vs Flexbox decision guide</summary>

**Use Grid when:**
- Two-dimensional layout (rows AND columns)
- Overlapping elements
- Fixed track sizes
- Named template areas
- Example: Page layouts, photo galleries

**Use Flexbox when:**
- One-dimensional layout (row OR column)
- Content size determines layout
- Items should wrap naturally
- Dynamic spacing needed
- Example: Navigation bars, card lists, buttons
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

**Manual testing:**
1. Run `pnpm dev`
2. Open browser DevTools (F12)
3. Use responsive design mode (Ctrl+Shift+M / Cmd+Shift+M)
4. Test at widths: 375px, 768px, 1024px, 1440px
5. Verify layouts match requirements
