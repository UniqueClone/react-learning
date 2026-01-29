import { useState } from 'react'

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

      <p>Implement themed components using CSS Modules + CSS Variables</p>
    </div>
  )
}
