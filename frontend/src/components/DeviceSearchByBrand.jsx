import React, { useState, useEffect } from "react";
import "./DeviceSearchByBrand.css";

function DeviceSearchByBrand() {
  const [brand, setBrand] = useState("");
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"
        }/devices/brand/${brand}`
      );

      if (response.status === 200) {
        const [devicesData] = await response.json(); // Destructure the first array element
        setDevices(devicesData); // Set the devices data
        setError("");
      } else if (response.status === 404) {
        setDevices([]);
        setError("No devices found for this brand.");
      } else {
        const data = await response.json();
        setError(data.message || "Error fetching devices.");
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching devices.");
    }
  };

  return (
    <div>
      <h2>Search by Brand</h2>
      <form className="formSearchByBrand" onSubmit={handleSubmit}>
        <label>
          Brand:
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>
        <button className="buttonSearchByBrand " type="submit">
          Submit
        </button>
      </form>
      {error && <p>{error}</p>}

      <ul className="ulDeviceSearchByBrand">
        {devices.map((device, index) => (
          <li className="liSearchByBrand" key={index}>
            <p className="resultSearchBrand">Brand: {device.title}</p>
            <p className="resultSearchBrand">
              Category: {device.category_name}
            </p>
            <p className="resultSearchBrand">Watt: {device.watt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeviceSearchByBrand;
