import { Fragment, useEffect } from "react";
// import * as AuthService from "../../services/auth.service";
// import IUser from '../types/user.type';
import { Link, NavLink } from "react-router-dom";
import Icon from "./Icon";


const Header = (props) => {


    useEffect(() => {
        // console.log("Header useEffect");
        // console.log(props.isLoggedIn);
        // const user = AuthService.getCurrentUser();

        if (props.user) {
            // setCurrentUser(props.user);
            // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        } else {
            // setCurrentUser(undefined);
            // setShowModeratorBoard(false);
            // setShowAdminBoard(false);
        }

        // console.log("holaaaa");
        // EventBus.on("logout", logOut);

        // return () => {
        //     EventBus.remove("logout", logOut);
        // };
    }, [props.isLoggedIn, props.user]);

    // const logOut = () => {
    //     console.log(props.logout());

    //     // AuthService.logout();
    //     // setShowModeratorBoard(false);
    //     // setShowAdminBoard(false);
    //     // setCurrentUser(undefined);
    // };

    return (
        <header className="headerbar">
            <div className="headerbar-inner">
                <div className="left-section">

                    {!props.isLoggedIn && <div className="headerbar-brand">
                        HornLog
                    </div>
                    }
                </div>
                <div className="center">

                </div>

                <div className="right-section">
                    {props.user ? (
                        <div className="right-section-inner">

                            <NavLink className="headerItem" to="/profile">
                                <Icon type="user" />
                                <h3>{props.user.firstName}</h3>
                            </NavLink>
                            <a className="headerItem" onClick={props.logOut}>
                                <Icon type="logOut" />
                            </a>

                            {/* <li className="header-item">
                                <Link to={"/profile"} className="header-link">
                                    {props.user.email}
                                </Link>
                            </li> */}
                            {/* <li className="header-item">
                                <a href="/login" className="header-link" onClick={props.logOut}>
                                    LogOut {props.user.email}
                                </a>
                            </li> */}
                        </div>
                    ) : (
                        <div className="right-section-inner">
                            <div className="header-item">
                                <Link to={"/login"} className="header-link">
                                    Login
                                </Link>
                            </div>

                            {/* <div className="header-item">
                                <Link to={"/register"} className="header-link">
                                    Register
                                </Link>
                            </div> */}
                        </div>
                    )}
                </div>
            </div>

        </header>
    );
}

export default Header;