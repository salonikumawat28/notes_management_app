import { useEffect } from "react";
import { useAuthContext } from "./contexts/AuthContext";
import AuthHomePage from "./pages/AuthHomePage";
import PublicHomePage from "./pages/PublicHomePage";
import "./css/NotesManagementApp.css";
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function NotesMangementApp() {
  const { authToken } = useAuthContext();

  return (
    <div className="Box">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              authToken ? (
                <AuthHomePage />
              ) : (
                <PublicHomePage showLogin={true} />
              )
            }
          />
          <Route
            path="/login"
            element={
              authToken ? (
                <Navigate to="/" />
              ) : (
                <PublicHomePage showLogin={true} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              authToken ? (
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
