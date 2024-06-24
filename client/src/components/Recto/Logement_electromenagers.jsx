import { useState, useEffect, useContext } from "react";
import { UserConnectionContext } from "../../Contextes/ConnectionContext";
import "./css/Formulaires.css";

const apiUrl = import.meta.env.VITE_API_URL;

export const Logement_electromenagers = ({ onEmissionsChange, onAppliancesElectronicsEmissionsChange }) => {
  const { isConnected, username } = useContext(UserConnectionContext);
  const [electricity, setElectricity] = useState( 0);
  const [gas, setGas] = useState(0);
  const [housingType, setHousingType] = useState( "apartment");
  const [housingSize, setHousingSize] = useState(0);
  const [occupants, setOccupants] = useState(1);
  const [appliances, setAppliances] = useState(0);
  const [electronics, setElectronics] = useState(0);

  const [emissionFactors, setEmissionFactors] = useState({
    electricity: 0,
    gas: 0,
    apartment: 0,
    house: 0,
    appliance: 0,
    electronic: 0,
  });

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
      body: JSON.stringify({ username, electricity, gas, housingType, housingSize, occupants, appliances, electronics }),
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
        .then(data => setEmissionFactors(data.Logement_electromenagers))
        .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    let housingEmissions = calculateHousingEmissions();
    onEmissionsChange(housingEmissions);
  }, [electricity, gas, housingType, housingSize, occupants, emissionFactors]);

  useEffect(() => {
    let appliancesElectronicsEmissions = calculateAppliancesElectronicsEmissions();
    onAppliancesElectronicsEmissionsChange(appliancesElectronicsEmissions);
  }, [appliances, electronics, emissionFactors]);

  const updateUserData2 = () => {
    fetch(`${apiUrl}/api/userdata/${username}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data) {
            setElectricity(data.electricity);
            setGas(data.gas);
            setHousingType(data.housingType);
            setHousingSize(data.housingSize);
            setOccupants(data.occupants);
            setAppliances(data.appliances);
            setElectronics(data.electronics);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  };

  return (
      <>
        <form id="carbonCalculator2">
          <h2>Logement & Electroménagers</h2>
          <button type="button" onClick={updateUserData2}>Mise à jour</button>

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
          <button type="button" onClick={saveUserData}>Post</button>
        </form>
      </>
  );
};

export default Logement_electromenagers;
