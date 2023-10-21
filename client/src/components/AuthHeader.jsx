import '../css/Welcome.css';
import { Link } from 'react-router-dom';
import Logout from "./Logout";

function AuthHeader() {
    return (
        <div>
            <Link to="/">Add Logo here</Link>
            <Logout />
            {/* TODO: Add search bar, and settings icon */}
        </div>
    );
}

export default AuthHeader;