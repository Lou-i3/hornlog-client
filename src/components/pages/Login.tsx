import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// import { login } from "../../services/auth.service";
import { Link, useHistory } from "react-router-dom";
// import { gql, useMutation } from "@apollo/client";


import 'firebase/auth';


// const LoginMutation = gql`
//   mutation LoginQuery($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         id
//         email
//         role
//       }
//     }
//   }
// `;

type LoginProps = {
  onSubmit: (email: string, password: string) => void;
  errorAuth: string | undefined;
  loadingAuth: boolean;

};


const Login = ({ onSubmit, errorAuth, loadingAuth }: LoginProps) => {
  // const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const history = useHistory();
  // const [mutateFunction, { data, loading, error }] = useMutation(LoginMutation);


  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("");
    // setLoading(true);

    // mutateFunction( {
    //   variables: {
    //     email: username,
    //     password: password
    //   }
    // }).then(data => {
    //   console.log(data);
    //   localStorage.setItem("token", data.data.login.token);
    //   localStorage.setItem("user", JSON.stringify(data.data.login.user));
    //   // Props.setIsLoggedIn(true);
    // }).catch(err => {
    //   console.log(err.message);
    // });

    // console.log("LoginQuery");
    // console.log(data);


    onSubmit(username, password);
    if (window.location.href.includes("/login")) {
            history.push("/profile");
            
}
    // login(username, password).then(
    //   () => {
    //     if (window.location.href.includes("/login")) {
    //       history.push("/profile");
    //     }
    //     window.location.reload();
    //   },
    //   (error) => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     setLoading(false);
    //     setMessage(resMessage);
    //   }
    // );
  };

  // if (data) {
  //   localStorage.setItem("token", data.login.token);
  //   history.push("/profile");
  // }

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="login">
      <div className="login-inner">
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-inner">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>


              {errorAuth && <div className="form-group">
                <p>Error: {errorAuth}</p>
              </div>}

              <div className="form-group">
                <p>Forgot your password? Sorry.</p>
              </div>

              <div className="form-line">
                <div className="form-group">
                  <Link to="/register" className="button-secondary button">

                    Register
                  </Link>
                </div>
                <div className="form-group">

                  <button type="submit" className="button-primary button" disabled={loadingAuth}>
                    {loadingAuth && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>
              </div>
              {message && (
                <div className="form-group">
                  <div className="error" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;