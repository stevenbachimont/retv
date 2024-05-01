import { useState, useEffect } from "react";
import "./css/Formulaires.css";

export const Vetements = ({ onEmissionsChange }) => {
  const [largeClothingPurchase, setLargeClothingPurchase] = useState(
      localStorage.getItem("largeClothingPurchase") || 0
  );
  const [smallClothingPurchase, setSmallClothingPurchase] = useState(
      localStorage.getItem("smallClothingPurchase") || 0
  );
  const [madein, setMadein] = useState(
      localStorage.getItem("madein") || "france"
  );

  const [emissionFactors, setEmissionFactors] = useState({
    large: 0,
    small: 0,
    madein: {
      france: 1,
      autre: 1.2
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

  const calculateEmissions = () => {
    let clothingEmissions =
        largeClothingPurchase * emissionFactors.large +
        smallClothingPurchase * emissionFactors.small;

    let madeinFactor = emissionFactors.madein[madein];
    clothingEmissions *= madeinFactor;

    return clothingEmissions;
  };

  return (
    <>
      <form id="carbonCalculator4">
        <h2>Vêtements</h2>

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
      </form>
    </>
  );
};

export default Vetements;
