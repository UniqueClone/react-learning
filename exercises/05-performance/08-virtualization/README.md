# List Virtualization with react-window

**Difficulty:** advanced
**Type:** Build From Scratch
**Estimated Time:** 30-35 minutes

## Challenge

Build a high-performance list component that can efficiently render 10,000+ items using virtualization. Only render items visible in the viewport, dramatically improving scroll performance and memory usage.

## Requirements

Your implementation must:
- Display a list of 10,000 items
- Use the `react-window` library for virtualization
- Show each item with an index and some text
- Include a toggle to compare virtualized vs non-virtualized rendering
- Display performance metrics (item count, rendered count)
- Handle smooth scrolling without lag

## Learning Objectives

- Understand the performance problems with large lists
- Learn how virtualization (windowing) solves these problems
- Implement virtualization using react-window library
- Measure and compare performance metrics
- Recognize when virtualization is necessary

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] List displays 10,000 items when virtualized
- [ ] Uses FixedSizeList from react-window
- [ ] Toggle button switches between virtualized and normal list
- [ ] Performance metrics are displayed
- [ ] Smooth scrolling performance with virtualized list
- [ ] All tests pass

## Hints

<details>
<summary>Hint 1: Installing react-window</summary>

First, you'll need to install react-window:
```bash
pnpm add react-window
pnpm add -D @types/react-window
```

The library exports `FixedSizeList` and `VariableSizeList` components.

</details>

<details>
<summary>Hint 2: FixedSizeList Usage</summary>

The basic pattern for FixedSizeList:

```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}        // Container height
  itemCount={10000}   // Total number of items
  itemSize={50}       // Height of each item
  width="100%"
>
  {Row}               // Component to render each row
</FixedSizeList>
```

</details>

<details>
<summary>Hint 3: Row Component</summary>

The Row component receives props from react-window:

```typescript
interface RowProps {
  index: number;      // Index of the item
  style: CSSProperties; // Positioning styles (MUST apply)
}

function Row({ index, style }: RowProps) {
  return <div style={style}>Item {index}</div>;
}
```

The `style` prop is critical - it positions items correctly!

</details>

<details>
<summary>Hint 4: Comparison Component</summary>

Create a toggle to switch between:
- **Virtualized**: Uses FixedSizeList (renders ~12 items)
- **Normal**: Maps over all items (renders 10,000 items)

Compare the difference in:
- DOM nodes created
- Scroll performance
- Memory usage

</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

## Performance Impact

**Without virtualization:**
- 10,000 DOM nodes
- ~200ms render time
- Laggy scrolling
- High memory usage

**With virtualization:**
- ~12 DOM nodes (only visible items)
- ~10ms render time (20x faster)
- Smooth scrolling
- Low memory usage
