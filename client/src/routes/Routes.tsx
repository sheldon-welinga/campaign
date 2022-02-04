import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Partners from "../pages/Partners";
import Posts from "../pages/Posts";
import Register from "../pages/Register";

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default RoutesContainer;
