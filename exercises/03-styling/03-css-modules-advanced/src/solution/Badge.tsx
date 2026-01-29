import styles from './Badge.module.css'

type BadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'danger'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variantClass = variant !== 'default' ? styles[variant] : ''
  const className = `${styles.badge} ${variantClass}`

  return <span className={className}>{children}</span>
}
