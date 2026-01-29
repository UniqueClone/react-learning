import { useState } from 'react';
import './index.css';

// NOTE: This component has INTENTIONAL performance issues!
// Your task is to identify and fix them.

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Generate sample users
const users: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : 'User',
}));

// PERFORMANCE ISSUE 1: This component re-renders unnecessarily
// Even when its props haven't changed
interface UserCardProps {
  user: User;
  onSelect: (id: number) => void;
  isSelected: boolean;
}

function UserCard({ user, onSelect, isSelected }: UserCardProps) {
  console.log('UserCard render:', user.name);

  return (
    <div
      className={`user-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(user.id)}
    >
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <span className="role">{user.role}</span>
    </div>
  );
}

// PERFORMANCE ISSUE 2: Expensive calculation runs on every render
// Even when fibInput hasn't changed
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export default function App() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [fibInput, setFibInput] = useState(20);

  // PERFORMANCE ISSUE 3: This calculation runs on EVERY render
  // Including when typing in search or clicking a user
  const fibResult = fibonacci(fibInput);

  // PERFORMANCE ISSUE 4: This filter runs on every render
  // Even when search and users haven't changed
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // PERFORMANCE ISSUE 5: New function created on every render
  // Breaks React.memo because reference changes
  const handleSelect = (userId: number) => {
    setSelected(userId);
  };

  // PERFORMANCE ISSUE 6: New function on every render
  const handleFibChange = (value: number) => {
    setFibInput(value);
  };

  return (
    <div className="container">
      <h1>Performance Audit Dashboard</h1>

      <div className="controls">
        <div className="search-section">
          <label>
            Search Users:
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search..."
            />
          </label>
          <p className="metric">Found: {filteredUsers.length} users</p>
        </div>

        <div className="fib-section">
          <label>
            Fibonacci Input:
            <input
              type="range"
              min="10"
              max="30"
              value={fibInput}
              onChange={(e) => handleFibChange(Number(e.target.value))}
            />
            <span>{fibInput}</span>
          </label>
          <p className="metric">Result: {fibResult}</p>
        </div>
      </div>

      <div className="user-grid">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onSelect={handleSelect}
            isSelected={selected === user.id}
          />
        ))}
      </div>
    </div>
  );
}
