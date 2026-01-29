# Solution: Building Components with Tailwind

## Complete Implementation

### App.tsx

```tsx
import clsx from 'clsx'

type ButtonProps = {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'danger'
  variant?: 'solid' | 'outline'
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  children,
  className,
  ...props
}: ButtonProps) {
  // Base classes that all buttons share
  const baseClasses =
    'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

  // Size variants - control padding and font size
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  // Solid button colors
  const solidColors = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  }

  // Outline button colors
  const outlineColors = {
    primary:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    secondary:
      'border-2 border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
    danger:
      'border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
  }

  // Select color classes based on variant
  const colorClasses = variant === 'solid' ? solidColors[color] : outlineColors[color]

  // Combine all classes using clsx
  const buttonClasses = clsx(
    baseClasses,
    sizeClasses[size],
    colorClasses,
    className // Allow custom classes to be added
  )

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Tailwind Button Component
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sizes</h2>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Colors (Solid)
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="danger">Danger</Button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Colors (Outline)
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button color="primary" variant="outline">
                Primary
              </Button>
              <Button color="secondary" variant="outline">
                Secondary
              </Button>
              <Button color="danger" variant="outline">
                Danger
              </Button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Combinations
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button size="sm" color="primary" variant="outline">
                Small Primary Outline
              </Button>
              <Button size="lg" color="danger" variant="solid">
                Large Danger Solid
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
```

## Key Concepts

### 1. Tailwind Component Patterns

Tailwind components follow this pattern:
1. **Base classes**: Shared styles all variants need
2. **Variant mappings**: Objects mapping props to class strings
3. **Conditional composition**: Combine classes based on props
4. **Type safety**: TypeScript ensures valid prop combinations

### 2. The clsx Library

clsx is essential for Tailwind components:

```tsx
import clsx from 'clsx'

// Combines multiple class strings
clsx('base', 'variant', 'custom')
// => 'base variant custom'

// Filters out falsy values
clsx('base', false && 'hidden', true && 'visible')
// => 'base visible'

// Handles objects
clsx('base', { 'active': isActive, 'disabled': isDisabled })
// => 'base active' (if isActive is true)

// Combines all approaches
clsx(baseClasses, sizeClasses[size], colorClasses[color], className)
```

**Why clsx?**
- Cleaner than template literals
- Filters out undefined/false values
- Better performance than string concatenation
- Standard pattern in Tailwind component libraries

### 3. Variant System Design

Good variant systems have:

**Clear structure:**
```tsx
const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}
```

**Consistent patterns:**
- All sizes adjust padding AND font size
- All colors include hover state
- All buttons have focus rings

**Composability:**
```tsx
// These can be combined freely
<Button size="lg" color="danger" variant="outline" />
```

### 4. Tailwind Utility Classes Explained

**Base classes:**
```
font-medium          → Consistent weight
rounded-md           → Rounded corners (0.375rem)
transition-colors    → Smooth color changes
focus:outline-none   → Remove default outline
focus:ring-2         → Add focus ring (2px)
focus:ring-offset-2  → Space between element and ring
```

**Size classes:**
```
px-3 py-1.5  → Padding: 0.75rem x, 0.375rem y (small)
px-4 py-2    → Padding: 1rem x, 0.5rem y (medium)
px-6 py-3    → Padding: 1.5rem x, 0.75rem y (large)
```

**Color classes (solid):**
```
bg-blue-600         → Background color
hover:bg-blue-700   → Darker on hover
text-white          → White text
focus:ring-blue-500 → Blue focus ring
```

**Color classes (outline):**
```
border-2               → 2px border
border-blue-600        → Border color
text-blue-600          → Text color
hover:bg-blue-50       → Light background on hover
focus:ring-blue-500    → Blue focus ring
```

### 5. Accepting Standard HTML Attributes

The component accepts all standard button props:

```tsx
type ButtonProps = {
  // Custom props
  size?: 'sm' | 'md' | 'lg'
  // ... other custom props
} & React.ButtonHTMLAttributes<HTMLButtonElement>
//  ↑ Includes: onClick, disabled, type, aria-*, etc.

// Usage:
<Button onClick={() => alert('Clicked!')} disabled>
  Click me
</Button>
```

This makes the component a drop-in replacement for native buttons.

### 6. className Prop Pattern

Allow custom classes to be added:

```tsx
function Button({ className, ...props }) {
  const buttonClasses = clsx(
    baseClasses,
    variantClasses,
    className  // User's custom classes override/extend
  )

  return <button className={buttonClasses} {...props} />
}

// Usage:
<Button className="mt-4 shadow-lg">Custom</Button>
```

### 7. Why This Pattern?

**Advantages:**
- Type-safe variants
- Easy to extend
- Consistent API
- Works with all button props
- Tailwind's purge/JIT can optimize classes
- No runtime style generation

**Compared to styled-components:**
```tsx
// styled-components: Runtime CSS generation
const Button = styled.button<{ $variant: string }>`
  background: ${p => p.$variant === 'primary' ? 'blue' : 'gray'};
`

// Tailwind: Pre-built utilities, no runtime
const buttonClass = clsx('bg-blue-600', sizeClasses[size])
```

Tailwind is faster at runtime but requires all variants to be in your bundle.

### 8. Component Library Pattern

This Button follows patterns from libraries like:
- **shadcn/ui**: Variant-based Tailwind components
- **Headless UI**: Unstyled + Tailwind utilities
- **Radix Themes**: Preset variants with Tailwind

The pattern scales to complex components:
```tsx
<Button
  size="lg"
  color="primary"
  variant="outline"
  leftIcon={<Icon />}
  isLoading={loading}
  onClick={handleClick}
>
  Submit
</Button>
```

## Testing Strategy

Tests verify:
1. **Rendering**: All variants render correctly
2. **Class application**: Correct Tailwind classes applied
3. **Combinations**: Multiple props work together
4. **Base classes**: All buttons share common classes
5. **Accessibility**: Focus rings present

## Common Mistakes

1. **Not using clsx**: String concatenation gets messy
   ```tsx
   // Bad
   className={`base ${size === 'lg' ? 'px-6' : 'px-4'} ${variant === 'solid' ? 'bg-blue' : 'border-blue'}`}

   // Good
   className={clsx(baseClasses, sizeClasses[size], colorClasses[color])}
   ```

2. **Forgetting hover states**: Always include hover variants
   ```tsx
   // Bad
   'bg-blue-600 text-white'

   // Good
   'bg-blue-600 hover:bg-blue-700 text-white'
   ```

3. **Missing focus states**: Required for accessibility
   ```tsx
   // Always include
   'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
   ```

4. **Not composing border with outline**: Outline buttons need border width
   ```tsx
   // Bad (thin border)
   'border-blue-600'

   // Good (visible border)
   'border-2 border-blue-600'
   ```

## Key Takeaways

1. **clsx is essential** for Tailwind components - it handles conditional classes cleanly
2. **Variant objects** provide a clear, maintainable pattern for component APIs
3. **Base classes** ensure consistency across all variants
4. **Type safety** catches invalid prop combinations at compile time
5. **Utility-first CSS** trades bundle size for runtime performance
6. **Focus rings** are critical for keyboard accessibility
7. **Component composition** works naturally with spread props
8. This pattern scales from simple buttons to complex component libraries
