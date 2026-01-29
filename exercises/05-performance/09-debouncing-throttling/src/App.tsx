import { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';

function useDebounce<T>(value: T, delay: number): T {
}

function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
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
