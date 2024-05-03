import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserConnectionContext } from "../Contextes/ConnectionContext";
import "./css/Head.css";


function Head() {
    const { isConnected, username } = useContext(UserConnectionContext);

    return (
        <nav>
            <NavLink className="headLien" activeClassName="active" to="/">
                <h1 className="headTitle">R&V</h1>
            </NavLink>
            <ul className="headList">
                <NavLink className="headLien" activeClassName="active" to="/Recto">
                    Recto
                </NavLink>
                <NavLink className="headLien" activeClassName="active" to="/Verso">
                    Verso
                </NavLink>
                <NavLink className="headLien" activeClassName="active" to="/Test">
                    Help
                </NavLink>
                {isConnected ? (
                    <NavLink className="headLien" activeClassName="active" to="/mon-compte">
                        {username}
                    </NavLink>
                ) : (
                    <NavLink className="headLien" activeClassName="active" to="/Login">
                        Login
                    </NavLink>
                )}
            </ul>
        </nav>
    );
}

export default Head;