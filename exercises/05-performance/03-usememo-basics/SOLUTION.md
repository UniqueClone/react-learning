# Solution: useMemo for Expensive Calculations

## The Problem

The filtering and sorting operations were running on **every render**, even when unrelated state changed (like toggling dark mode). This caused unnecessary work:

- Clicking "Toggle Theme" triggered filtering and sorting
- Every render recalculated the same results
- Performance degraded with larger datasets

## The Solution

Wrap expensive calculations with `useMemo`:

```tsx
import { useState, useMemo } from 'react'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [darkMode, setDarkMode] = useState(false)

  // Memoize filtering - only recalculates when dependencies change
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...')

    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = category === 'all' || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, category]) // Dependencies: PRODUCTS is constant, so not needed

  // Memoize sorting - only recalculates when dependencies change
  const sortedProducts = useMemo(() => {
    console.log('Sorting products...')

    return [...filteredProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })
  }, [filteredProducts, sortOrder])

  // ... rest of component
}
```

## How useMemo Works

1. **First Render**:
   - Executes the function and caches the result
   - Stores the dependencies

2. **Subsequent Renders**:
   - Compares current dependencies with cached dependencies
   - If unchanged, returns cached result (no recalculation)
   - If changed, runs function again and caches new result

3. **Syntax**:
   ```tsx
   const memoizedValue = useMemo(() => {
     // Expensive calculation
     return result
   }, [dependency1, dependency2])
   ```

## What You Should Observe

After adding `useMemo`:

1. **Toggle Theme**: No "Filtering..." or "Sorting..." logs (unrelated state)
2. **Type in Search**: "Filtering..." and "Sorting..." logs appear (dependencies changed)
3. **Change Category**: "Filtering..." and "Sorting..." logs appear
4. **Change Sort Order**: Only "Sorting..." log appears (filtering result unchanged)

## When to Use useMemo

### Good Use Cases:
- Expensive calculations (filtering, sorting, complex math)
- Creating objects/arrays that are passed to memoized children
- Computing derived state from props/state
- Processing large datasets

### Bad Use Cases:
- Simple calculations (addition, string concat)
- Calculations that always produce different results
- Over-optimization (adds overhead)

### Example - When NOT to use:
```tsx
// DON'T: Too simple, useMemo overhead > calculation cost
const doubled = useMemo(() => count * 2, [count])

// DO: Just calculate it
const doubled = count * 2
```

### Example - When TO use:
```tsx
// DO: Expensive operation
const processedData = useMemo(() => {
  return hugeArray
    .filter(/* complex condition */)
    .map(/* expensive transformation */)
    .sort(/* custom sort */)
}, [hugeArray, filterParams])
```

## Dependencies Array

The dependencies array is critical:

### Too Few Dependencies (Bug!)
```tsx
// BUG: searchTerm changes but filteredProducts doesn't update
const filteredProducts = useMemo(() => {
  return PRODUCTS.filter(p => p.name.includes(searchTerm))
}, []) // Missing searchTerm!
```

### Too Many Dependencies (Inefficient)
```tsx
// INEFFICIENT: darkMode isn't used, so no need to include it
const filteredProducts = useMemo(() => {
  return PRODUCTS.filter(p => p.name.includes(searchTerm))
}, [searchTerm, darkMode]) // darkMode is unnecessary
```

### Just Right
```tsx
// CORRECT: Only dependencies that are actually used
const filteredProducts = useMemo(() => {
  return PRODUCTS.filter(p => p.name.includes(searchTerm))
}, [searchTerm])
```

## Common Mistakes

1. **Forgetting Dependencies**
   ```tsx
   // BUG: Missing searchTerm dependency
   useMemo(() => products.filter(p => p.name.includes(searchTerm)), [])
   ```

2. **Using useMemo for Everything**
   ```tsx
   // Unnecessary - too simple
   const sum = useMemo(() => a + b, [a, b])
   ```

3. **Creating New Objects in Dependencies**
   ```tsx
   // BUG: {} creates new object every render, memo never hits
   useMemo(() => expensiveCalc(), [{}])
   ```

4. **Not Measuring Impact**
   - Always profile before and after
   - useMemo has overhead - make sure it helps

## useMemo vs useCallback

- **useMemo**: Memoizes a **value** (result of calculation)
  ```tsx
  const value = useMemo(() => compute(), [deps])
  ```

- **useCallback**: Memoizes a **function** (reference stability)
  ```tsx
  const fn = useCallback(() => doSomething(), [deps])
  // Equivalent to:
  const fn = useMemo(() => () => doSomething(), [deps])
  ```

## Key Takeaways

- **useMemo caches expensive calculations** to avoid recalculating on every render
- **Dependencies control when to recalculate** - only include values used in the calculation
- **Watch console logs** to verify memoization is working
- **Don't overuse** - profile first, optimize second
- **Common pattern**: Filter with useMemo, then sort with another useMemo
- **useMemo is for values**, useCallback is for functions (next exercise!)
- **Referential equality matters** for child component optimization

## Performance Tips

1. **Chain memoizations**:
   ```tsx
   const filtered = useMemo(() => filter(data), [data])
   const sorted = useMemo(() => sort(filtered), [filtered])
   // sorted only recalculates if filtered changes
   ```

2. **Combine with React.memo**:
   ```tsx
   const ExpensiveChild = memo(({ data }) => {
     // Only re-renders if data changes
   })

   // In parent:
   const data = useMemo(() => processData(), [deps])
   return <ExpensiveChild data={data} />
   ```

3. **Measure everything**:
   - Use React DevTools Profiler
   - Add console.time/timeEnd
   - Only optimize what's actually slow
