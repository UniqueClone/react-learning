// Complete the user data fetcher with loading/error states
// See README.md for full requirements

interface User {
  id: number
  name: string
  email: string
  company: {
    name: string
  }
}

// Mock API endpoint
const fetchUser = async (id: number): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay

  if (id === 999) {
    throw new Error('User not found')
  }

  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
    company: {
      name: `Company ${id}`
    }
  }
}

export default function App() {

  const handleUserSelect = (id: number) => {
  }

  return (
    <div>
      <h1>User Profile Loader</h1>

      <div>
        <button onClick={() => handleUserSelect(1)}>Load User 1</button>
        <button onClick={() => handleUserSelect(2)}>Load User 2</button>
        <button onClick={() => handleUserSelect(3)}>Load User 3</button>
        <button onClick={() => handleUserSelect(999)}>Load Invalid User</button>
      </div>
    </div>
  )
}
