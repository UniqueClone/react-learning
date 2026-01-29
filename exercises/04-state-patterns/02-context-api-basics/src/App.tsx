import './index.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export default function App() {
  return (
    <div className="app">
      <h1>Context API Exercise</h1>
      <p>Build a user authentication system using Context API</p>
    </div>
  );
}
