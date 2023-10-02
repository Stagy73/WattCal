import React, { useState, useEffect } from "react";

function DeviceSearch() {
  const [ean, setEan] = useState("");
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let debounceTimer;

    // Create a function to fetch devices based on the EAN
    const fetchDevicesByEAN = async (ean) => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"
          }/devices/ean/${ean}`
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

    // Function to browse devices by EAN
    const browseDevicesByEAN = (inputEAN) => {
      clearTimeout(debounceTimer);

      // Set a delay of 500 milliseconds before fetching
      debounceTimer = setTimeout(() => {
        // Check if ean is a valid number
        if (/^\d+$/.test(inputEAN)) {
          fetchDevicesByEAN(inputEAN);
        } else {
          setDevices([]);
        }
      }, 500); // Adjust the delay as needed
    };

    // Call the browseDevicesByEAN function when ean changes
    browseDevicesByEAN(ean);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(debounceTimer);
  }, [ean]);

  return (
    <div>
      <h2>Search Devices by EAN</h2>
      <form>
        <label>
          Device EAN:
          <input
            type="Number"
            value={ean}
            onChange={(e) => {
              const input = e.target.value;
              setEan(input);
            }}
          />
        </label>
      </form>
      {error && <p>{error}</p>}
      <h3>Matching Devices:</h3>
      <ul>
        {devices.length > 0 ? (
          devices.map((device) => (
            <li key={device.id}>
              {device.title} - {device.brand} - {device.ean}
            </li>
          ))
        ) : (
          <li>No matching devices found.</li>
        )}
      </ul>
    </div>
  );
}

export default DeviceSearch;
