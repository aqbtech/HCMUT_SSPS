import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const [userDetails, setUserDetails] = useState(null);

 

    const value = {
        navigate, 
        userDetails, 
        setUserDetails, 
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
