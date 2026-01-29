# Solution: Compound Component Pattern

## Overview

The Compound Component pattern allows you to create components that work together implicitly by sharing state through React Context. This pattern provides a flexible and intuitive API where child components can be composed in any order while still maintaining functionality.

## Complete Solution

```typescript
import { createContext, useContext, useState, ReactNode } from 'react';
import './index.css';

// Types
interface AccordionContextValue {
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

// Contexts
const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);
const AccordionItemContext = createContext<AccordionItemContextValue | undefined>(undefined);

// Custom Hooks
function useAccordion() {
  const context = useContext(AccordionContext);
  if (context === undefined) {
    throw new Error('Accordion compound components must be used within Accordion');
  }
  return context;
}

function useAccordionItem() {
  const context = useContext(AccordionItemContext);
  if (context === undefined) {
    throw new Error('AccordionTrigger and AccordionContent must be used within AccordionItem');
  }
  return context;
}

// Main Accordion Component
interface AccordionProps {
  children: ReactNode;
}

function AccordionRoot({ children }: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

// AccordionItem Component
interface AccordionItemProps {
  value: string;
  children: ReactNode;
}

function AccordionItem({ value, children }: AccordionItemProps) {
  const { openItem } = useAccordion();
  const isOpen = openItem === value;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

// AccordionTrigger Component
interface AccordionTriggerProps {
  children: ReactNode;
}

function AccordionTrigger({ children }: AccordionTriggerProps) {
  const { setOpenItem } = useAccordion();
  const { value, isOpen } = useAccordionItem();

  const handleClick = () => {
    setOpenItem(isOpen ? null : value);
  };

  return (
    <button className="accordion-trigger" onClick={handleClick}>
      {children}
    </button>
  );
}

// AccordionContent Component
interface AccordionContentProps {
  children: ReactNode;
}

function AccordionContent({ children }: AccordionContentProps) {
  const { isOpen } = useAccordionItem();

  if (!isOpen) return null;

  return <div className="accordion-content">{children}</div>;
}

// Compound Component Assembly
const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

export default function App() {
  return (
    <div className="app">
      <h1>Compound Component Pattern</h1>
      <p>Build a flexible Accordion component</p>

      <Accordion>
        <Accordion.Item value="react">
          <Accordion.Trigger>What is React?</Accordion.Trigger>
          <Accordion.Content>
            React is a JavaScript library for building user interfaces. It lets you
            create reusable UI components and manage application state efficiently.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="typescript">
          <Accordion.Trigger>What is TypeScript?</Accordion.Trigger>
          <Accordion.Content>
            TypeScript is a typed superset of JavaScript that compiles to plain
            JavaScript. It adds optional static typing, classes, and interfaces to
            help catch errors early and improve code quality.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="vite">
          <Accordion.Trigger>What is Vite?</Accordion.Trigger>
          <Accordion.Content>
            Vite is a build tool that provides a faster and leaner development
            experience for modern web projects. It leverages native ES modules and
            modern JavaScript features.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
```

## Key Implementation Details

### 1. Two-Level Context Architecture

The pattern uses two contexts for different purposes:

```typescript
// Parent-level context: manages which item is open
const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

// Item-level context: provides item-specific data to children
const AccordionItemContext = createContext<AccordionItemContextValue | undefined>(undefined);
```

This separation allows:
- Accordion to manage global state (which item is open)
- AccordionItem to provide local state (this item's value and open status)
- Children to access only what they need

### 2. Custom Hooks for Context Access

```typescript
function useAccordion() {
  const context = useContext(AccordionContext);
  if (context === undefined) {
    throw new Error('Accordion compound components must be used within Accordion');
  }
  return context;
}
```

Benefits:
- Automatic error checking for proper usage
- Clean API for consuming context
- TypeScript knows the context is never undefined after the check

### 3. Compound Component Assembly

```typescript
const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
```

This creates a single export with sub-components attached as properties, enabling the dot notation syntax:

```tsx
<Accordion>
  <Accordion.Item>
    <Accordion.Trigger />
    <Accordion.Content />
  </Accordion.Item>
</Accordion>
```

### 4. Toggle Logic

```typescript
const handleClick = () => {
  setOpenItem(isOpen ? null : value);
};
```

Simple and clear: if already open, close it (set to null). Otherwise, open it.

### 5. Flexible Composition

Children can be in any order and the pattern still works:

```tsx
<Accordion.Item value="item1">
  <Accordion.Content>Content first!</Accordion.Content>
  <Accordion.Trigger>Trigger second!</Accordion.Trigger>
</Accordion.Item>
```

The context ensures they work together regardless of order.

## Benefits of This Pattern

1. **Flexible API**: Users can compose components however they want
2. **Implicit State Sharing**: No need to manually pass props through layers
3. **Clean Syntax**: Dot notation makes the relationship clear
4. **Type Safety**: TypeScript ensures correct usage
5. **Separation of Concerns**: Each component has a single responsibility
6. **Reusability**: Components can be used in different contexts

## Common Use Cases

This pattern is ideal for:
- Accordions and collapsible sections
- Tabs and tab panels
- Dropdowns and menus
- Modal dialogs with header/body/footer
- Stepper/wizard components
- Any component with multiple related parts

## Trade-offs and Considerations

### Advantages

- Very flexible and composable
- Clean, intuitive API
- No prop drilling
- Easy to extend with new sub-components

### Disadvantages

- More complex to implement than simple prop-based components
- Context re-renders can impact performance (mitigated by split contexts)
- Less explicit than props (state flow is hidden)
- Requires understanding of Context API

## When to Use This Pattern

**Use when:**
- Component has multiple related parts that work together
- You want to provide a flexible composition API
- State needs to be shared between related components
- You want to avoid prop drilling

**Avoid when:**
- Component is simple with few props
- Performance is critical and updates are frequent
- You need to support component libraries that don't understand Context
- The relationship between components is simple parent-child

## Comparison with Other Patterns

### vs. Props Pattern
```tsx
// Props pattern - explicit but verbose
<Accordion
  items={[
    { trigger: 'Title', content: 'Content' }
  ]}
/>

// Compound pattern - implicit but flexible
<Accordion>
  <Accordion.Item>
    <Accordion.Trigger>Title</Accordion.Trigger>
    <Accordion.Content>Content</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

### vs. Render Props Pattern
```tsx
// Render props - flexible but can be complex
<Accordion>
  {({ isOpen, toggle }) => (
    <>
      <button onClick={toggle}>Title</button>
      {isOpen && <div>Content</div>}
    </>
  )}
</Accordion>

// Compound - cleaner syntax
<Accordion.Item>
  <Accordion.Trigger>Title</Accordion.Trigger>
  <Accordion.Content>Content</Accordion.Content>
</Accordion.Item>
```

## Real-World Examples

Libraries using this pattern:
- **Radix UI**: All components use compound patterns
- **Reach UI**: Tabs, Accordion, Menu components
- **Headless UI**: Most components follow this pattern
- **Chakra UI**: Many components support compound patterns

## Key Takeaways

1. **Compound components** provide flexible, composable APIs through implicit state sharing
2. **Two-level context** architecture separates global and local concerns
3. **Object.assign** creates clean dot notation syntax
4. **Custom hooks** provide safe context access with error handling
5. **This pattern excels** when you need flexible composition and shared state
6. **Balance flexibility** with complexity - don't over-engineer simple components
7. **Consider performance** implications of Context updates
8. Use this pattern for **component libraries and design systems**
