import './Card.css'

type CardProps = {
  name: string
  role: 'admin' | 'user' | 'guest'
  bio: string
  avatar: string
}

function Card({ name, role, bio, avatar }: CardProps) {
  const roleColors = {
    admin: '#e74c3c',
    user: '#3498db',
    guest: '#95a5a6'
  }

  return (
    <div className="card" style={{ borderLeft: `4px solid ${roleColors[role]}` }}>
      <div className="card-header">
        <img src={avatar} alt={name} className="avatar" />
        <div className="card-info">
          <h2 className="card-name">{name}</h2>
          <span className="role-badge">{role}</span>
        </div>
      </div>
      <p className="card-bio">{bio}</p>
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
