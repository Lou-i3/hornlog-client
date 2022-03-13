import React, { useState } from "react";
import firebase from "firebase/app";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const ForgotPassword = (props) => {

    const [requestSent, setRequestSent] = useState(false);
    const [error, setError] = useState(undefined);

    const sendRequest = (email) => {

        setError(undefined);

        console.log("send request");

        console.log(email.email);

        const emailAddress = email.email; 
        console.log(emailAddress);



        try {
            firebase.auth().sendPasswordResetEmail(emailAddress)
                .then(() => {
                    console.log("email sent");
                    setRequestSent(true);
                })
                .catch((error) => {
                    console.log("error ", error);
                    // Handle Errors here.
                    setError(error.message);
                });
        }
        catch (error) {
            console.log("error ", error);
            setError(error.message);
            // Handle Errors here.
        }
        // setRequestSent(true);

        console.log("send request ends");

    }

    const initialValues = {
        email: ""
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("This field is required!"),
    });

    return (
        <div className="login forgotPassword">
            <div className="login-inner">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={sendRequest}
                >
                    <Form>
                        <div className="form-inner">
                            <div className="formHeader">
                                <h2>Forgot Password?</h2>
                            </div>

                            {
                                !requestSent ?
                                    <div className="formContent">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Field name="email" type="text" className="form-control" placeholder="toto@hornlog.com" />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="error"
                                            />
                                        </div>

                                        {
                                            error &&
                                            <div className="form-group">
                                                <p className="error">{error}</p>
                                            </div>
                                        }

                                    </div> :
                                    <p className="message">If your address is in our database you'll receive an email with the intructions to change your password
                                    </p>
                            }

                            <div className="formFooter">

                                <div className="form-line">
                                    {/* <div className="form-group"> */}

                                    <Link to="/login"><button className="button-primary button" >
                                        <span>Back to Login</span>
                                    </button></Link>
                                    {
                                        requestSent ? null :
                                            <button type="submit" className="button-primary button" >
                                                <span>Send Request</span>
                                            </button>
                                    }

                                    {/* </div> */}
                                </div>

                            </div>

                        </div>
                    </Form>
                </Formik>
            </div>

        </div>
    );
}

export default ForgotPassword;