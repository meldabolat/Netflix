import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // Load token from localStorage if available
  const [authState, setAuthState] = useState(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const email = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");

    return {
      isAuthenticated: !!accessToken,
      accessToken,
      refreshToken,
      email,
      username,
    };
  });

  const login = (accessToken, refreshToken, email, username) => {
    setAuthState({
      isAuthenticated: true,
      accessToken,
      refreshToken,
      email,
      username,
    });

    // Store tokens and user info in localStorage
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user_id", email);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      email: null,
      username: null,
    });

    // Remove tokens and user info from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");

    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
