import { useState, useMemo, useCallback, memo } from 'react'

// BUG 1: Over-memoization - This simple component doesn't need memo
const Header = memo(function Header({ title }: { title: string }) {
  return <h1>{title}</h1>
})

// BUG 2: Under-memoization - This expensive list item needs memo
function ListItem({
  item,
  onToggle
}: {
  item: { id: number; text: string; completed: boolean }
  onToggle: (id: number) => void
}) {
  console.log(`ListItem ${item.id} rendered`)

  // Simulate expensive render
  let i = 0
  while (i < 1000000) i++

  return (
    <div className="list-item">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
      />
      <span>{item.text}</span>
    </div>
  )
}

// BUG 3: Over-memoization - Memoizing primitive calculations
function SimpleCounter({ count }: { count: number }) {
  const doubled = useMemo(() => count * 2, [count]) // Unnecessary!
  return <div>Count doubled: {doubled}</div>
}

export default function App() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', completed: false },
    { id: 2, text: 'Item 2', completed: false },
    { id: 3, text: 'Item 3', completed: false },
    { id: 4, text: 'Item 4', completed: false },
    { id: 5, text: 'Item 5', completed: false },
  ])
  const [count, setCount] = useState(0)
  const [filter, setFilter] = useState('')

  // BUG 4: Missing useCallback - function recreated every render
  const toggleItem = (id: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  // BUG 5: Wrong dependencies - filter is missing
  const filteredItems = useMemo(() => {
    console.log('Filtering items...')
    return items.filter(item =>
      item.text.toLowerCase().includes(filter.toLowerCase())
    )
  }, [items]) // Missing filter!

  return (
    <div className="container">
      <Header title="Memoization Patterns" />

      <div className="controls">
        <button onClick={() => setCount(count + 1)}>
          Increment Count: {count}
        </button>
        <input
          type="text"
          placeholder="Filter items..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <SimpleCounter count={count} />

      <div className="list">
        {filteredItems.map(item => (
          <ListItem
            key={item.id}
            item={item}
            onToggle={toggleItem}
          />
        ))}
      </div>
    </div>
  )
}
