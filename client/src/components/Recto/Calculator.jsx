import { useState, useEffect, useRef } from "react";
import { Transports } from "./Transports.jsx";
import { Logement_electromenagers } from "./Logement_electromenagers.jsx";
import { Alimentation } from "./Alimentation.jsx";
import { Vetements } from "./Vetements.jsx";
import Chart from "chart.js/auto";

export const Calculator = () => {
  const [transportEmissions, setTransportEmissions] = useState(0);
  const [housingEmissions, setHousingEmissions] = useState(0);
  const [appliancesElectronicsEmissions, setAppliancesElectronicsEmissions] =
    useState(0);
  const [foodEmissions, setFoodEmissions] = useState(0);
  const [clothingEmissions, setClothingEmissions] = useState(0);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const chartRef = useRef(null);

  const emissionFactors = {
    servicesCommuns: 1500,
  };

  useEffect(() => {
    let total =
      transportEmissions +
      housingEmissions +
      appliancesElectronicsEmissions +
      foodEmissions +
      clothingEmissions +
      emissionFactors.servicesCommuns;
    setTotalEmissions(total);
  }, [
    transportEmissions,
    housingEmissions,
    appliancesElectronicsEmissions,
    foodEmissions,
    clothingEmissions,
  ]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: [
            "Transport",
            "Logement & Electroménagers",
            "Alimentation",
            "Vêtements",
            "Services Communs",
          ],
          datasets: [
            {
              label: "Émissions de CO2 (kg)",
              data: [
                transportEmissions,
                housingEmissions + appliancesElectronicsEmissions,
                foodEmissions,
                clothingEmissions,
                emissionFactors.servicesCommuns,
              ],
              backgroundColor: [
                "rgba(141,13,56,0.67)",
                "rgba(95, 207, 163, 0.67)",
                "rgba(32, 137, 255, 0.67)",
                "rgba(255, 165, 0, 0.67)",
                "rgba(255, 0, 0, 0.67)",
              ],
              borderColor: "rgb(125,0,255)",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      return () => chart.destroy();
    }
  }, [
    transportEmissions,
    housingEmissions,
    appliancesElectronicsEmissions,
    foodEmissions,
    clothingEmissions,
  ]);

  return (
    <>
      <Transports onEmissionsChange={setTransportEmissions} />
      <Logement_electromenagers
        onEmissionsChange={setHousingEmissions}
        onAppliancesElectronicsEmissionsChange={
          setAppliancesElectronicsEmissions
        }
      />
      <Alimentation onEmissionsChange={setFoodEmissions} />
      <Vetements onEmissionsChange={setClothingEmissions} />

      <p>Total des émissions de carbone : {totalEmissions} kg</p>

      <canvas
        ref={chartRef}
        id="carbonChart"
        width="400"
        height="200"
        aria-label="Hello ARIA World"
        role="img"
      ></canvas>
    </>
  );
};

export default Calculator;
