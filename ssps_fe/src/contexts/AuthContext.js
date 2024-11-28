import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider( { children } ) {
    const [auth, setAuth] = useState({}); // NOTE: deprecated -> use SessionStorage
    const [userDetails, setUserDetails] = useState({});

    function getUser() {
        return JSON.parse(userDetails);
    }

    function login(userData) {
        setAuth({user: userData});
        sessionStorage.setItem('user', JSON.stringify(userData));
    }

    function logout() {
        setAuth({user: null});
        sessionStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, login, logout, getUser, userDetails, setUserDetails}}>
            {children}
        </AuthContext.Provider>
    )
}