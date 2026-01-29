# Solution: Props and Prop Types

## Complete Solution

Here's the complete implementation:

```typescript
// Learn about props and TypeScript prop types
// Complete the Greeting component by implementing the missing parts

interface GreetingProps {
  name: string
  age: number
  location?: string
}

function Greeting({ name, age, location }: GreetingProps) {
  return (
    <div className="greeting-card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {location && <p>Location: {location}</p>}
    </div>
  )
}

export default function App() {
  return (
    <div className="app">
      <h1>Props and Prop Types</h1>

      <Greeting name="Alice" age={25} />
      <Greeting name="Bob" age={30} location="New York" />
      <Greeting name="Charlie" age={35} />
    </div>
  )
}
```

## Step-by-Step Explanation

### 1. Define the TypeScript Interface

```typescript
interface GreetingProps {
  name: string
  age: number
  location?: string
}
```

**Key points:**
- `name` and `age` are required properties (no `?`)
- `location` is optional (note the `?` after the property name)
- TypeScript will enforce these types at compile time

### 2. Update the Greeting Component

```typescript
function Greeting({ name, age, location }: GreetingProps) {
  // Component body
}
```

**Key points:**
- Props are destructured directly in the function parameters
- The `: GreetingProps` annotation tells TypeScript what props to expect
- Destructuring makes it easier to use props (write `name` instead of `props.name`)

### 3. Display the Props

```typescript
<h2>{name}</h2>
<p>Age: {age}</p>
{location && <p>Location: {location}</p>}
```

**Key points:**
- Use curly braces `{}` to embed JavaScript expressions in JSX
- The `&&` operator conditionally renders the location
- If `location` is `undefined` or empty, nothing is rendered

### 4. Render Components with Props

```typescript
<Greeting name="Alice" age={25} />
<Greeting name="Bob" age={30} location="New York" />
<Greeting name="Charlie" age={35} />
```

**Key points:**
- Props are passed as attributes on the component
- String values can use quotes directly
- Number and other values need curly braces `{}`
- Optional props can be omitted entirely

## Key Concepts

### Props Flow

Props flow **down** from parent to child (one-way data flow):
- `App` (parent) passes data to `Greeting` (child)
- Child components cannot modify props
- Props are read-only in the child component

### TypeScript Benefits

1. **Type Safety**: TypeScript catches errors at compile time
   ```typescript
   <Greeting name="Alice" age="25" /> // Error: age should be number
   <Greeting name="Alice" /> // Error: age is required
   ```

2. **IntelliSense**: Get autocomplete suggestions in your editor

3. **Documentation**: The interface serves as documentation for component usage

### Conditional Rendering with &&

The logical AND operator `&&` is a common pattern for conditional rendering:

```typescript
{condition && <Component />}
```

**How it works:**
- If `condition` is falsy (`false`, `null`, `undefined`, `0`, `""`), React renders nothing
- If `condition` is truthy, React renders the component
- This is equivalent to: `{condition ? <Component /> : null}`

### Optional Props

Two ways to handle optional props:

**1. Using `&&` operator:**
```typescript
{location && <p>Location: {location}</p>}
```

**2. Using default values:**
```typescript
function Greeting({ name, age, location = "Unknown" }: GreetingProps) {
  return (
    <>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Location: {location}</p> {/* Always renders */}
    </>
  )
}
```

## Common Mistakes

### ❌ Forgetting curly braces for non-string props
```typescript
<Greeting name="Alice" age="25" /> // age is a string, not a number!
```

### ✅ Correct
```typescript
<Greeting name="Alice" age={25} />
```

---

### ❌ Not marking optional props with `?`
```typescript
interface GreetingProps {
  name: string
  age: number
  location: string // Required, but you want it optional!
}
```

### ✅ Correct
```typescript
interface GreetingProps {
  name: string
  age: number
  location?: string // Optional
}
```

---

### ❌ Using `props.name` without destructuring
```typescript
function Greeting(props: GreetingProps) {
  return <h2>{name}</h2> // Error: name is not defined
}
```

### ✅ Correct
```typescript
function Greeting({ name, age, location }: GreetingProps) {
  return <h2>{name}</h2>
}
```

## Further Learning

- **Default Props**: Learn about default values for props
- **Children Prop**: The special `children` prop for component composition
- **Prop Drilling**: Understanding when props become cumbersome
- **PropTypes vs TypeScript**: Why TypeScript is preferred for type checking

## Next Steps

Practice props by:
1. Adding more props (email, phone, isActive)
2. Creating nested components that pass props down multiple levels
3. Experimenting with different data types (arrays, objects, functions)
