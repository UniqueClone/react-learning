import styled from 'styled-components'

type ButtonProps = {
  $variant?: 'primary' | 'secondary' | 'danger'
  $size?: 'small' | 'medium' | 'large'
}

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Variant colors */
  background: ${props => {
    switch (props.$variant) {
      case 'primary':
        return '#3498db'
      case 'danger':
        return '#e74c3c'
      case 'secondary':
      default:
        return '#95a5a6'
    }
  }};

  color: white;

  /* Size padding */
  padding: ${props => {
    switch (props.$size) {
      case 'small':
        return '6px 12px'
      case 'large':
        return '14px 28px'
      case 'medium':
      default:
        return '10px 20px'
    }
  }};

  /* Size font */
  font-size: ${props => {
    switch (props.$size) {
      case 'small':
        return '12px'
      case 'large':
        return '16px'
      case 'medium':
      default:
        return '14px'
    }
  }};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Styled Components Button</h1>
      <p>Build a button using styled-components with variant and size props.</p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
        <Button $variant="primary" $size="large">Primary Large</Button>
        <Button $variant="secondary" $size="medium">Secondary Medium</Button>
        <Button $variant="danger" $size="small">Danger Small</Button>
        <Button $variant="primary">Primary Default</Button>
      </div>
    </div>
  )
}
