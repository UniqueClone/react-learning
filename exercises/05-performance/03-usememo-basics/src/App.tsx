import { useState } from 'react'

// Sample product data
const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 1200, category: 'electronics' },
  { id: 2, name: 'Phone', price: 800, category: 'electronics' },
  { id: 3, name: 'Headphones', price: 200, category: 'electronics' },
  { id: 4, name: 'Desk', price: 300, category: 'furniture' },
  { id: 5, name: 'Chair', price: 150, category: 'furniture' },
  { id: 6, name: 'Monitor', price: 400, category: 'electronics' },
  { id: 7, name: 'Keyboard', price: 100, category: 'electronics' },
  { id: 8, name: 'Mouse', price: 50, category: 'electronics' },
  { id: 9, name: 'Bookshelf', price: 200, category: 'furniture' },
  { id: 10, name: 'Lamp', price: 75, category: 'furniture' },
]

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [darkMode, setDarkMode] = useState(false)

  const filteredProducts = (() => {
    console.log('Filtering products...')

    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = category === 'all' || product.category === category
      return matchesSearch && matchesCategory
    })
  })()

  const sortedProducts = (() => {
    console.log('Sorting products...')

    return [...filteredProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })
  })()

  return (
    <div className="container" style={{ backgroundColor: darkMode ? '#1a1a1a' : '#fff' }}>
      <h1>useMemo Basics</h1>
      <p>Open console to see when calculations run</p>

      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle Theme (causes re-render)
        </button>
      </div>

      <div className="product-list">
        {sortedProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">${product.price}</p>
          </div>
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <p className="no-results">No products found</p>
      )}
    </div>
  )
}
