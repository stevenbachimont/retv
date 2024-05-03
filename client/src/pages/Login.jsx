import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import { UserConnectionContext } from "../Contextes/ConnectionContext";
import PopUp from "../components/PopUp/PopUp.jsx";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const { handleLogin } = useContext(UserConnectionContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation: ", error);
        setErrorMessage("Échec de l'authentification. Veuillez réessayer.");
      });
  };

  return (
      <>
        <div id="logincard" className="card">
          <h2 aria-label={username || "User Connection"}>
            {username || "User Connection"}
          </h2>
          <h3> WELCOME </h3>
          <div id="cards" className="cards">

            <form onSubmit={handleSubmit}>
              <label>
                <h5>Nom d'utilisateur :</h5>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label>
                <h5> Mot de passe :</h5>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button type="submit" className="submit">
                Se connecter
              </button>
              {errorMessage && <p className="error">{errorMessage}</p>}
              <h5>Vous n'avez pas de compte ?</h5>
              <button
                  type="button"
                  className="submit"
                  onClick={() => navigate("/new-user")}
              >
                Créer un compte
              </button>
            </form>
          </div>
        </div>
        <PopUp />
      </>
  );
}

export default Login;
