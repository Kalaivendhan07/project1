import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = (event) => {
    console.log('check1');
    
    event.preventDefault(); // Prevent form submission to handle validation manually

    // Clear any existing error message
    setErrorMessage("");

    // Check if email and password are filled
    if (!email || !password) {
      setErrorMessage("Both fields are required!");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
    } else {
      // Implement login logic here
      console.log("Login attempted with", email, password);
    }

        axios
        .post("https://todo-api-d0mt.onrender.com/api/login", { email, password })
        .then((response) => {
        setIsAuthenticated(true);
        localStorage.setItem("userId", response.data.userId);
        navigate("/todo");
        })
        .catch((err) => alert("Invalid email or password"));

        // setIsAuthenticated(true);
        // navigate("/todo");

  };

  // Check if the form is valid (both fields are filled and email is valid)
  const isFormValid = email.trim() !== "" && password.trim() !== "" && /\S+@\S+\.\S+/.test(email);

  return (
    <div className="container1">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={!isFormValid}>
          Login
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>
        Not registered? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
