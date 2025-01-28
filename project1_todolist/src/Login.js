import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/api/login", { email, password })
      .then((response) => {
        setIsAuthenticated(true);
        localStorage.setItem("userId", response.data.userId);
        navigate("/todo");
      })
      .catch((err) => alert("Invalid email or password"));
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Not registered? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;
