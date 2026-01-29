import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

const containerVariants = {
}

const itemVariants = {
}

export default function App() {
  const [items, setItems] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Learn Framer Motion' },
    { id: 3, text: 'Build animations' },
    { id: 4, text: 'Ship to production' },
  ])

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const addItem = () => {
    const newId = Math.max(...items.map(i => i.id), 0) + 1
    setItems([...items, { id: newId, text: `New item ${newId}` }])
  }

  return (
    <div className="container">
      <h1>Framer Motion Animations</h1>

      <button onClick={addItem} className="add-button">
        Add Item
      </button>

      <motion.ul
        className="list"
      >
        {items.map(item => (
          <motion.li
            key={item.id}
            className="list-item"
          >
            <span>{item.text}</span>
            <button onClick={() => removeItem(item.id)} className="remove-button">
              Remove
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
