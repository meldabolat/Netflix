import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Updated AuthContext
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://192.168.1.43:8000/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Token'ı localStorage'a kaydet
        localStorage.setItem("access_token", data.access_token);
        login(data.access_token, data.refresh_token, data.user_id, data.username); // login fonksiyonunda token'ı da saklayabilirsiniz
        navigate("/"); // Home sayfasına yönlendir
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid email or password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };
  

  return (
    <div className="login-container">
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
      </div>

      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>
        <button type="submit" className="btn">
          Login
        </button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
