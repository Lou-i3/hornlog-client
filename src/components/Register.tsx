import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../types/user.type";
import { register } from "../services/auth.service";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: IUser = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue: IUser) => {
    const { username, email, password } = formValue;

    register(username || "", email || "", password || "").then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="register">
      <div className="register-inner">
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div className="form-inner">
                <h1>Create Account</h1>
                <div className="form-line">
                  <div className="form-group">
                    <label htmlFor="username"> Username </label>
                    <Field name="username" type="text" className="form-control" placeholder="toto69"/>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="name"> Name </label>
                    <Field name="name" type="text" className="form-control" placeholder="Toto" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <div className="form-line">
                <div className="form-group">
                  <label htmlFor="email"> Email </label>
                  <Field name="email" type="email" className="form-control" placeholder="toto@gmail.com"/>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password"> Password </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="**********"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                </div>

                <div className="form-group">
                  <button type="submit" className="button-primary button">Register</button>
                </div>
                <div className="gotologin">
                  <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "error"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;