import { useContext, useState, createContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const intialAuthToken = localStorage.getItem("authToken") || "";
  const [authToken, setAuthToken] = useState(intialAuthToken);

  // Update local storage when authToken changes
  useEffect(() => {
    if (authToken) {
        localStorage.setItem("authToken", authToken);
    } else {
        localStorage.removeItem("authToken");
    }
  }, [authToken]);

  // Add a storage event listener to listen to storage changes of same origin from different tab or window.
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "authToken") {
        setAuthToken(event.newValue || ""); // Update authToken in response to storage change
      }
    };

    // Attach the event listener
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
