import { createContext, useState } from "react";

export const TotalUserContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export function TotalUserProvider({ children }) {
    const [TotalUser, setTotalUser] = useState(0);



    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <TotalUserContext.Provider value={{ TotalUser, setTotalUser }}>
            {children}
        </TotalUserContext.Provider>
    );
}