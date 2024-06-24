import { useContext } from "react";
import { UserConnectionContext } from "../../Contextes/ConnectionContext";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const { handleLogout } = useContext(UserConnectionContext);
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("Logout button clicked");
        handleLogout();
        navigate("/login");
    };
    return (
        <button onClick={handleClick}>
            Déconnexion
        </button>
    );
}

export default LogoutButton;
