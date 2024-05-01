import { useState, useEffect } from "react";
import "./css/Formulaires.css";

export const Alimentation = ({ onEmissionsChange }) => {
  const [redMeatConsumption, setRedMeatConsumption] = useState(
      localStorage.getItem("redMeatConsumption") || 0
  );
  const [whiteMeatConsumption, setWhiteMeatConsumption] = useState(
      localStorage.getItem("whiteMeatConsumption") || 0
  );
  const [porkConsumption, setPorkConsumption] = useState(
      localStorage.getItem("porkConsumption") || 0
  );
  const [bulkFoodPurchase, setBulkFoodPurchase] = useState(
      localStorage.getItem("bulkFoodPurchase") || "none"
  );

  const [emissionFactors, setEmissionFactors] = useState({
    redMeat: 0,
    whiteMeat: 0,
    pork: 0,
    bulkFoodPurchase: {
      none: 1,
      partial: 0.9,
      total: 0.8
    }
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/recto-data')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setEmissionFactors(data.Alimentation))
        .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem("redMeatConsumption", redMeatConsumption);
    localStorage.setItem("whiteMeatConsumption", whiteMeatConsumption);
    localStorage.setItem("porkConsumption", porkConsumption);
    localStorage.setItem("bulkFoodPurchase", bulkFoodPurchase);
  }, [
    redMeatConsumption,
    whiteMeatConsumption,
    porkConsumption,
    bulkFoodPurchase,
  ]);

  useEffect(() => {
    let foodEmissions = calculateEmissions();
    onEmissionsChange(foodEmissions);
  }, [
    redMeatConsumption,
    whiteMeatConsumption,
    porkConsumption,
    bulkFoodPurchase,
    emissionFactors
  ]);

  const calculateEmissions = () => {
    let redMeatEmissions = redMeatConsumption * emissionFactors.redMeat;
    let whiteMeatEmissions = whiteMeatConsumption * emissionFactors.whiteMeat;
    let porkEmissions = porkConsumption * emissionFactors.pork;

    let foodEmissions = redMeatEmissions + whiteMeatEmissions + porkEmissions;

    // Ajout de l'impact de l'achat en vrac
    let bulkFoodPurchaseFactor = emissionFactors.bulkFoodPurchase[bulkFoodPurchase];
    foodEmissions *= bulkFoodPurchaseFactor;

    return foodEmissions;
  };

  return (
      <>
        <form id="carbonCalculator3">
          <h2>Alimentation</h2>

          <label htmlFor="redMeatConsumption">
            Consommation de viande rouge (kg) :
          </label>
          <input
              type="number"
              id="redMeatConsumption"
              name="redMeatConsumption"
              required
              value={redMeatConsumption}
              onChange={(e) => setRedMeatConsumption(e.target.value)}
          />

          <label htmlFor="whiteMeatConsumption">
            Consommation de viande blanche (kg) :
          </label>
          <input
              type="number"
              id="whiteMeatConsumption"
              name="whiteMeatConsumption"
              required
              value={whiteMeatConsumption}
              onChange={(e) => setWhiteMeatConsumption(e.target.value)}
          />

          <label htmlFor="porkConsumption">
            Consommation de viande de porc (kg) :
          </label>
          <input
              type="number"
              id="porkConsumption"
              name="porkConsumption"
              required
              value={porkConsumption}
              onChange={(e) => setPorkConsumption(e.target.value)}
          />

          <label htmlFor="bulkFoodPurchase">Achat en vrac :</label>
          <select
              id="bulkFoodPurchase"
              name="bulkFoodPurchase"
              required
              value={bulkFoodPurchase}
              onChange={(e) => setBulkFoodPurchase(e.target.value)}
          >
            <option value="none">Aucun</option>
            <option value="partial">Partiel</option>
            <option value="total">Total</option>
          </select>
          <p>Émissions de carbone : {calculateEmissions()} kg</p>
        </form>
      </>
  );
};

export default Alimentation;