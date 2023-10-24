import { useAuthContext } from "../contexts/AuthContext";
import "../css/Login.css";
import apiClient from "../apiClient";
import { Link } from 'react-router-dom';
import config from "../configs/config";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(255, "Email must be at most 255 characters")
    .required("Email is required"),
  password: Yup.string()
    .max(255, "Password must be at most 255 characters")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const { setAuthToken } = useAuthContext();

  async function login(userCredentials) {
    try {
      const response = await apiClient.post(config.BACKEND_URL + "api/v1/auth/login/", userCredentials);
      const authToken = response.data.authToken;
      if (authToken) {
        setAuthToken(authToken);
      }
    } catch (error) {
      console.log("Error is: ", JSON.stringify(error));
    }
  }
  
  return (
    <div className="login">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={login}
      >
        <Form>
          <div>
            <label htmlFor="email"> Email: </label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="password"> Password: </label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div className="Link">
            <Link to="/signup">Create an account.</Link>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
