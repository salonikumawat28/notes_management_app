import { useAuthContext } from "../contexts/AuthContext";

function Logout() {
    const {setUser} = useAuthContext();

    function logout(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log("logout");
        localStorage.removeItem("user");
        setUser({});
    }

    return (
        <div>
            <button type="submit" onClick={logout}>Logout</button>
        </div>
    );
}

export default Logout;