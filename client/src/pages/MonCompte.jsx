import "./css/MonCompte.css";
import "../App.css";
import {useContext} from "react";
import {UserConnectionContext} from "../Contextes/ConnectionContext";

function Head() {
    const { isConnected, username } = useContext(UserConnectionContext);
    // Rest of your Head function code
}

function MonCompte() {
    const { username } = useContext(UserConnectionContext);
    return (
        <>
            <div className="test">
                <h1>{username}</h1>
            </div>
        </>
    );
}

export default MonCompte;