import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Welcome from "../components/Welcome";

function PublicHomePage(props) {
    return (
        <div>
            <Welcome />
            {props.showLogin ? <Login /> : <SignUp />}
        </div>
    );
}

export default PublicHomePage;