import './index.css';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function App() {
  return (
    <div className="container">
      <h1>User List</h1>
    </div>
  );
}
