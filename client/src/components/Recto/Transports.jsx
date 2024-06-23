import {useState, useEffect, useContext} from "react";
import { UserConnectionContext } from "../../Contextes/ConnectionContext";
import "./css/Formulaires.css";

const apiUrl = import.meta.env.VITE_API_URL;

export const Transports = ({ onEmissionsChange }) => {
  const { isConnected, username } = useContext(UserConnectionContext);
  const [carDistance, setCarDistance] = useState(0);
  const [typecar, setTypecar] = useState("small");
  const [caroccupants, setCaroccupants] = useState(1);
  const [trainDistance, setTrainDistance] = useState(0);
  const [flightDistance, setFlightDistance] = useState(0);

  const [emissionFactors, setEmissionFactors] = useState({
    train: 0,
    flight: 0,
    car: {
      small: 0,
      medium: 0,
      big: 0,
    },
  });

  const calculateEmissions = () => {
    let transportEmissions =
        trainDistance * emissionFactors.train +
        flightDistance * emissionFactors.flight;

    let typecarFactor = emissionFactors.car[typecar];
    transportEmissions += (carDistance / caroccupants) * typecarFactor;

    return transportEmissions;
  };

  const updateUserData = () => {
    fetch(`${apiUrl}/api/userdata/${username}`)
        .then(response => response.json())
        .then(data => {
          setCarDistance(data.carDistance);
          setTypecar(data.typecar);
          setCaroccupants(data.caroccupants);
          setTrainDistance(data.trainDistance);
          setFlightDistance(data.flightDistance);
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
      body: JSON.stringify({ username, carDistance, typecar, caroccupants, trainDistance, flightDistance }),
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
        .then(data => setEmissionFactors(data.Transports))
        .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem("carDistance", carDistance);
    localStorage.setItem("typecar", typecar);
    localStorage.setItem("caroccupants", caroccupants);
    localStorage.setItem("trainDistance", trainDistance);
    localStorage.setItem("flightDistance", flightDistance);
  }, [carDistance, typecar, caroccupants, trainDistance, flightDistance]);

  useEffect(() => {
    let transportEmissions = calculateEmissions();
    onEmissionsChange(transportEmissions);
  }, [carDistance, typecar, caroccupants, trainDistance, flightDistance, emissionFactors]);

  useEffect(() => {
    fetch(`${apiUrl}/api/userdata/${username}`)
        .then(response => response.json())
        .then(data => {
          const userData = data[username];
          if (userData) {
            setCarDistance(userData.carDistance);
            setTypecar(userData.typecar);
            setCaroccupants(userData.caroccupants);
            setTrainDistance(userData.trainDistance);
            setFlightDistance(userData.flightDistance);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }, []);

  return (
      <>
        <form id="carbonCalculator1">
          <h2>Transports</h2>
          <button type="button" onClick={updateUserData}>Mise à jour</button>

          <label htmlFor="carDistance">
            Distance parcourue en voiture (km) :
          </label>
          <input
              type="number"
              id="carDistance"
              name="carDistance"
              required
              value={carDistance}
              onChange={(e) => setCarDistance(e.target.value)}
          />

          <label htmlFor="typecar">type de véhicule</label>
          <select
              id="typecar"
              name="typecar"
              required
              value={typecar}
              onChange={(e) => setTypecar(e.target.value)}
          >
            <option value="small">Petit</option>
            <option value="medium">Moyen</option>
            <option value="big">Grand</option>
          </select>

          <label htmlFor="caroccupants">Nombre de passagers</label>
          <input
              type="number"
              id="caroccupants"
              name="caroccupants"
              required
              value={caroccupants}
              onChange={(e) => setCaroccupants(e.target.value)}
          />

          <label htmlFor="trainDistance">
            Distance parcourue en train (km) :
          </label>
          <input
              type="number"
              id="trainDistance"
              name="trainDistance"
              required
              value={trainDistance}
              onChange={(e) => setTrainDistance(e.target.value)}
          />

          <label htmlFor="flightDistance">
            Distance parcourue en avion (km) :
          </label>
          <input
              type="number"
              id="flightDistance"
              name="flightDistance"
              required
              value={flightDistance}
              onChange={(e) => setFlightDistance(e.target.value)}
          />
          <p>Émissions de carbone : {calculateEmissions()} kg</p>
          <button type="button" onClick={saveUserData}>Post</button>
        </form>
      </>
  );
};

export default Transports;
