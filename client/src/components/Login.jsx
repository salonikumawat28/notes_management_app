import { useAuthContext } from "../contexts/AuthContext";
import '../css/Login.css';

function Login() {
    const {setIsLoggedIn} = useAuthContext();

    function login() {
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
    }

    return (
        <div>
            <div>
                <form onSubmit={login}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>
                    <div className="Link">
                        <a href="#">Create an account.</a>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Login;