import { useContext, useState, createContext } from "react";

const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const isLoggedInInitialState = localStorage.getItem("isLoggedIn");
    const [isLoggedIn, setIsLoggedIn] = useState(!!isLoggedInInitialState);
    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}