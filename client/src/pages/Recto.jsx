import "./css/Recto.css";
import "../App.css";
import { useContext } from "react";
import {TotalUserContext} from "../Contextes/TotalUserContext.jsx";
import { useState, useEffect, useRef } from "react";
import { Transports } from "../components/Recto/Transports";
import { Logement_electromenagers } from '../components/Recto/Logement_electromenagers';
import { Alimentation } from "../components/Recto/Alimentation";
import { Vetements } from "../components/Recto/Vetements";
import Chart from "chart.js/auto";

function Recto() {
  const { setTotalUser } = useContext(TotalUserContext);
  const [transportEmissions, setTransportEmissions] = useState(0);
  const [housingEmissions, setHousingEmissions] = useState(0);
  const [appliancesElectronicsEmissions, setAppliancesElectronicsEmissions] =
      useState(0);
  const [foodEmissions, setFoodEmissions] = useState(0);
  const [clothingEmissions, setClothingEmissions] = useState(0);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const chartRef = useRef(null);
  const [currentForm, setCurrentForm] = useState(0);

  const emissionFactors = {
    servicesCommuns: 1500,
  };

  const nextForm = () => {
    if (currentForm < 3) {
      setCurrentForm(currentForm + 1);
    }
  };

  const prevForm = () => {
    if (currentForm > 0) {
      setCurrentForm(currentForm - 1);
    }
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
    setTotalUser(total);
  }, [
    transportEmissions,
    housingEmissions,
    appliancesElectronicsEmissions,
    foodEmissions,
    clothingEmissions,
  ]);

  useEffect(() => {
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
            borderColor: "rgb(0,0,0)",
            borderWidth: 1,
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
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const chart = Chart.getChart(chartRef.current);
      chart.data.datasets[0].data = [
        transportEmissions,
        housingEmissions + appliancesElectronicsEmissions,
        foodEmissions,
        clothingEmissions,
        emissionFactors.servicesCommuns,
      ];
      chart.update();
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
      <div className="main">
        <div className="forms">
          <div className="nextButton">
            <button onClick={prevForm}>Précédent</button>
            <button onClick={nextForm}>Suivant</button>
          </div>
          {currentForm === 0 && (
            <Transports onEmissionsChange={setTransportEmissions} />
          )}
          {currentForm === 1 && (
            <Logement_electromenagers
              onEmissionsChange={setHousingEmissions}
              onAppliancesElectronicsEmissionsChange={
                setAppliancesElectronicsEmissions
              }
            />
          )}
          {currentForm === 2 && (
            <Alimentation onEmissionsChange={setFoodEmissions} />
          )}
          {currentForm === 3 && (
            <Vetements onEmissionsChange={setClothingEmissions} />
          )}
        </div>
        <div className="card1">
          <p>Total des émissions de carbone : {totalEmissions} kg</p>
          <canvas
            ref={chartRef}
            id="carbonChart"
            width="400"
            height="200"
            aria-label="Hello ARIA World"
            role="img"
          ></canvas>
        </div>
      </div>
    </>
  );
}

export default Recto;
