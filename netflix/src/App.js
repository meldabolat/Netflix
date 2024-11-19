import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/layout/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import WatchHistory from "./pages/WatchHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login ve Register sayfaları */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Layout'u kapsayan tüm rotalar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="watchhistory" element={<WatchHistory />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
