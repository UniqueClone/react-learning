import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  elements: Set<Element>;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(element: Element) {
    this.elements.add(element);
    // Simulate immediate intersection for testing
    setTimeout(() => {
      this.callback(
        [
          {
            isIntersecting: true,
            target: element,
            intersectionRatio: 1,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: Date.now(),
          },
        ],
        this as unknown as IntersectionObserver
      );
    }, 0);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }
}

beforeEach(() => {
  global.IntersectionObserver = MockIntersectionObserver as any;
});

describe('Lazy Loading Images', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText(/lazy loading images/i)).toBeInTheDocument();
  });

  it('renders image placeholders initially', () => {
    render(<App />);
    const placeholders = screen.getAllByTestId(/placeholder/i);
    expect(placeholders.length).toBeGreaterThan(0);
  });

  it('loads images when they become visible', async () => {
    render(<App />);

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('sets correct src attributes on images', async () => {
    render(<App />);

    await waitFor(() => {
      const images = screen.getAllByRole('img') as HTMLImageElement[];
      expect(images[0].src).toContain('picsum.photos');
    });
  });

  it('displays multiple images', async () => {
    render(<App />);

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThanOrEqual(10);
    });
  });

  it('images have alt text', async () => {
    render(<App />);

    await waitFor(() => {
      const images = screen.getAllByRole('img') as HTMLImageElement[];
      expect(images[0].alt).toBeTruthy();
    });
  });

  it('shows loading state before image loads', () => {
    render(<App />);
    const placeholders = screen.getAllByTestId(/placeholder/i);
    expect(placeholders.length).toBeGreaterThan(0);
  });

  it('renders image grid layout', () => {
    render(<App />);
    const grid = document.querySelector('.image-grid');
    expect(grid).toBeInTheDocument();
  });

  it('has scroll instruction text', () => {
    render(<App />);
    expect(screen.getByText(/scroll down/i)).toBeInTheDocument();
  });

  it('creates intersection observers for images', async () => {
    const observeSpy = vi.spyOn(MockIntersectionObserver.prototype, 'observe');
    render(<App />);

    await waitFor(() => {
      expect(observeSpy).toHaveBeenCalled();
    });
  });
});
