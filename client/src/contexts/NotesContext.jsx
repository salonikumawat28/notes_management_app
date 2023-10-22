import { useContext, useState, createContext, useEffect } from "react";
import apiClient from '../apiClient';

const NotesContext = createContext();

export function NotesContextProvider({ children }) {
  const [notes, setNotes] = useState({});

  useEffect(() => {
    apiClient
      .get("http://localhost:9000/notes/")
      .then((response) => setNotes(response.data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesContext() {
  return useContext(NotesContext);
}
