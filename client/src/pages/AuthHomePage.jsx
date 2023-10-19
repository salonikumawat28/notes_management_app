import Logout from "../components/Logout";
import NotesListPage from "./NotesListPage";

function AuthHomePage() {
    return (
        <div>
            <p> I am in auth home page</p>
            <Logout />
            <NotesListPage />
        </div>
    );
}

export default AuthHomePage;