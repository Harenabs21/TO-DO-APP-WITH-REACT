import { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    if (!todo.trim()) {
      setError(true); 
      alert("input cannot be empty");
      return;
    }
    if (editingTask === null) {
      // Si editingTask est null, cela signifie qu'on ajoute une nouvelle tâche
      const newTask = {
        id: new Date().getTime(),
        text: todo,
        completed: false,
      };
      setList([...list, newTask]);
    } else {
      // Sinon, on modifie la tâche existante
      const updatedList = list.map((task) =>
        task.id === editingTask ? { ...task, text: todo } : task
      );
      setList(updatedList);
      setEditingTask(null); // On réinitialise editingTask après modification
    }
    setError(false); 
    setTodo("");
  }
  function deleteTasks(id) {
    const updateTask = [...list].filter((todo) => todo.id !== id);
    setList(updateTask);
  }
  function taskCompleted(id) {
    const updateTask = list.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setList(updateTask);
  }
  function handleEditClick(id, text) {
    setEditingTask(id);
    setTodo(text);
  }
  return (
    <>
      <div className="app">
        <form className="container" onSubmit={handleSubmit}>
          <div className="wrapper">
            <input
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              placeholder="Task to do"
            />
            <button className="btn-todo" type="submit">
              {editingTask === null ? "Add" : "Edit"}
            </button>
          </div>
        </form>
        {list.map((task) => (
          <div className="task" key={task.id}>
            <p
              className={task.completed ? "task-text strike" : "task-text"}
              onClick={() => taskCompleted(task.id)}
            >
              {task.text}
            </p>
            <button
              className="edit"
              onClick={() => handleEditClick(task.id, task.text)}
            >
              edit
            </button>
            <button className="delete" onClick={() => deleteTasks(task.id)}>
              delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
