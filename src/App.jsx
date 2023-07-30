import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <div className="container">
          <div className="wrapper">
            <input type="text" placeholder="Task to do" />
            <button className="btn-todo">Add</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
