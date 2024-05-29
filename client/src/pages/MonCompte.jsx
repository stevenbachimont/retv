import {useContext} from "react";
import {TotalUserContext} from "../Contextes/TotalUserContext.jsx";
import {UserConnectionContext} from "../Contextes/ConnectionContext";

import "./css/MonCompte.css";
import "../App.css";

function MonCompte() {
    const { Totaluser } = useContext(TotalUserContext);
    const { username } = useContext(UserConnectionContext);
    return (
        <>
            <div className="test">
                <h1>{username || "Non connecté"},</h1>
                <p>ta consommation annuelle</p>
                <p>est {Totaluser} Kg de CO2</p>
            </div>
        </>
    );
}

export default MonCompte;