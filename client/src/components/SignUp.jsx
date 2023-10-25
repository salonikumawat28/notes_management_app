import "../css/SignUp.css";
import apiClient from "../apiClient";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import config from "../configs/config";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: signUpUser,
  });

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
    <Container maxWidth="xs">
      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
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
          <NavLink to="/login">Already have an account?</NavLink>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
}

export default SignUp;
