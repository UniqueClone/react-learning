import styles from './App.module.css'

// Sample data for cards
const products = [
  { id: 1, name: 'Product 1', price: '$29', image: 'https://via.placeholder.com/300x200/4A90E2/ffffff?text=Product+1' },
  { id: 2, name: 'Product 2', price: '$39', image: 'https://via.placeholder.com/300x200/50C878/ffffff?text=Product+2' },
  { id: 3, name: 'Product 3', price: '$49', image: 'https://via.placeholder.com/300x200/E27A3F/ffffff?text=Product+3' },
  { id: 4, name: 'Product 4', price: '$59', image: 'https://via.placeholder.com/300x200/9B59B6/ffffff?text=Product+4' },
  { id: 5, name: 'Product 5', price: '$69', image: 'https://via.placeholder.com/300x200/E74C3C/ffffff?text=Product+5' },
  { id: 6, name: 'Product 6', price: '$79', image: 'https://via.placeholder.com/300x200/3498DB/ffffff?text=Product+6' },
]

export default function App() {
  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logo}>ResponsiveShop</h1>
        <nav className={styles.nav}>
          <a href="#home" className={styles.navLink}>Home</a>
          <a href="#products" className={styles.navLink}>Products</a>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
        </nav>
      </header>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Categories</h2>
        <ul className={styles.categoryList}>
          <li className={styles.categoryItem}>Electronics</li>
          <li className={styles.categoryItem}>Clothing</li>
          <li className={styles.categoryItem}>Home & Garden</li>
          <li className={styles.categoryItem}>Sports</li>
          <li className={styles.categoryItem}>Books</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <h2 className={styles.mainTitle}>Featured Products</h2>

        <div className={styles.cards}>
          {products.map(product => (
            <article key={product.id} className={styles.card}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.cardImage}
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardPrice}>{product.price}</p>
                <button className={styles.cardButton}>Add to Cart</button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 ResponsiveShop. All rights reserved.</p>
      </footer>
    </div>
  )
}
