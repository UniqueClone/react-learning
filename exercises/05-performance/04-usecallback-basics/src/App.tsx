interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  return (
    <div className="container">
      <h1>useCallback Basics</h1>
      <p>Open console and toggle tasks. Only affected task should re-render!</p>

      <div className="add-task">
      </div>

      <div className="task-list">
      </div>
    </div>
  )
}
