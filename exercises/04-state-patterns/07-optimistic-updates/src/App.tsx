import { useState } from 'react';
import './index.css';

interface Todo {
  id: number;
  text: string;
}

export default function App() {
  return (
    <div className="container">
      <h1>Optimistic UI Updates</h1>
    </div>
  );
}
