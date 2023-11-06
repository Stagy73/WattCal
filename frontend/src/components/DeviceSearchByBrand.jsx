import React, { useState } from "react";
import "./DeviceSearchByBrand.css";

function DeviceSearchByBrand() {
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"}/devices`
      );

      if (response.status === 200) {
        const devicesData = await response.json();
        setDevices(devicesData);
        setError("");
      } else {
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError("");
    }
  };

  return (
    <div>
      <h2>Search by Brand</h2>
      <form className="formSearchByBrand" onSubmit={handleSubmit}>
        <button className="buttonSearchByBrand" type="submit">
          Show All Devices
        </button>
      </form>
      {error && <p>{error}</p>}

      <div className="cardsContainer">
        {devices.map((device) => (
          <div className="card" key={device.id}>
            <img src={device.picture_url} alt={device.title} />
            <h3 className="cardTitle">{device.title}</h3>
            <p className="cardCategory">Category: {device.category_name}</p>
            <p className="cardWatt">Watt: {device.watt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeviceSearchByBrand;
