import {useContext} from "react";
import {TotalUserContext} from "../Contextes/TotalUserContext.jsx";
import {UserConnectionContext} from "../Contextes/ConnectionContext";
import LogoutButton from "../components/Logout/LogoutButton"; // Importez le composant LogoutButton

import "./css/MonCompte.css";
import "../App.css";

function MonCompte() {
    const { TotalUser } = useContext(TotalUserContext);
    const { username } = useContext(UserConnectionContext);

    return (
        <>
            <div className="test">
                <h1>{username || "Non connecté"},</h1>
                <p>ta consommation annuelle</p>
                <p>est {TotalUser} Kg de CO2</p>
                <LogoutButton/>
            </div>

        </>
    );
}

export default MonCompte;
