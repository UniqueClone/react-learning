import { useState } from 'react';
import './index.css';

const ITEM_COUNT = 10000;
const ITEM_HEIGHT = 50;
const LIST_HEIGHT = 600;

export default function App() {
  const [useVirtualization, setUseVirtualization] = useState(true);

  return (
    <div className="container">
      <h1>List Virtualization</h1>

      <div className="controls">
        <button onClick={() => setUseVirtualization(!useVirtualization)}>
          {useVirtualization ? 'Show Normal List' : 'Show Virtualized List'}
        </button>
        <div className="metrics">
          <p>Total items: {ITEM_COUNT}</p>
          <p>Mode: {useVirtualization ? 'Virtualized' : 'Normal'}</p>
        </div>
      </div>
    </div>
  );
}
