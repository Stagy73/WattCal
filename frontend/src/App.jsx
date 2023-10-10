import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Suppliers from "./components/Suppliers";
import Header from "./components/Header";
import LoginForm from "./components/Login";
import Register from "./components/Register";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Device from "./components/Device";
import DeviceSearch from "./components/DeviceSearch";

function Home() {
  // Render all three components here
  return (
    <>
      <Suppliers />
      <Device />
      <DeviceSearch />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
