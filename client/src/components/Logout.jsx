import { useAuthContext } from "../contexts/AuthContext";

function Logout() {
    const {setIsLoggedIn} = useAuthContext();

    function logout() {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }

    return (
        <div>
            <button type="submit" onClick={logout}>Logout</button>
        </div>
    );
}

export default Logout;