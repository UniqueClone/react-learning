// Complete advanced custom hooks with TypeScript generics
// See README.md for full requirements

import { useState } from 'react'

function useFetch<T>(url: string, options?: { cache?: boolean }) {
}

function useDebounce<T>(value: T, delay: number): T {
}

interface User {
  id: number
  name: string
  email: string
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div>
      <h1>Advanced Custom Hooks</h1>

      <section>
        <h2>Debounced Search</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p>Search term: {searchTerm}</p>
      </section>

      <section>
        <h2>Fetched Users</h2>
      </section>
    </div>
  )
}
