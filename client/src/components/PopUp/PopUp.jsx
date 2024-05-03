import { useContext } from 'react';
import { PopContext } from '../../Contextes/PopContext';
import './css/PopUp.css';

function Popup() {
    const { pop, message, hidePop } = useContext(PopContext);

    if (!pop) {
        return null;
    }

    return (
        <div className="popup bottom-right">
            <div className="popup-inner">
                <h2>{message}</h2>
                <button onClick={hidePop}>Fermer</button>
            </div>
        </div>
    );
}

export default Popup;