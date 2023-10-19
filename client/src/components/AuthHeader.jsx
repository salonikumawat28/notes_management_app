import '../css/Welcome.css';
import { Link } from 'react-router-dom';

function AuthHeader() {
    return (
        <div>
            <Link to="/">Add Logo here</Link>
            {/* TODO: Add search bar, and settings icon */}
        </div>
    );
}

export default AuthHeader;