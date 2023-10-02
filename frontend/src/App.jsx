import { ToastContainer } from "react-toastify";
import Suppliers from "./components/Suppliers";
import Header from "./components/Header";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Device from "./components/Device";
import DeviceSearch from "./components/DeviceSearch";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Suppliers />
      <Device />
      <DeviceSearch />
    </div>
  );
}

export default App;
