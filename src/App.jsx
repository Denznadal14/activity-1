import { useState, useEffect } from "react";

const btn =
  "cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-white hover:bg-indigo-700";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between border-b border-gray-100 p-2.5">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${task.done ? "line-through opacity-50" : ""}`}
      >
        {task.text}
      </span>
      <button className={btn} onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </li>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggle = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const clearCompleted = () => setTasks(tasks.filter((t) => !t.done));
  const visibleTasks = tasks.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.done : t.done
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <main className="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow-lg">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-indigo-600">My Tasks</h1>
          <p className="text-sm text-gray-500">Created by Denz Matthew Nadal</p>
        </header>
        <div className="mb-4 flex gap-2">
          <input
            className="flex-1 rounded-md border border-gray-300 p-2.5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a task..."
          />
          <button className={btn} onClick={addTask}>
            Add
          </button>
        </div>
        <div className="mb-2 flex gap-2">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`cursor-pointer rounded-md px-3 py-1 text-sm capitalize ${filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
        <ul>
          {visibleTasks.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={toggle} onDelete={remove} />
          ))}
        </ul>
        <p className="my-3 text-gray-600">
          {tasks.filter((t) => !t.done).length} remaining
        </p>
        <button className={btn} onClick={clearCompleted}>
          Clear completed
        </button>
      </main>
    </div>
  );
}