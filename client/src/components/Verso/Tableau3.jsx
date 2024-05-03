import { useState } from "react";
import "./css/Tableau.css";

export const Tableau = () => {
    const [data, setData] = useState([{ objet: "", consommation: "" }]);

    const handleChange = (i, event) => {
        const values = [...data];
        values[i][event.target.name] = event.target.value;
        setData(values);
    };

    const handleAddRow = () => {
        setData([...data, { objet: "", consommation: "" }]);
    };

    return (
        <>
            <div>
                <span>Objet</span>
                <span>Consommation</span>
            </div>
            {data.map((item, idx) => (
                <div key={idx}>
                    <input
                        type="text"
                        name="objet"
                        value={item.objet}
                        onChange={event => handleChange(idx, event)}
                    />
                    <input
                        type="text"
                        name="consommation"
                        value={item.consommation}
                        onChange={event => handleChange(idx, event)}
                    />
                </div>
            ))}
            <button onClick={handleAddRow}>Ajouter une ligne</button>
        </>
    );
};

export default Tableau;