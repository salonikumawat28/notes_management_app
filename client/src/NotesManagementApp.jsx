import { useEffect } from "react";
import { useAuthContext } from "./contexts/AuthContext";
import AuthHomePage from "./pages/AuthHomePage";
import PublicHomePage from "./pages/PublicHomePage";
import "./css/NotesManagementApp.css";
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <AuthHomePage />
              ) : (
                <PublicHomePage showLogin={true} />
              )
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <PublicHomePage showLogin={true} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <PublicHomePage showLogin={false} />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default NotesMangementApp;
