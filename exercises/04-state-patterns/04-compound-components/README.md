# Compound Component Pattern

**Difficulty:** Advanced
**Type:** Build From Scratch
**Estimated Time:** 30-35 minutes

## Challenge

Build a flexible Accordion component using the Compound Component pattern. This pattern allows you to create components that work together implicitly, sharing state through React Context without requiring explicit prop passing. The user can compose them in flexible ways while maintaining a clean API.

## Requirements

Your implementation must:
- Create an Accordion component with AccordionItem, AccordionTrigger, and AccordionContent sub-components
- Allow only one item to be open at a time (controlled accordion)
- Share state between parent and child components using Context
- Support flexible composition (children can be in any order)
- Include proper TypeScript types for all components
- Handle edge cases (invalid usage outside provider)
- Work with the test suite provided

## Learning Objectives

- Master the Compound Component pattern
- Understand implicit state sharing through Context
- Learn flexible component composition
- Practice building reusable component APIs
- Understand the trade-offs between patterns

## Instructions

1. Run `pnpm install` to install dependencies
2. Read the requirements above
3. Check the tests in `App.test.tsx` to understand expected behavior
4. Implement your solution in `App.tsx`
5. Run `pnpm dev` to test manually
6. Run `pnpm test` to verify all tests pass

## Acceptance Criteria

- [ ] Accordion component manages which item is open
- [ ] AccordionItem provides context for its children
- [ ] AccordionTrigger toggles the item when clicked
- [ ] AccordionContent shows/hides based on open state
- [ ] Only one item can be open at a time
- [ ] Components can be composed flexibly
- [ ] All 8 tests pass

## Hints

<details>
<summary>Hint 1: Context Structure</summary>

You'll need two contexts:
1. AccordionContext - manages which item is currently open
2. AccordionItemContext - provides the item's value to its children

```typescript
const AccordionContext = createContext<{
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
} | undefined>(undefined);

const AccordionItemContext = createContext<{
  value: string;
  isOpen: boolean;
} | undefined>(undefined);
```
</details>

<details>
<summary>Hint 2: Compound Component Structure</summary>

The Accordion component should have sub-components attached as properties:

```typescript
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
```
</details>

<details>
<summary>Hint 3: Toggle Logic</summary>

When clicking a trigger, if the item is already open, close it. Otherwise, open the clicked item:

```typescript
const handleToggle = () => {
  setOpenItem(isOpen ? null : value);
};
```
</details>

## Testing

Your implementation must pass all tests in `App.test.tsx`. Run `pnpm test` to check.

## Solution

Once you've completed the exercise, check SOLUTION.md for the complete implementation and detailed explanations.
