import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Link, useNavigate } from "react-router-dom";

import { useMatomo } from '@datapunt/matomo-tracker-react'

import 'firebase/auth';


type LoginProps = {
  onSubmit: (email: string, password: string) => void;
  errorAuth: string | undefined;
  loadingAuth: boolean;

};


const Login = ({ onSubmit, errorAuth, loadingAuth }: LoginProps) => {
  const navigate = useNavigate();

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const { trackPageView } = useMatomo();

    useEffect(() => {
        trackPageView({
            documentTitle: 'Home',
        });
    }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    onSubmit(username, password);
    if (window.location.href.includes("/login") && !errorAuth) {
      navigate("/profile");

    }

  };

  return (
    <div className="login">
      <div className="login-inner">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-inner">
              <div className="formHeader">
                <h2>Welcome to HornLog</h2>
              </div>

              <div className="formContent">
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <Field name="username" type="text" className="form-control" placeholder="toto@hornlog.com" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field name="password" type="password" className="form-control" placeholder="·············" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                {errorAuth && <div className="form-group">
                  <p className="error">Error: {errorAuth}</p>
                </div>}
              </div>

              <div className="formFooter">

                <div className="form-group forgotPassword">
                  <Link to="/forgotPassword" >Forgot your password?</Link>
                </div>

                <div className="form-line">
                  {/* <div className="form-group">
                  <Link to="/register" className="button-secondary button">

                    Register
                  </Link>
                </div> */}
                  <div className="form-group">

                    <button type="submit" className="button-primary button" disabled={loadingAuth}>
                      {loadingAuth && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Login</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;