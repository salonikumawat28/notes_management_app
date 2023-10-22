import { useAuthContext } from "../contexts/AuthContext";

function Logout() {
    const {setAuthToken} = useAuthContext();

    function logout(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log("logout");
        setAuthToken("");
    }

    return (
        <div>
            <button type="submit" onClick={logout}>Logout</button>
        </div>
    );
}

export default Logout;