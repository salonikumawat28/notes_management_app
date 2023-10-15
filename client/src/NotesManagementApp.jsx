import { useAuthContext } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function NotesMangementApp() {
  const {isLoggedIn} = useAuthContext();

  return (
    <div>
      {isLoggedIn ? <HomePage /> : <LoginPage />}
    </div>
  );
}

export default NotesMangementApp;