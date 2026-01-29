import styles from './Card.module.css'

type CardProps = {
  title: string
  children: React.ReactNode
  elevated?: boolean
}

export function Card({ title, children, elevated }: CardProps) {
  const className = `${styles.card} ${elevated ? styles.elevated : ''}`

  return (
    <div className={className}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
