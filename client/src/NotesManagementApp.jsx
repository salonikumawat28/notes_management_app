import { useEffect } from "react";
import { useAuthContext } from "./contexts/AuthContext";
import AuthHomePage from "./pages/AuthHomePage";
import PublicHomePage from "./pages/PublicHomePage";
import "./css/NotesManagementApp.css";
import _ from "underscore";

function NotesMangementApp() {
  const { isLoggedIn, setUser } = useAuthContext();

  // To handle cross-tab login/logout changes.
  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key === "user") {
        setUser(!!localStorage.getItem("user"));
      }
    }

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="Box">
      {isLoggedIn ? <AuthHomePage /> : <PublicHomePage />}
    </div>
  );
}

export default NotesMangementApp;
