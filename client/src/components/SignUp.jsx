import { useState } from 'react';
import '../css/SignUp.css';

function SignUp() {
    const [user, setUser] = useState("");

    const requestInfo = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(user)
    };

     async function signUpUser() {
        const response = await fetch("http://localhost:9000/users/", requestInfo);
        const signedUpUser = await JSON.stringify(response);
        setUser(signedUpUser);
    }

    function onNameChange(event) {
        setUser({...user, name: event.target.value});
    }

    function onEmailChange(event) {
        setUser({...user, email: event.target.value});
    }

    function onPasswordChange(event) {
        setUser({...user, password: event.target.value});
    }

    return (
        <div>
            <form onSubmit={signUpUser}>
                <label> Name: </label>
                <input type="text" name="name"  value={user.name} onChange={onNameChange} required/>
                
                <label> Email: </label>
                <input type="email" name="email" value={user.email} onChange={onEmailChange} required/>
                
                <label> Password: </label>
                <input type="password" name="password" value={user.password} onChange={onPasswordChange} required />

                <div className='Link'>
                    <a href="#">Already have an account?</a>
                </div>
                
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;