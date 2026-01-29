# Solution: Debouncing and Throttling

## Complete Implementation

```typescript
import { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      }
    }) as T,
    [callback, delay]
  );
}

const searchAPI = (query: string): string[] => {
  if (!query) return [];
  return [
    `${query} tutorial`,
    `${query} documentation`,
    `${query} best practices`,
    `${query} examples`,
  ];
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);
  const [results, setResults] = useState<string[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const searchResults = searchAPI(debouncedSearchTerm);
      setResults(searchResults);
      setSearchCount((prev) => prev + 1);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  const handleScroll = useThrottle(() => {
    setScrollPosition(window.scrollY);
    setScrollCount((prev) => prev + 1);
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="container">
      <h1>Debouncing and Throttling</h1>

      <section className="demo-section">
        <h2>Debounced Search</h2>
        <p>Type to search (debounced 500ms)</p>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
        <p className="metric">Searches performed: {searchCount}</p>
        <ul>
          {results.map((result, i) => (
            <li key={i}>{result}</li>
          ))}
        </ul>
      </section>

      <section className="demo-section">
        <h2>Throttled Scroll</h2>
        <p>Scroll the page (throttled 200ms)</p>
        <p className="metric">Scroll position: {Math.round(scrollPosition)}px</p>
        <p className="metric">Updates triggered: {scrollCount}</p>
      </section>

      <div style={{ height: '200vh', padding: '2rem', background: '#f5f5f5' }}>
        <p>Scroll down to see throttling in action...</p>
      </div>
    </div>
  );
}
```

## Key Concepts

### Debouncing

**Definition:** Delay execution until after a period of inactivity

**How it works:**
1. User triggers event (types in input)
2. Start a timer (500ms)
3. If another event occurs, cancel timer and restart
4. When timer completes, execute the function
5. Result: Only executes after user stops typing

**Visual timeline:**
```
Type 'r' → Timer starts (500ms)
Type 'e' → Timer resets (500ms)  ← Previous timer cancelled
Type 'a' → Timer resets (500ms)  ← Previous timer cancelled
Type 'c' → Timer resets (500ms)  ← Previous timer cancelled
Type 't' → Timer resets (500ms)  ← Previous timer cancelled
[Wait 500ms]
Execute search! ← Only one search for "react"
```

**useDebounce Implementation:**
```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up timer to update after delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up: cancel timer if value changes again
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

### Throttling

**Definition:** Limit execution to once per time period

**How it works:**
1. User triggers event (scrolls)
2. Execute function immediately
3. Record execution time
4. Ignore all events for next 200ms
5. After 200ms, allow next execution
6. Result: Maximum 5 executions per second

**Visual timeline:**
```
Scroll event 1 → Execute! (lastRun = 0ms)
Scroll event 2 → Ignore (time = 50ms, too soon)
Scroll event 3 → Ignore (time = 100ms, too soon)
Scroll event 4 → Ignore (time = 150ms, too soon)
Scroll event 5 → Execute! (time = 200ms, allowed)
Scroll event 6 → Ignore (time = 250ms, too soon)
Scroll event 7 → Execute! (time = 400ms, allowed)
```

**useThrottle Implementation:**
```typescript
function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args) => {
      const now = Date.now();
      // Only execute if enough time has passed
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now; // Update last execution time
      }
    }) as T,
    [callback, delay]
  );
}
```

## When to Use Each

### Use Debouncing For:
- **Search inputs** - Wait for user to finish typing
- **Form validation** - Validate after user stops editing
- **Autosave** - Save after user stops making changes
- **Window resize** - Recalculate layout after resizing stops
- **Rule:** "Wait until the user is done"

### Use Throttling For:
- **Scroll handlers** - Update position periodically while scrolling
- **Mouse move** - Track position without overwhelming updates
- **API rate limiting** - Respect rate limits (max 10/second)
- **Animation frames** - Limit updates to match display refresh rate
- **Rule:** "Do it regularly, but not too often"

## Performance Impact

### Debouncing Example (Search)
**Without debouncing:**
- Type "react" (5 keystrokes)
- 5 API calls
- 5 network requests
- 5 re-renders

**With debouncing (500ms):**
- Type "react" (5 keystrokes)
- 1 API call (after typing stops)
- 1 network request
- 1 re-render
- **80% reduction in API calls**

### Throttling Example (Scroll)
**Without throttling:**
- Scroll for 1 second
- ~300 scroll events
- 300 state updates
- 300 re-renders

**With throttling (200ms):**
- Scroll for 1 second
- ~300 scroll events
- 5 state updates (1 per 200ms)
- 5 re-renders
- **98% reduction in updates**

## Common Pitfalls

1. **Wrong delay value**
   - Too short: Doesn't help performance
   - Too long: Feels unresponsive
   - Good defaults: 300-500ms debounce, 100-200ms throttle

2. **Forgetting cleanup**
   - Always clear timers in useEffect cleanup
   - Prevents memory leaks and stale updates

3. **Using debounce for scroll**
   - Debouncing scroll makes it feel broken
   - Use throttle for continuous events

4. **Using throttle for search**
   - Throttling search triggers too many unnecessary calls
   - Use debounce for discrete inputs

5. **Not considering UX**
   - Long delays feel laggy
   - Show loading states during debounce/throttle

## Key Takeaways

1. **Debounce delays until inactivity** - Perfect for search, validation
2. **Throttle limits frequency** - Perfect for scroll, mouse events
3. **Both dramatically improve performance** - Fewer operations, less re-rendering
4. **Clean up timers** - Prevent memory leaks
5. **Choose appropriate delays** - Balance performance and UX
6. **Custom hooks make it reusable** - Write once, use everywhere

## Further Learning

- [Lodash debounce/throttle](https://lodash.com/docs#debounce) - Battle-tested implementations
- [use-debounce library](https://github.com/xnimorz/use-debounce) - Popular React hook library
- [Web.dev: Debouncing and Throttling](https://web.dev/debounce-your-input-handlers/)
- [CSS Tricks: Debouncing/Throttling](https://css-tricks.com/debouncing-throttling-explained-examples/)
