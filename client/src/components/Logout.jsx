import { useAuthContext } from "../contexts/AuthContext";

function Logout() {
    const {setIsLoggedIn} = useAuthContext();

    function logout(event) {
        event.preventDefault(); // Prevent the default form submission behavior
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