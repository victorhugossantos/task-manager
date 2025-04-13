import React, { useState , createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser ] = useState(null);
    const navigate = useNavigate();

    const login = (userData, token ) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', token);
        navigate('/dashboard');
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);