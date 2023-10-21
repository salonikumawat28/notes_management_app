import Login from "../components/Login";
import SignUp from "../components/SignUp";
import PublicInfo from "../components/PublicInfo";
import PublicHeader from "../components/PublicHeader";

function PublicHomePage({showLogin = true}) {
    return (
        <div>
            <PublicHeader />
            <PublicInfo />
            {showLogin ? <Login /> : <SignUp />}
        </div>
    );
}

export default PublicHomePage;