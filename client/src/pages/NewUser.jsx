import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/NewUser.css";
import PopUp from "../components/PopUp/PopUp.jsx";
const apiUrl = import.meta.env.VITE_API_URL;

function NewUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validatePassword(password)) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    fetch(`${apiUrl}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.error);
            });
          }
          return response.json();
        })
        .then((data) => {
          console.warn("User created successfully:", data);
          navigate("/Login");
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation: ", error);
          setErrorMessage(error.message);
        });
  };

  return (
      <>
        <div id="card1" className="card">
          <form onSubmit={handleSubmit}>
            <label>
              Nom d'utilisateur :
              <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Mot de passe :
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Confirmez le mot de passe :
              <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <button type="submit">Créer un compte</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>
        </div>
      </>
  );
}

export default NewUser;
