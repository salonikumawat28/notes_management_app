import { useAuthContext } from "../contexts/AuthContext";
import "../css/Login.css";
import apiClient from "../apiClient";
import { NavLink } from "react-router-dom";
import config from "../configs/config";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: { login },
  });

  async function login(userCredentials) {
    try {
      const response = await apiClient.post(
        config.BACKEND_URL + "api/v1/auth/login/",
        userCredentials
      );
      const authToken = response.data.authToken;
      if (authToken) {
        setAuthToken(authToken);
      }
    } catch (error) {
      console.log("Error is: ", JSON.stringify(error));
    }
  }

  return (
    <Container maxWidth="xs">
      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <div className="Link">
          <NavLink to="/signup">Create an account.</NavLink>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
