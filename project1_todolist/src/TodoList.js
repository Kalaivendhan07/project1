import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TodoList.css"; 

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState(0);
  const [todayTasks, setTodayTasks] = useState(0);
  const userId = localStorage.getItem("userId");

  // Fetch tasks from the API
  useEffect(() => {
    axios
      .get(`https://todo-api-d0mt.onrender.com/api/todos?userId=${userId}`)
      .then((response) => {
        setTodos(response.data);
        updateTaskStats(response.data); // Update task statistics
      });
  }, [userId]);

  // Add new task
  const addTodo = () => {
    if (task.trim()) {
      axios
        .post("https://todo-api-d0mt.onrender.com/api/todos", { userId, task })
        .then((response) => {
          const newTodo = { user_id: userId, task, completed: false, date: new Date() };
          setTodos((prev) => [...prev, newTodo]);
          setTask("");
          updateTaskStats([...todos, newTodo]); // Update stats with new task
        });
    }
  };

  // Update task stats (completed, today's tasks, percentage)
  const updateTaskStats = (tasks) => {
    const completed = tasks.filter((todo) => todo.completed).length;
    const today = tasks.filter((todo) => new Date(todo.date).toDateString() === new Date().toDateString()).length;
    const percentage = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;

    setCompletedTasks(completed);
    setTodayTasks(today);
  };

  // Toggle completion status of a task
  const toggleCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    updateTaskStats(updatedTodos); // Recalculate stats after completion toggle
  };

  // Delete a task
  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    updateTaskStats(updatedTodos); // Recalculate stats after deletion
  };

  // Edit a task
  const editTodo = (index, newTask) => {
    const updatedTodos = [...todos];
    updatedTodos[index].task = newTask;
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      {/* Stats at the top */}
      <div className="stats">
        <div className="stat-box">
          <p>Completed Tasks</p>
          <h3>{completedTasks}</h3>
        </div>
        <div className="stat-box">
          <p>Today's Tasks</p>
          <h3>{todayTasks}</h3>
        </div>
        <div className="stat-box">
          <p>Completion Rate</p>
          <h3>{completedTasks ? `${((completedTasks / todos.length) * 100).toFixed(2)}%` : "0%"}</h3>
        </div>
      </div>

      <h2>To-Do List</h2>

      {/* Input for new task */}
      <div className="input-container">
        <input
          type="text"
          placeholder="New Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Task List */}
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
            style={{
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 80%)`, // Random background color
            }}
          >
            <div className="task-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompletion(index)}
              />
              <span>{todo.task}</span>
            </div>
            <div className="task-actions">
              <button onClick={() => deleteTodo(index)}>Delete</button>
              <button onClick={() => editTodo(index, prompt("Edit task:", todo.task))}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
