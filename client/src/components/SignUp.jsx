import '../css/SignUp.css';

function SignUp() {
    return (
        <div>
            <form>
                <label> Name: </label>
                <input type="text" name="name" />
                
                <label> Email: </label>
                <input type="email" name="email" />
                
                <label> Password: </label>
                <input type="password" name="password" />

                <div className='Link'>
                    <a href="#">Already have an account?</a>
                </div>
                
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;