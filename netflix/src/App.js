import React from "react";
import { WatchHistoryProvider } from "./context/WatchHistoryContext";
import { ListProvider } from "./context/ListContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import WatchHistory from "./pages/WatchHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WatchHistoryProvider>
          <ListProvider>
            <Routes>
              {/* Giriş ve Kayıt sayfaları herkese açık */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Korumalı rotalar */}
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="watchhistory"
                  element={
                    <ProtectedRoute>
                      <WatchHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="list"
                  element={
                    <ProtectedRoute>
                      <List />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </ListProvider>
        </WatchHistoryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
