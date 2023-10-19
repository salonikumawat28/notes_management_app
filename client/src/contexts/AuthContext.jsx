import { useContext, useState, createContext } from "react";
import _ from "underscore";

const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const intialUser = localStorage.getItem("user");
    const [user, setUser] = useState(_.isEmpty(intialUser) ? {} : intialUser);

    const isLoggedIn = !_.isEmpty(user, "userId");

    return (
        <AuthContext.Provider value={{user, setUser, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}