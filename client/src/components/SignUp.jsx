import { useState } from "react";
import "../css/SignUp.css";
import axios from "axios";

function SignUp() {
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  async function signUpUser(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // const requestInfo = {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(newUser)
    // };

    try {
      const response = await axios.post(
        "http://localhost:9000/users/",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const response = await fetch("http://localhost:9000/users/", requestInfo);
      //   console.log("response daya is: ", response.data);
      // const signedUpUser = await response.json();
      const signedUpUser = response.data;
      console.log("Signedup user: ", signedUpUser);
      setNewUser(signedUpUser);
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
    <div>
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
          <a href="#">Already have an account?</a>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
