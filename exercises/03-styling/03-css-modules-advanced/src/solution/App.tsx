import { useState } from 'react'
import './theme.css'
import { Card } from './Card'
import { Badge } from './Badge'
import { Button } from './Button'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  return (
    <div data-theme={theme} style={{ minHeight: '100vh', padding: '20px' }}>
      <h1>Themed Component System</h1>

      <button onClick={toggleTheme}>
        Toggle Theme (Current: {theme})
      </button>

      <Card title="Project Status" elevated>
        <p>
          Status: <Badge variant="success">Active</Badge>
        </p>
        <p>This card uses CSS Modules for structure and CSS Variables for theme colors.</p>
        <Button onClick={() => alert('Button clicked!')}>View Details</Button>
      </Card>

      <Card title="Another Card">
        <p>
          Priority: <Badge variant="danger">High</Badge>
        </p>
        <p>This card is not elevated and demonstrates the theme system.</p>
      </Card>
    </div>
  )
}
