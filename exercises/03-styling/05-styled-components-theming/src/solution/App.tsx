import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './theme'

const Container = styled.div`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s ease;
`

const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid ${props => props.theme.colors.border};
  max-width: 400px;
`

const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
`

const CardTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-top: 0;
`

const CardText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
`

function ThemedApp() {
  return (
    <Container>
      <Title>Styled Components Theming</Title>
      <Card>
        <CardTitle>Card Title</CardTitle>
        <CardText>This card uses colors from the theme provided by ThemeProvider.</CardText>
        <Button>Themed Button</Button>
      </Card>
      <Card>
        <CardTitle>Another Card</CardTitle>
        <CardText>All components automatically receive the theme via context.</CardText>
      </Card>
    </Container>
  )
}

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const theme = isDark ? darkTheme : lightTheme

  return (
    <div>
      <button onClick={() => setIsDark(!isDark)} style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
        Toggle Theme (Current: {isDark ? 'dark' : 'light'})
      </button>

      <ThemeProvider theme={theme}>
        <ThemedApp />
      </ThemeProvider>
    </div>
  )
}
