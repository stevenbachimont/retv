import { createContext, useState } from "react";

export const PopContext = createContext();

// eslint-disable-next-line react/prop-types
export function PopProvider({ children }) {
    const [pop, setPop] = useState(false);
    const [message, setMessage] = useState("");

    const showPop = (msg) => {
        setMessage(msg);
        setPop(true);
    }

    const hidePop = () => {
        setPop(false);
    }

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <PopContext.Provider value={{ pop, showPop, hidePop }}>
            {children}
        </PopContext.Provider>
    );
}