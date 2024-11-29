import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State to manage API feedback
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
  const response = await fetch("http://192.168.1.43:8000/users/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error response:", errorData);
    setMessage(errorData.message || "Registration failed.");
  } else {
    const data = await response.json();
    setMessage("Registration successful! Please log in.");
  }
} catch (error) {
  console.error("Network error:", error);
  setMessage("An error occurred. Please try again.");
}
  };

  return (
    <div className="register-container">
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
      </div>
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="btn">Register</button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
