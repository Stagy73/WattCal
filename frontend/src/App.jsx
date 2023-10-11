import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Myspace from "./components/Myspace";

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
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Myspace" element={<Myspace />} />{" "}
        {/* Define "MySpace" component */}
      </Routes>
    </div>
  );
}

export default App;
