# Solution: Lazy Loading Images

## Complete Implementation

```typescript
import { useRef, useEffect, useState } from 'react';
import './index.css';

function useLazyLoad(ref: React.RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' } // Start loading slightly before element is visible
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isVisible;
}

interface LazyImageProps {
  src: string;
  alt: string;
}

function LazyImage({ src, alt }: LazyImageProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  const isVisible = useLazyLoad(imgRef);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div ref={imgRef} className="image-wrapper">
      {!isLoaded && <div className="placeholder" data-testid="placeholder">Loading...</div>}
      {isVisible && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{ display: isLoaded ? 'block' : 'none' }}
        />
      )}
    </div>
  );
}

const IMAGES = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/300/200?random=${i + 1}`,
  alt: `Random image ${i + 1}`,
}));

export default function App() {
  return (
    <div className="container">
      <h1>Lazy Loading Images</h1>
      <p>Scroll down to load images progressively</p>

      <div className="image-grid">
        {IMAGES.map((image) => (
          <LazyImage key={image.id} src={image.src} alt={image.alt} />
        ))}
      </div>
    </div>
  );
}
```

## Key Concepts

### Intersection Observer API

**What it does:**
- Observes when elements enter/exit the viewport
- More performant than scroll event listeners
- Supports options like `rootMargin` for early loading

**Basic pattern:**
```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Element is visible
    }
  });
}, options);
```

### Custom Hook: useLazyLoad

**Purpose:** Encapsulate intersection observer logic

**Key features:**
1. **Accepts a ref** - To observe a specific element
2. **Returns visibility state** - Boolean indicating if element is visible
3. **Unobserves after visible** - No need to keep watching once loaded
4. **Cleanup** - Disconnects observer on unmount
5. **rootMargin option** - Starts loading 50px before element is visible

### LazyImage Component

**Loading states:**
1. **Not visible** - Shows placeholder, no image element
2. **Visible but loading** - Shows placeholder + hidden image
3. **Loaded** - Hides placeholder, shows image

**Why two states?**
- `isVisible` - Controls when to start loading
- `isLoaded` - Controls when to show the image

## Performance Benefits

**Before lazy loading:**
- All 20 images load immediately (~6MB total)
- Slow initial page load
- Wasted bandwidth for images never viewed

**After lazy loading:**
- Only visible images load initially (~300KB)
- Fast initial page load (20x smaller)
- Images load progressively as needed
- 95% bandwidth savings for typical usage

## Key Takeaways

1. **Use Intersection Observer** for viewport detection
2. **rootMargin** improves UX by loading slightly early
3. **Unobserve** after loading to save resources
4. **Cleanup** observers to prevent memory leaks
5. **Progressive loading** dramatically improves performance
6. **Custom hooks** make the pattern reusable

## Common Pitfalls

1. **Forgetting cleanup** - Always disconnect observers
2. **Not using rootMargin** - Images load too late, visible delay
3. **Observing too early** - Put ref on wrapper, not img
4. **No loading state** - Layout shift when images load

## Further Learning

- [MDN: Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Web.dev: Lazy Loading Images](https://web.dev/lazy-loading-images/)
- [Native lazy loading](https://web.dev/browser-level-image-lazy-loading/) - `<img loading="lazy">`
