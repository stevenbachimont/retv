import { useState, useEffect, useContext } from "react";
import { UserConnectionContext } from "../../Contextes/ConnectionContext";
import "./css/Formulaires.css";

const apiUrl = import.meta.env.VITE_API_URL;

export const Alimentation = ({ onEmissionsChange }) => {
  const { isConnected, username } = useContext(UserConnectionContext);
  const [redMeatConsumption, setRedMeatConsumption] = useState(localStorage.getItem("redMeatConsumption") || 0);
  const [whiteMeatConsumption, setWhiteMeatConsumption] = useState(localStorage.getItem("whiteMeatConsumption") || 0);
  const [porkConsumption, setPorkConsumption] = useState(localStorage.getItem("porkConsumption") || 0);
  const [bulkFoodPurchase, setBulkFoodPurchase] = useState(localStorage.getItem("bulkFoodPurchase") || "none");

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

  const updateUserData = () => {
    fetch(`${apiUrl}/api/userdata/${username}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setRedMeatConsumption(data.redMeatConsumption);
            setWhiteMeatConsumption(data.whiteMeatConsumption);
            setPorkConsumption(data.porkConsumption);
            setBulkFoodPurchase(data.bulkFoodPurchase);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  };

  const saveUserData = () => {
    if (!isConnected) {
      console.log('User is not connected. Data will not be posted.');
      return;
    }

    if (!username) {
      console.log('Username is not defined. Data will not be posted.');
      return;
    }

    fetch(`${apiUrl}/api/userdata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, redMeatConsumption, whiteMeatConsumption, porkConsumption, bulkFoodPurchase }),
    })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => {
          console.error('Error:', error);
        });
  };

  useEffect(() => {
    fetch(`${apiUrl}/api/recto-data`)
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

  return (
      <>
        <form id="carbonCalculator3">
          <h2>Alimentation</h2>
          <button type="button" onClick={updateUserData}>Mise à jour</button>

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
          <button type="button" onClick={saveUserData}>Post</button>
        </form>
      </>
  );
};


