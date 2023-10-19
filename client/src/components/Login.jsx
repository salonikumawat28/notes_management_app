import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import "../css/Login.css";
import _ from "underscore";
import axios from "axios";
import { Link } from 'react-router-dom';

function Login() {
  const { setUser } = useAuthContext();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  

  async function login(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    console.log("Trying to login ");
    try {
      const response = await axios.post("http://localhost:9000/login/", userCredentials);
      const user = response.data
      console.log("Response User is: ", JSON.stringify(user));

      // Getting the user id from the user we get from fetch call
      const userId = _.get(user, "_id");
      if (userId) {
        localStorage.setItem("user", user);
        setUser(user);
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
    <div>
      <div>
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
    </div>
  );
}

export default Login;
