import { useRef, useEffect, useState } from 'react';
import './index.css';

function useLazyLoad(ref: React.RefObject<HTMLElement>) {
}

interface LazyImageProps {
  src: string;
  alt: string;
}

function LazyImage({ src, alt }: LazyImageProps) {
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
      </div>
    </div>
  );
}
