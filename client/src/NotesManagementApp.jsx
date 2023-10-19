import { useEffect } from 'react';
import { useAuthContext } from './contexts/AuthContext';
import AuthHomePage from './pages/AuthHomePage';
import PublicHomePage from './pages/PublicHomePage';
import './css/NotesManagementApp.css';
import _ from 'underscore';

function NotesMangementApp() {
    const {isLoggedIn, setUser} = useAuthContext();

    function handleStorageChange(event) {
        if (event.key === 'user') {
            setUser(!!localStorage.getItem('user'));
        }
    }

    useEffect(() => {
        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

  return (
    <div className="Box">
      {isLoggedIn ? <AuthHomePage /> : <PublicHomePage />}
    </div>
  );
}

export default NotesMangementApp;