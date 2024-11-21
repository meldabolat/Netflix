import React from "react";
import { WatchHistoryProvider } from "./context/WatchHistoryContext";
import { ListProvider } from "./context/ListContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import WatchHistory from "./pages/WatchHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile";
function App() {
  return (
    <WatchHistoryProvider>
      <ListProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="watchhistory" element={<WatchHistory />} />
              <Route path="list" element={<List />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </ListProvider>
    </WatchHistoryProvider>
  );
}

export default App;
