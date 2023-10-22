import React, { useState } from "react";
import DeviceSearchByBrand from "./DeviceSearchByBrand";
import "./DeviceSearch.css";

function DeviceSearch() {
  const [ean, setEan] = useState("");
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"
        }/devices/${ean}`
      );

      if (response.status === 200) {
        const data = await response.json();
        setDevices([data]);
        setError("");
      } else if (response.status === 404) {
        setDevices([]);
        setError("Device not found.");
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
    <div className="searchEanAndbrand">
      <div>
        <h2>Search by EAN</h2>

        <form className="eanSearchForm" onSubmit={handleSubmit}>
          <label>
            EAN:
            <input
              type="text"
              pattern="[0-9]*" // Specify the pattern to allow only numeric characters
              value={ean}
              onChange={(e) => {
                const input = e.target.value;
                setEan(input);
              }}
            />
          </label>
          <button className="buttonSearchByBrand" type="submit">
            Submit
          </button>
        </form>

        {error && <p>{error}</p>}

        <ul className="ulDeviceSearchByEan">
          {devices.length > 0 ? (
            devices.map((device) => (
              <li key={device.id}>
                {device.title} - {device.brand} - {device.ean}
              </li>
            ))
          ) : (
            <li className="liDeviceSearchByEan" />
          )}
        </ul>
      </div>
      <div>
        <DeviceSearchByBrand />
      </div>
    </div>
  );
}

export default DeviceSearch;
