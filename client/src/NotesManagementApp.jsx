import { useEffect } from 'react';
import { useAuthContext } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './css/NotesManagementApp.css';
import _ from 'underscore';

function NotesMangementApp() {
    const {user, setUser} = useAuthContext();

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
      {_.get(user, "userId") ? <HomePage /> : <LoginPage />}
    </div>
  );
}

export default NotesMangementApp;