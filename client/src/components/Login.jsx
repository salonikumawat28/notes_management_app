function Login() {
    return (
        <div>
            <div>
                <h1>Welcome to Notes App</h1>
            </div>
            <div>
                <h2>Login Page</h2>
                <form>
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
                    <div>
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