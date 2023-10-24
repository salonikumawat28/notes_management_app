import { useContext, useState, createContext, useEffect } from "react";
import apiClient from '../apiClient';
import utils from "../utils/utils";
import config from "../configs/config";

const NotesContext = createContext();

export function NotesContextProvider({ children }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    apiClient
      .get(config.BACKEND_URL + "api/v1/notes/")
      .then((response) => setNotes(utils.sort(response.data)))
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
