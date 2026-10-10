import { useState } from "react";
import "./App.css";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.done ? "task done" : "task"}>
      <span onClick={() => onToggle(task.id)}>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>✕</button>
    </li>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggle = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const clearCompleted = () => setTasks(tasks.filter((t) => !t.done));


  return (
    <main className="app">
      <h1>My Tasks</h1>
      <div className="input-row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} onToggle={toggle} onDelete={remove} />
        ))}
            </ul>
      <p>{tasks.filter((t) => !t.done).length} remaining</p>
      <button onClick={clearCompleted}>Clear completed</button>
    </main>
  );
}