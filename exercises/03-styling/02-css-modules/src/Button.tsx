// import styles from './Button.module.css';

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'danger'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
    >
      {children}
    </button>
  )
}
