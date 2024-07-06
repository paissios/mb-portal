import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import loginIcon from "../../assets/images/logo.png";
import { useNavigate } from "react-router";
import { Button, TextField } from "@mui/material";
import { authenticateUser } from "../../helpers/authHelper";
import { signInSuccess } from "../../feature/login/authSlice";

import classes from "./LoginForm.module.scss";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const [formError, setFormError] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const navigate = useNavigate();

  const submitHandler = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const result = await authenticateUser(values.email, values.password);

    if (result.success) {
      dispatch(
        signInSuccess({
          email: values.email,
          name: result.data?.name,
        })
      );
      navigate("/");
    } else {
      setFormError(result.message!);
    }

    setSubmitting(false);
  };

  return (
    <div className={classes.loginFormWrapper}>
      <div className={classes.loginForm}>
        <div className={classes.formHeader}>
          <img src={loginIcon} alt="Login Icon" />
          <h5>Login</h5>
          <p>Enter your details to login.</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
          validateOnMount
          enableReinitialize
        >
          {({ isSubmitting, isValid, errors, touched }) => (
            <Form className={classes.form}>
              <div className={classes.field}>
                <Field
                  type="email"
                  name="email"
                  placeholder="email@test.com"
                  as={TextField}
                  variant="outlined"
                  label="Email Address*"
                  fullWidth
                  error={Boolean(errors.email && touched.email)}
                  helperText={errors.email && touched.email ? errors.email : ""}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className={classes.field}>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  as={TextField}
                  variant="outlined"
                  label="Password*"
                  fullWidth
                  error={Boolean(errors.password && touched.password)}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                Log In
              </Button>
              {formError && <p className={classes.error}>{formError}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
