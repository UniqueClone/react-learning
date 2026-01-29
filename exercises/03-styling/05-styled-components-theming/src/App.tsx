import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
`

const Card = styled.div`
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`

function ThemedApp() {
  return (
    <Container>
      <h1>Styled Components Theming</h1>
      <Card>
        <h2>Card Title</h2>
        <p>This card should use colors from the theme.</p>
        <Button>Themed Button</Button>
      </Card>
    </Container>
  )
}

export default function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle Theme (Current: {isDark ? 'dark' : 'light'})
      </button>

      <ThemedApp />
    </div>
  )
}
