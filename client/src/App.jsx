import { AuthContextProvider } from './contexts/AuthContext';
import NotesMangementApp from './NotesManagementApp';

function App() {
  return (
    <AuthContextProvider>
        <NotesMangementApp />
    </AuthContextProvider>
  );
}

export default App;
