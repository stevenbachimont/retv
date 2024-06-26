import { createContext, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const UserConnectionContext = createContext();

// eslint-disable-next-line react/prop-types
export function UserConnectionProvider({ children }) {
    const [isConnected, setIsConnected] = useState(false);
    const [username, setUsername] = useState(null);

    const handleLogin = (username, password) =>
        fetch(`${apiUrl}/api/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    setIsConnected(true);
                    setUsername(username);
                } else {
                    throw new Error("Authentication failed");
                }
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation: ", error);
                throw error;
            });

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsConnected(false);
        setUsername(null);
    };



    return (
        <UserConnectionContext.Provider value={{ isConnected, handleLogin, handleLogout, username }}>
            {children}
        </UserConnectionContext.Provider>
    );
}
