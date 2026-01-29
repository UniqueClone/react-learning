import { useState } from 'react'
import styles from './App.module.css'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CSS Animations Demo</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Modal with Transitions</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.openButton}
        >
          Open Modal
        </button>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Loading Spinner</h2>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Animated Buttons</h2>
        <div className={styles.buttonGroup}>
        </div>
      </section>

    </div>
  )
}
