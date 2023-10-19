import AuthHeader from "../components/AuthHeader";
import NoteCreate from "../components/NoteCreate";
import NoteList from "../components/NoteList";
import { NotesContextProvider } from "../contexts/NotesContext";

function AuthHomePage() {
  return (
    <div>
      <NotesContextProvider>
        <AuthHeader />
        <NoteCreate />
        <NoteList />
      </NotesContextProvider>
    </div>
  );
}

export default AuthHomePage;
