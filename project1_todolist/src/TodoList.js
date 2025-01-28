import React, { useEffect, useState } from "react";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`https://todo-api-d0mt.onrender.com/api/todos?userId=${userId}`)
      .then((response) => setTodos(response.data));
  }, [userId]);

  const addTodo = () => {
    axios
      .post("https://todo-api-d0mt.onrender.com/api/todos", { userId, task })
      .then(() => {
        setTodos((prev) => [...prev, { user_id: userId, task }]);
        setTask("");
      });
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="New Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
