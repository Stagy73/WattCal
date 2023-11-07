import React, { useState, useEffect } from "react";
import "./ConsumptionCalculator.css";

function ConsumptionCalculator() {
  const [watt, setWatt] = useState("");
  const [time, setTime] = useState("");
  const [days, setDays] = useState(""); // Add a state for the number of days
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
  const [prices, setPrices] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(""); // Store the selected price

  // Fetch prices from the backend
  async function fetchPrices() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:6001"}/prices`
      );

      if (response.status === 200) {
        const data = await response.json();
        if (data.length > 0) {
          setPrices(data);
          // If no price is selected, set the selected price to the first one
          if (!selectedPrice && data[0]) {
            setSelectedPrice(data[0].value);
          }
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

  const calculateConsumption = () => {
    if (watt && time && days) {
      const wattage = parseFloat(watt);
      const hoursPerDay = parseFloat(time);
      const numberofDays = parseFloat(days);
      const kWattage = wattage / 1000;
      const consumptionPerHour = numberofDays * hoursPerDay * kWattage;
      const consumptionPerDay = numberofDays * hoursPerDay * kWattage;
      const consumptionPerMonth = consumptionPerDay * 30; // Assuming 30 days in a month
      const consumptionPerYear = consumptionPerDay * 365; // Assuming 365 days in a year

      setConsumption({
        perHour: consumptionPerHour.toFixed(2), // Display with 2 decimal places
        perDay: consumptionPerDay.toFixed(2), // Display with 2 decimal places
        perMonth: consumptionPerMonth.toFixed(2),
        perYear: consumptionPerYear.toFixed(2),
      });

      if (selectedPrice) {
        const pricePerKWh = parseFloat(selectedPrice);
        const costPerHour = consumptionPerHour * pricePerKWh;
        const costPerDay = consumptionPerDay * pricePerKWh;
        const costPerMonth = consumptionPerMonth * pricePerKWh;
        const costPerYear = consumptionPerYear * pricePerKWh;

        setCost({
          perHour: costPerHour.toFixed(2),
          perDay: costPerDay.toFixed(2),
          perMonth: costPerMonth.toFixed(2),
          perYear: costPerYear.toFixed(2),
        });
      } else {
        setCost({
          perHour: 0,
          perDay: 0,
          perMonth: 0,
          perYear: 0,
        });
      }
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

  const handleWattChange = (e) => {
    setWatt(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  useEffect(() => {
    calculateConsumption();
  }, [watt, time, selectedPrice, days]);

  return (
    <div>
      <div className="calculatorDiv">
        <h2> Calculator</h2>
        <div>
          <label htmlFor="watt">
            <input
              type="number"
              value={watt}
              onChange={handleWattChange}
              placeholder="Watt"
            />
          </label>
        </div>
        <div>
          <label htmlFor="time">
            <input
              type="number"
              value={time}
              onChange={handleTimeChange}
              placeholder="Number of Hours"
            />
          </label>
        </div>
        <div>
          <label htmlFor="days">
            <input
              type="number"
              value={days}
              onChange={handleDaysChange}
              placeholder="Number of Days"
            />
          </label>
        </div>
        <div className="calculatorDiv">
          <div>
            <label>
              Price (per kWh):
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                {prices.map((priceItem) => (
                  <option key={priceItem.id} value={priceItem.value}>
                    {priceItem.value}
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
