import "../css/SignUp.css";
import apiClient from "../apiClient";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import config from "../configs/config";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must have at least 3 characters")
    .max(255, "Name must have at most 255 characters")
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets and spaces are allowed")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(255, "Email must be at most 255 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must be at most 255 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .required("Password is required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

function SignUp() {
  const { setAuthToken } = useAuthContext();

  async function signUpUser(newUser) {
    console.log("New user is: ", newUser);

    try {
      const response = await apiClient.post(
        config.BACKEND_URL + "api/v1/auth/signup/",
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

  return (
    <div className="signup">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={signUpUser}
      >
        <Form>
          <div>
            <label htmlFor="name"> Name: </label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

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
            <Link to="/login">Already have an account?</Link>
          </div>

          <div>
            <button type="submit">Sign Up</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUp;
