import { useState, useEffect, useContext } from "react";
import { UserConnectionContext } from "../../Contextes/ConnectionContext";
import "./css/Formulaires.css";

const apiUrl = import.meta.env.VITE_API_URL;

export const Vetements = ({ onEmissionsChange }) => {
  const { isConnected, username } = useContext(UserConnectionContext);
  const [largeClothingPurchase, setLargeClothingPurchase] = useState(localStorage.getItem("largeClothingPurchase") || 0);
  const [smallClothingPurchase, setSmallClothingPurchase] = useState(localStorage.getItem("smallClothingPurchase") || 0);
  const [madein, setMadein] = useState(localStorage.getItem("madein") || "france");

  const [emissionFactors, setEmissionFactors] = useState({
    large: 0,
    small: 0,
    madein: {
      france: 1,
      autre: 1.2
    }
  });

  const calculateEmissions = () => {
    let clothingEmissions =
        largeClothingPurchase * emissionFactors.large +
        smallClothingPurchase * emissionFactors.small;

    let madeinFactor = emissionFactors.madein[madein];
    clothingEmissions *= madeinFactor;

    return clothingEmissions;
  };

  const updateUserData = () => {
    fetch(`${apiUrl}/api/userdata/${username}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setLargeClothingPurchase(data.largeClothingPurchase);
            setSmallClothingPurchase(data.smallClothingPurchase);
            setMadein(data.madein);
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
      body: JSON.stringify({ username, largeClothingPurchase, smallClothingPurchase, madein }),
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
        .then(data => setEmissionFactors(data.Vetements))
        .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem("largeClothingPurchase", largeClothingPurchase);
    localStorage.setItem("smallClothingPurchase", smallClothingPurchase);
    localStorage.setItem("madein", madein);
  }, [largeClothingPurchase, smallClothingPurchase, madein]);

  useEffect(() => {
    let clothingEmissions = calculateEmissions();
    onEmissionsChange(clothingEmissions);
  }, [largeClothingPurchase, smallClothingPurchase, madein, emissionFactors]);

  return (
      <>
        <form id="carbonCalculator4">
          <h2>Vêtements</h2>
          <button type="button" onClick={updateUserData}>Mise à jour</button>

          <label htmlFor="largeClothingPurchase">
            Achat de gros vêtements (kg) :
          </label>
          <input
              type="number"
              id="largeClothingPurchase"
              name="largeClothingPurchase"
              required
              value={largeClothingPurchase}
              onChange={(e) => setLargeClothingPurchase(e.target.value)}
          />

          <label htmlFor="smallClothingPurchase">
            Achat de petits vêtements (kg) :
          </label>
          <input
              type="number"
              id="smallClothingPurchase"
              name="smallClothingPurchase"
              required
              value={smallClothingPurchase}
              onChange={(e) => setSmallClothingPurchase(e.target.value)}
          />

          <label htmlFor="madein">Vêtements "made in":</label>
          <select
              id="madein"
              name="madein"
              required
              value={madein}
              onChange={(e) => setMadein(e.target.value)}
          >
            <option value="france">France</option>
            <option value="autre">Autre</option>
          </select>

          <p>Émissions de carbone : {calculateEmissions()} kg</p>
          <button type="button" onClick={saveUserData}>Post</button>
        </form>
      </>
  );
};

export default Vetements;
