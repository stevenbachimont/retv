import { useState, useEffect } from "react";

const Logement_electromenagers = ({ onEmissionsChange, onAppliancesElectronicsEmissionsChange }) => {
  const [electricity, setElectricity] = useState(localStorage.getItem("electricity") || 0);
  const [gas, setGas] = useState(localStorage.getItem("gas") || 0);
  const [housingType, setHousingType] = useState(localStorage.getItem("housingType") || "apartment");
  const [housingSize, setHousingSize] = useState(localStorage.getItem("housingSize") || 0);
  const [occupants, setOccupants] = useState(localStorage.getItem("occupants") || 1);
  const [appliances, setAppliances] = useState(localStorage.getItem("appliances") || 0);
  const [electronics, setElectronics] = useState(localStorage.getItem("electronics") || 0);

  const [emissionFactors, setEmissionFactors] = useState({
    electricity: 0,
    gas: 0,
    apartment: 0,
    house: 0,
    appliance: 0,
    electronic: 0,
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/recto-data')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setEmissionFactors(data.Logement_electromenagers))
        .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem("electricity", electricity);
    localStorage.setItem("gas", gas);
    localStorage.setItem("housingType", housingType);
    localStorage.setItem("housingSize", housingSize);
    localStorage.setItem("occupants", occupants);
    localStorage.setItem("appliances", appliances);
    localStorage.setItem("electronics", electronics);
  }, [
    electricity,
    gas,
    housingType,
    housingSize,
    occupants,
    appliances,
    electronics,
  ]);

  useEffect(() => {
    let housingEmissions = calculateHousingEmissions();
    onEmissionsChange(housingEmissions);
  }, [electricity, gas, housingType, housingSize, occupants, emissionFactors]);

  useEffect(() => {
    let appliancesElectronicsEmissions = calculateAppliancesElectronicsEmissions();
    onAppliancesElectronicsEmissionsChange(appliancesElectronicsEmissions);
  }, [appliances, electronics, emissionFactors]);

  const calculateHousingEmissions = () => {
    let housingEmissions =
        (electricity * emissionFactors.electricity) / occupants +
        (gas * emissionFactors.gas) / occupants +
        (emissionFactors[housingType] * occupants * housingSize) / occupants;

    return housingEmissions;
  };

  const calculateAppliancesElectronicsEmissions = () => {
    return (
        (appliances * emissionFactors.appliance) / occupants +
        electronics * emissionFactors.electronic
    );
  };

  return (
    <>
      <form id="carbonCalculator2">
        <h2>Logement & Electroménagers</h2>

        <label htmlFor="electricity">Consommation d'électricité (kWh) :</label>
        <input
          type="number"
          id="electricity"
          name="electricity"
          required
          value={electricity}
          onChange={(e) => setElectricity(e.target.value)}
        />

        <label htmlFor="gas">Consommation de gaz (kWh) :</label>
        <input
          type="number"
          id="gas"
          name="gas"
          required
          value={gas}
          onChange={(e) => setGas(e.target.value)}
        />

        <label htmlFor="housingType">Type de logement :</label>
        <select
          id="housingType"
          name="housingType"
          required
          value={housingType}
          onChange={(e) => setHousingType(e.target.value)}
        >
          <option value="apartment">Appartement</option>
          <option value="house">Maison</option>
        </select>

        <label htmlFor="housingSize">Taille du logement (m²) :</label>
        <input
          type="number"
          id="housingSize"
          name="housingSize"
          required
          value={housingSize}
          onChange={(e) => setHousingSize(e.target.value)}
        />

        <label htmlFor="occupants">Nombre d'occupants :</label>
        <input
          type="number"
          id="occupants"
          name="occupants"
          required
          value={occupants}
          onChange={(e) => setOccupants(e.target.value)}
        />

        <label htmlFor="appliances">Nombre d'appareils :</label>
        <input
          type="number"
          id="appliances"
          name="appliances"
          required
          value={appliances}
          onChange={(e) => setAppliances(e.target.value)}
        />

        <label htmlFor="electronics">Nombre d'électroniques :</label>
        <input
          type="number"
          id="electronics"
          name="electronics"
          required
          value={electronics}
          onChange={(e) => setElectronics(e.target.value)}
        />

        <p>
          Émissions de carbone :{" "}
          {calculateHousingEmissions() +
            calculateAppliancesElectronicsEmissions()}{" "}
          kg
        </p>
      </form>
    </>
  );
};

export default Logement_electromenagers;
