import Login from "../components/Login";
import Welcome from "../components/Welcome";

function PublicHomePage() {
    return (
        <div>
            <Welcome />
            <Login />
        </div>
    );
}

export default PublicHomePage;