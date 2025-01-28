import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import TodoList from "./TodoList";
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todo"
          element={isAuthenticated ? <TodoList /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
