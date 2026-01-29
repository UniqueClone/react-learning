import { useState, useEffect, ReactNode } from 'react';
import './index.css';

interface MousePosition {
  x: number;
  y: number;
}

interface ToggleState {
  isOn: boolean;
  toggle: () => void;
}

export default function App() {
  return (
    <div className="app">
      <h1>Render Props Pattern</h1>
      <p>Reusable logic through function-as-children</p>

      <section className="demo-section">
        <h2>Mouse Tracker Examples</h2>
      </section>

      <section className="demo-section">
        <h2>Toggle Examples</h2>
      </section>
    </div>
  );
}
