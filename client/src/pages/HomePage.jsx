import Logout from "../components/Logout";
import NotesListPage from "./NotesListPage";

function HomePage() {
    return (
        <div>
            <p> I am in home page</p>
            <Logout />
            <NotesListPage />
        </div>
    );
}

export default HomePage;