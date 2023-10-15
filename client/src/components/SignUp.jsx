function SignUp() {
    return (
        <div>
            <h1>Signup</h1>
            <form>
                <label> Name:
                    <input type="text" name="name" />
                </label>
                <br />
                <label> Email:
                    <input type="email" name="email" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>

            <div>
                <a href="#">Already have an account?</a>
            </div>
        </div>
    );
}

export default SignUp;