import AuthHeader from "../components/AuthHeader";
import NoteCreate from "../components/NoteCreate";
import NoteList from "../components/NoteList";

function AuthHomePage() {
    return (
        <div>
            <AuthHeader />
            <NoteCreate />
            <NoteList />
        </div>
    );
}

export default AuthHomePage;