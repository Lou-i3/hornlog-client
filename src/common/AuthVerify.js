import React from "react";
import { withRouter } from "react-router-dom";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = (props) => {
    console.log("Auth verify run");
    props.history.listen(() => {
        console.log("History function");
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            console.log("User Found");
            const decodedJwt = parseJwt(user.accessToken);

            if (decodedJwt.exp * 1000 < Date.now()) {
                console.log("Expired!!");
                props.logOut();
            }
        }
    });

    return <div > </div>;
};

export default withRouter(AuthVerify);