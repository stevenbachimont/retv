import { createContext, useState } from "react";

export const TotalUserContext = createContext();

// eslint-disable-next-line react/prop-types
export function TotalUserProvider({ children }) {
    const [totaluser, setTotalUser] = useState(0);



    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <TotalUserContext.Provider value={{ totaluser, setTotalUser }}>
            {children}
        </TotalUserContext.Provider>
    );
}