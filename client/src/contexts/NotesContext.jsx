import { useContext, useState, createContext, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";

const NotesContext = createContext();

export function NotesContextProvider({ children }) {
  const [notes, setNotes] = useState({});
  const {user} = useAuthContext(); 

  useEffect(() => {
    axios
      .get("http://localhost:9000/users/" + user._id + "/notes")
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
