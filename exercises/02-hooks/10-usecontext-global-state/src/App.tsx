// Build a complete theme system with Context API
// See README.md for full requirements

function Header() {
  return <div>Header</div>
}

function MainContent() {
  return <div>Main Content</div>
}

function Footer() {
  return <div>Footer</div>
}

export default function App() {
  return (
    <div>
      <h1>Theme System with Context</h1>
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}
