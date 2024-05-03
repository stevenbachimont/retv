import { useContext } from 'react';
import { PopContext } from '../Contextes/Pop';
import { UserConnectionContext } from '../Contextes/ConnectionContext';

function ConfirmationPopup() {
    const { pop, showPop, hidePop } = useContext(PopContext);
    const { username } = useContext(UserConnectionContext);

    // Afficher le popup de confirmation lorsque l'utilisateur se connecte
    useEffect(() => {
        if (username) {
            showPop(`Compte créé avec succès. Bienvenue, ${username}!`);
        }
    }, [username, showPop]);

    if (!pop) {
        return null;
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>{message}</h2>
                <button onClick={hidePop}>Fermer</button>
            </div>
        </div>
    );
}

export default ConfirmationPopup;