import React, { useState, useEffect } from "react";
import "./ConsumptionCalculator.css";

function ConsumptionCalculator() {
  const [watt, setWatt] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [consumption, setConsumption] = useState({
    perHour: 0,
    perDay: 0,
    perMonth: 0,
    perYear: 0,
  });
  const [cost, setCost] = useState({
    perHour: 0,
    perDay: 0,
    perMonth: 0,
    perYear: 0,
  });
  const [currency, setCurrency] = useState("USD"); // Default currency is USD
  const [prices, setPrices] = useState([]); // Initialize prices as an empty array

  // Fetch prices from the backend
  async function fetchPrices() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"}/prices`
      );

      if (response.status === 200) {
        const data = await response.json();
        if (data.length > 0) {
          setPrice(data[0].price); // Set the initial price to the first item in the prices array
          setPrices(data); // Set the prices array with fetched data
        }
      } else {
        console.error("Error fetching prices");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleWattChange = (e) => {
    setWatt(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  useEffect(() => {
    const calculateConsumption = () => {
      if (watt && time) {
        const consumptionPerHour =
          (parseInt(watt, 10) * parseInt(time, 10)) / 1000;
        const consumptionPerDay = consumptionPerHour * 24; // Hours in a day
        const consumptionPerMonth = consumptionPerDay * 30; // Assuming 30 days in a month
        const consumptionPerYear = consumptionPerDay * 365; // Assuming 365 days in a year
        const costPerHour = consumptionPerHour * (parseFloat(price) / 1000); // Price is per kWh
        const costPerDay = consumptionPerDay * (parseFloat(price) / 1000);
        const costPerMonth = consumptionPerMonth * (parseFloat(price) / 1000);
        const costPerYear = consumptionPerYear * (parseFloat(price) / 1000);

        setConsumption({
          perHour: consumptionPerHour.toFixed(2),
          perDay: consumptionPerDay.toFixed(2),
          perMonth: consumptionPerMonth.toFixed(2),
          perYear: consumptionPerYear.toFixed(2),
        });

        setCost({
          perHour: costPerHour.toFixed(2),
          perDay: costPerDay.toFixed(2),
          perMonth: costPerMonth.toFixed(2),
          perYear: costPerYear.toFixed(2),
        });
      } else {
        setConsumption({
          perHour: 0,
          perDay: 0,
          perMonth: 0,
          perYear: 0,
        });

        setCost({
          perHour: 0,
          perDay: 0,
          perMonth: 0,
          perYear: 0,
        });
      }
    };

    calculateConsumption();
  }, [watt, time, price]);

  return (
    <div>
      <h2>Consumption Calculator</h2>
      <div className="calculatorDiv">
        <div>
          <label>
            Watt:
            <input
              type="number"
              value={watt}
              onChange={handleWattChange}
              placeholder="Watt"
            />
          </label>
        </div>
        <div>
          <label>
            Number of Hours:
            <input
              type="number"
              value={time}
              onChange={handleTimeChange}
              placeholder="Number of Hours"
            />
          </label>
        </div>
        <div className="calculatorDiv">
          <div>
            <label>
              Price (per kWh):
              <select value={price} onChange={(e) => setPrice(e.target.value)}>
                {/* Sort prices in ascending order before mapping */}
                {prices
                  .slice() // Create a copy of the prices array to avoid mutating the original
                  .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                  .map((priceItem) => (
                    <option key={priceItem.id} value={priceItem.price}>
                      {priceItem.price}
                    </option>
                  ))}
              </select>
            </label>
          </div>
        </div>{" "}
        <div className="divResult">
          <div className="divResultinside">
            <label>
              Currency:
              <select value={currency} onChange={handleCurrencyChange}>
                <option value="USD">USD</option>
                <option value="Euro">Euro</option>
                <option value="GBP">GBP</option>
              </select>
            </label>
          </div>
          <div className="divResultinside">
            <h3>Consumption:</h3>
            <p>Per Hour: {consumption.perHour} kWh</p>
            <p>Per Day: {consumption.perDay} kWh</p>
            <p>Per Month: {consumption.perMonth} kWh</p>
            <p>Per Year: {consumption.perYear} kWh</p>
          </div>
          <div className="divResultinside">
            <h3>Cost:</h3>
            <p>
              Per Hour: {cost.perHour} {currency}
            </p>
            <p>
              Per Day: {cost.perDay} {currency}
            </p>
            <p>
              Per Month: {cost.perMonth} {currency}
            </p>
            <p>
              Per Year: {cost.perYear} {currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsumptionCalculator;
