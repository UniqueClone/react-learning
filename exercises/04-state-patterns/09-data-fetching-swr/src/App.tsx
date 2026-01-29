import './index.css';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function App() {
  return (
    <div className="container">
      <h1>Posts (SWR)</h1>
    </div>
  );
}
