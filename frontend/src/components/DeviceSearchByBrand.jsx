import React, { useState, useEffect } from "react";
import "./DeviceSearchByBrand.css";

function DeviceSearchByBrand() {
  const [selectedBrand, setSelectedBrand] = useState(""); // Store the selected brand
  const [brands, setBrands] = useState([]); // Store the list of brands
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the list of brands when the component mounts
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"
        }/devices/:brand`
      );

      if (response.status === 200) {
        const brandsData = await response.json();
        setBrands(brandsData); // Set the list of brands
      } else {
        setError("Error fetching brands.");
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching brands.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBrand) {
      setError("Please select a brand.");
      return;
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"
        }/devices/${selectedBrand}` // Updated the URL to match the new route format
      );

      if (response.status === 200) {
        const devicesData = await response.json();
        setDevices(devicesData);
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
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Select a brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>
        <button className="buttonSearchByBrand " type="submit">
          Submit
        </button>
      </form>
      {error && <p>{error}</p>}

      <div className="cardsContainer">
        {devices.map((device, index) => (
          <div className="card" key={index}>
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
