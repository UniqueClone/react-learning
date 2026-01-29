type CardProps = {
  // Add prop types here
}

function Card(/* Add props here */) {
  return (
    <div>
      <p>Implement the Card component</p>
    </div>
  )
}

export default function App() {
  const user = {
    name: 'Jane Smith',
    role: 'admin' as const,
    bio: 'Full-stack developer passionate about React and TypeScript',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>User Profile Card</h1>
      <Card {...user} />
    </div>
  )
}
