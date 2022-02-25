import { useEffect } from "react";
// import * as AuthService from "../../services/auth.service";
// import IUser from '../types/user.type';
import { Link } from "react-router-dom";


// import EventBus from "../../common/EventBus";


const Header = (props) => {

    // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    // const [showAdminBoard, setShowAdminBoard] = useState(false);
    // const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        console.log("Header useEffect");
        console.log(props.isLoggedIn);
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

        console.log("holaaaa");
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

                    {props.isLoggedIn && <Link to={"/"} className="headerbar-brand">
                        HornLog
                    </Link>
                    }
                </div>
                <div className="center">

                </div>

                <div className="right-section">
                    {props.user ? (
                        <div className="headerbar-header ml-auto">
                            <li className="header-item">
                                <Link to={"/profile"} className="header-link">
                                    {props.user.email}
                                </Link>
                            </li>
                            <li className="header-item">
                                <a href="/login" className="header-link" onClick={props.logOut}>
                                    LogOut {props.user.email}
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="right-section-inner">
                            <div className="header-item">
                                <Link to={"/login"} className="header-link">
                                    Login
                                </Link>
                            </div>

                            <div className="header-item">
                                <Link to={"/register"} className="header-link">
                                    Register
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </header>
    );
}

export default Header;