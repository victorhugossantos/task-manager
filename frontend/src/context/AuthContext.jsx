import React, { useState , createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ( {children }) => {
    const [user, setUser ] = useState(null);

    const login = (userData, token ) => {
        localStorage.setItem('token', token);
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);