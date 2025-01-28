import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle Register
  const handleRegister = (event) => {
    event.preventDefault(); // Prevent form submission to handle validation manually

    // Clear previous error message
    setErrorMessage("");

    // Validate fields
    if (!name || !email || !password) {
      setErrorMessage("All fields are required!");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
    } else if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
    } else {
      // Proceed with registration
      axios
        .post("http://localhost:5000/api/register", { name, email, password })
        .then(() => {
          alert("Registered successfully! Please login.");
          navigate("/");
        })
        .catch((err) => alert("Registration failed"));
    }
  };

  // Check if the form is valid
  const isFormValid =
    name.trim() !== "" && email.trim() !== "" && password.trim() !== "" && /\S+@\S+\.\S+/.test(email) && password.length >= 6;

  return (
    <div className="container1">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          Register
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>
        Already registered? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default Register;
