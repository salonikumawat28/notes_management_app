import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import "../css/Login.css";
import apiClient from "../apiClient";
import { Link } from 'react-router-dom';

function Login() {
  const { setAuthToken } = useAuthContext();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  async function login(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await apiClient.post("http://localhost:9000/api/v1/auth/login/", userCredentials);
      const authToken = response.data.authToken;
      if (authToken) {
        setAuthToken(authToken);
      }
    } catch (error) {
      console.log("Error is: ", JSON.stringify(error));
    }
  }

  function onEmailChange(event) {
    setUserCredentials({ ...userCredentials, email: event.target.value });
  }

  function onPasswordChange(event) {
    setUserCredentials({ ...userCredentials, password: event.target.value });
  }

  return (
    <div className="login">
      <form onSubmit={login}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={userCredentials.email}
              onChange={onEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userCredentials.password}
              onChange={onPasswordChange}
              required
            />
          </div>
          <div className="Link">
            <Link to="/signup">Create an account.</Link>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
    </div>
  );
}

export default Login;
