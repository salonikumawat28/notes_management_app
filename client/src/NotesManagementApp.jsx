import { useEffect } from 'react';
import { useAuthContext } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function NotesMangementApp() {
    const {isLoggedIn, setIsLoggedIn} = useAuthContext();

    function handleStorageChange(event) {
        if (event.key === 'isLoggedIn') {
            setIsLoggedIn(!!localStorage.getItem('isLoggedIn'));
        }
    }

    useEffect(() => {
        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

  

  return (
    <div>
      {isLoggedIn ? <HomePage /> : <LoginPage />}
    </div>
  );
}

export default NotesMangementApp;