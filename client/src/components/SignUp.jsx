import { useState } from "react";
import "../css/SignUp.css";
import apiClient from "../apiClient";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function SignUp() {
  const { setAuthToken } = useAuthContext();
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  async function signUpUser(event) {
    event.preventDefault();

    try {
      const response = await apiClient.post(
        "http://localhost:9000/api/v1/auth/signup/",
        newUser
      );
      const authToken = response.data.authToken;
      if (authToken) {
        setAuthToken(authToken);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  function onNameChange(event) {
    setNewUser({ ...newUser, name: event.target.value });
  }

  function onEmailChange(event) {
    setNewUser({ ...newUser, email: event.target.value });
  }

  function onPasswordChange(event) {
    setNewUser({ ...newUser, password: event.target.value });
  }

  return (
    <div className="signup">
      <form onSubmit={signUpUser}>
        <label> Name: </label>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={onNameChange}
          required
        />

        <label> Email: </label>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={onEmailChange}
          required
        />

        <label> Password: </label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={onPasswordChange}
          required
        />

        <div className="Link">
          <Link to="/login">Already have an account?</Link>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
