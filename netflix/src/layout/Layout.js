import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="content">
     
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
