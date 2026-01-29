# Lazy Loading Images and Content

**Difficulty:** intermediate
**Type:** Complete Missing Parts
**Estimated Time:** 25-30 minutes

## Challenge

Build an image gallery that lazy loads images only when they're about to enter the viewport using the Intersection Observer API. This improves initial page load performance by deferring image loading until needed.

## Learning Objectives

- Understand the Intersection Observer API and its use cases
- Implement lazy loading for images to improve performance
- Create a reusable custom hook for lazy loading
- Handle loading states with placeholder content
- Measure and understand performance improvements

## Instructions

1. Run `pnpm install` to install dependencies
2. Look for `TODO` comments in the code
3. Implement the missing functionality
4. Run `pnpm dev` to test your implementation
5. Run `pnpm test` to verify all tests pass

## Requirements

- [ ] Implement a `useLazyLoad` custom hook using Intersection Observer
- [ ] Create a `LazyImage` component that loads images when visible
- [ ] Show a placeholder while images are loading
- [ ] Display a grid of at least 20 images
- [ ] Images should only load when scrolling near them
- [ ] Clean up observers when components unmount

## Hints

<details>
<summary>Hint 1: Intersection Observer Basics</summary>

The Intersection Observer API allows you to observe when an element enters or exits the viewport:

```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Element is visible
    }
  });
}, options);

observer.observe(elementRef.current);
```

</details>

<details>
<summary>Hint 2: Custom Hook Structure</summary>

Your `useLazyLoad` hook should:
- Accept a ref to the element to observe
- Return whether the element is visible
- Set up the observer in useEffect
- Clean up the observer on unmount
- Use a state variable to track visibility

</details>

<details>
<summary>Hint 3: LazyImage Component</summary>

The LazyImage component should:
- Use a ref for the img element
- Call your useLazyLoad hook with the ref
- Only set the src attribute when isVisible is true
- Show a placeholder div before the image loads
- Use the onLoad event to track when the image has loaded

</details>

<details>
<summary>Hint 4: Testing Intersection Observer</summary>

In tests, you'll need to mock the Intersection Observer API since it's not available in the test environment. Mock the entries with `isIntersecting: true` to simulate visibility.

</details>

## Testing

Run `pnpm test` to check your implementation. All tests should pass when you're done.

## Acceptance Criteria

- All tests pass
- Images load progressively as you scroll
- Placeholders are shown before images load
- No console errors or warnings
- Observer is properly cleaned up on unmount
