# Solution: Component Composition with Children

## Complete Solution

```typescript
interface CardProps {
  children: React.ReactNode
}

function Card({ children }: CardProps) {
  return (
    <div
      data-testid="card-container"
      style={{
        border: '2px solid #ddd',
        borderRadius: '8px',
        padding: '0',
        margin: '16px 0',
        maxWidth: '400px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {children}
    </div>
  )
}

function CardHeader({ children }: CardProps) {
  return (
    <div
      data-testid="card-header"
      style={{
        padding: '16px',
        borderBottom: '1px solid #eee',
        fontWeight: 'bold',
        fontSize: '18px',
      }}
    >
      {children}
    </div>
  )
}

function CardBody({ children }: CardProps) {
  return (
    <div
      data-testid="card-body"
      style={{
        padding: '16px',
      }}
    >
      {children}
    </div>
  )
}

function CardFooter({ children }: CardProps) {
  return (
    <div
      data-testid="card-footer"
      style={{
        padding: '16px',
        borderTop: '1px solid #eee',
        fontSize: '14px',
        color: '#666',
      }}
    >
      {children}
    </div>
  )
}

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Component Composition</h1>

      {/* Example 1: Full Card with all sections */}
      <Card>
        <CardHeader>User Profile</CardHeader>
        <CardBody>
          <p>Name: John Doe</p>
          <p>Email: john@example.com</p>
          <p>Role: Developer</p>
        </CardBody>
        <CardFooter>
          <button style={{ marginRight: '8px' }}>Edit</button>
          <button>Delete</button>
        </CardFooter>
      </Card>

      {/* Example 2: Simple card (header + body only) */}
      <Card>
        <CardHeader>Welcome Message</CardHeader>
        <CardBody>
          <p>Welcome to our application!</p>
          <p>Get started by exploring the features.</p>
        </CardBody>
      </Card>

      {/* Example 3: Body-only card */}
      <Card>
        <CardBody>
          <p>This card has no header or footer.</p>
          <p>Just the essential content.</p>
        </CardBody>
      </Card>

      {/* Example 4: Card with complex nested content */}
      <Card>
        <CardHeader>Product Details</CardHeader>
        <CardBody>
          <h3>Premium Widget</h3>
          <ul>
            <li>High quality</li>
            <li>Fast shipping</li>
            <li>Money-back guarantee</li>
          </ul>
          <p style={{ fontWeight: 'bold' }}>$99.99</p>
        </CardBody>
        <CardFooter>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add to Cart
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}
```

## Key Concepts

### 1. The Children Prop

React automatically provides a special prop called `children` to every component. It represents the content between the opening and closing tags:

```typescript
<Card>
  This becomes the children prop
</Card>
```

**Type Definition:**
```typescript
interface CardProps {
  children: React.ReactNode
}
```

`React.ReactNode` can be:
- String or number
- JSX elements
- Arrays of React nodes
- null or undefined
- Boolean values (render nothing)

### 2. Component Composition

Instead of passing data through many props, compose components together:

**❌ Props-heavy approach:**
```typescript
<Card
  title="User Profile"
  content="John Doe"
  footer="Edit Profile"
  hasHeader={true}
  hasFooter={true}
/>
```

**✅ Composition approach:**
```typescript
<Card>
  <CardHeader>User Profile</CardHeader>
  <CardBody>John Doe</CardBody>
  <CardFooter>Edit Profile</CardFooter>
</Card>
```

**Benefits:**
- More flexible - components can contain any content
- More readable - structure is clear
- More reusable - components are simple and focused
- Easier to extend - add new sections without changing APIs

### 3. Compound Components

Card and its sub-components form a "compound component" pattern - components designed to work together:

```typescript
// These work together as a system
<Card>
  <CardHeader />
  <CardBody />
  <CardFooter />
</Card>
```

Examples in popular libraries:
- `<select>` and `<option>`
- Material-UI's `<Menu>` and `<MenuItem>`
- React Bootstrap's `<Nav>` and `<NavItem>`

### 4. Styling Composition

Each component handles its own styling:

```typescript
function Card({ children }: CardProps) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
      {children}
    </div>
  )
}

function CardHeader({ children }: CardProps) {
  return (
    <div style={{ borderBottom: '1px solid #eee', padding: '16px' }}>
      {children}
    </div>
  )
}
```

This keeps styling concerns separated and makes components more maintainable.

## Common Patterns

### Adding Optional Props

Components can accept additional props while still using children:

```typescript
interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'highlighted' | 'warning'
}

function Card({ children, variant = 'default' }: CardProps) {
  const backgroundColor = {
    default: 'white',
    highlighted: '#f0f8ff',
    warning: '#fff3cd'
  }[variant]

  return (
    <div style={{ backgroundColor }}>
      {children}
    </div>
  )
}

// Usage
<Card variant="highlighted">
  <CardBody>Important content</CardBody>
</Card>
```

### Conditional Sections

Components can be used conditionally:

```typescript
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  {showFooter && <CardFooter>Footer</CardFooter>}
</Card>
```

### Passing Props Through

Sometimes you need to pass props from parent to children:

```typescript
<Card>
  <CardHeader>
    <h2>{title}</h2>
  </CardHeader>
  <CardBody>
    {content}
  </CardBody>
</Card>
```

## Composition vs Inheritance

React recommends composition over inheritance:

**❌ Inheritance (Not Recommended):**
```typescript
class SpecialCard extends Card {
  // Extending behavior
}
```

**✅ Composition (Recommended):**
```typescript
function SpecialCard({ children }: CardProps) {
  return (
    <Card>
      <div className="special-decoration">⭐</div>
      {children}
    </Card>
  )
}
```

**Why composition?**
- More flexible - can combine multiple behaviors
- Easier to test - smaller, focused components
- Less coupling - components don't depend on inheritance hierarchy
- More React-like - leverages the component model

## Common Mistakes

### ❌ Not accepting children
```typescript
function Card() {
  return <div>Fixed content</div>
}
```

### ✅ Accept children
```typescript
function Card({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

---

### ❌ Overusing props instead of composition
```typescript
<Card
  title="Title"
  body="Body"
  footer="Footer"
  showHeader={true}
  showFooter={true}
  titleSize="large"
  bodyAlign="center"
/>
```

### ✅ Use composition
```typescript
<Card>
  <CardHeader><h1>Title</h1></CardHeader>
  <CardBody style={{ textAlign: 'center' }}>Body</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>
```

---

### ❌ Forgetting TypeScript types
```typescript
function Card({ children }) {
  return <div>{children}</div>
}
```

### ✅ Define proper types
```typescript
interface CardProps {
  children: React.ReactNode
}

function Card({ children }: CardProps) {
  return <div>{children}</div>
}
```

## Advanced Patterns

### Render Props with Composition

```typescript
<Card>
  <CardBody>
    {(cardContext) => (
      <div>Access to card context: {cardContext.variant}</div>
    )}
  </CardBody>
</Card>
```

### Context API with Compound Components

```typescript
const CardContext = React.createContext({ variant: 'default' })

function Card({ children, variant = 'default' }) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div>{children}</div>
    </CardContext.Provider>
  )
}

function CardHeader({ children }) {
  const { variant } = useContext(CardContext)
  // Style based on variant
  return <div>{children}</div>
}
```

## Key Takeaways

1. **Children prop** makes components flexible and composable
2. **Composition over inheritance** is the React way
3. **Compound components** work together as a system
4. **Each component** should have a single, clear responsibility
5. **Flexibility** comes from composition, not complex prop APIs
6. **Type safety** with `React.ReactNode` for children

## Further Practice

- Add a variant prop to Card (default, success, warning, error)
- Create a CardImage component for card thumbnails
- Implement a CardActions component with button layouts
- Add collapsible functionality to CardBody
- Create a CardList component that manages multiple cards
- Build a similar pattern for Modal, Dialog, or Tabs components
- Implement Context API to share state between compound components
