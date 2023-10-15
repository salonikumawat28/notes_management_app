import { AuthProvider } from './contexts/AuthContext';
import NotesMangementApp from './NotesManagementApp';

function App() {
  return (
    <AuthProvider>
        <NotesMangementApp />
    </AuthProvider>
  );
}

export default App;
