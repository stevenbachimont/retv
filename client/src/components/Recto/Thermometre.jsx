import React, { useState, useEffect } from "react";
import "./Thermometre.css";

export const Thermometre = () => {
  const units = {
    true: "Kg Co2",
  };

  const [config, setConfig] = useState({
    minTemp: 0,
    maxTemp: 10000,
    unit: true,
  });

  const [rangeValue, setRangeValue] = useState(2000);

  useEffect(() => {
    setTemperature();
  }, [rangeValue, config]);

  const setTemperature = () => {
    const temperature = document.getElementById("temperature");
    temperature.style.height =
      ((rangeValue - config.minTemp) / (config.maxTemp - config.minTemp)) *
        100 +
      "%";
    temperature.dataset.value = rangeValue + units[config.unit];
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (!isNaN(newValue)) {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [event.target.name]: newValue,
      }));
    }
  };

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  return (
    <>
      <div id="wrapper">
        <div id="termometer">
          <div
            id="temperature"
            style={{ height: "0" }}
            data-value="0Kg Co2"
          ></div>
          <div id="graduations"></div>
        </div>
        <div id="obj">
          <p>Objectif 2050</p>
          <p>2000Kg Co2</p>
        </div>

        <div id="playground">
          <div id="range">
            <input
              id="minTemp"
              name="minTemp"
              type="text"
              value={config.minTemp}
              onChange={handleInputChange}
            />
            <input
              type="range"
              min="0"
              max="10000"
              value={rangeValue}
              onChange={handleRangeChange}
            />
            <input
              id="maxTemp"
              name="maxTemp"
              type="text"
              value={config.maxTemp}
              onChange={handleInputChange}
            />
          </div>
          <p id="unit">Kg Co2</p>
        </div>
      </div>
    </>
  );
};

export default Thermometre;
