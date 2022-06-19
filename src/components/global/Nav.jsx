import Icon from "./Icon";
import { NavLink } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

const Nav = (props) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const { setPageLoading } = props;

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    const menuItems = [
        {
            Name: "Dashboard",
            Icon: "dashboard",
            Url: "/home"
        },
        {
            Name: "Profile",
            Icon: "user",
            Url: "/profile",
            mobile: 'left'
        },
        // {
        //     Name: "Admin",
        //     Icon: "admin",
        //     Url: "/admin"
        // },
        {
            Name: "Partners",
            Icon: "partners",
            Url: "/partners",
            mobile: 'left',
            key: Date.now()
        },
        {
            Name: "Hooks",
            Icon: "hooks",
            Url: "/hooks",
            mobile: 'right'
        },
        {
            Name: "Settings",
            Icon: "settings",
            Url: "/settings",
            mobile: 'right'
        },
        {
            Name: "Icons",
            Icon: "icons",
            Url: "/icons"
        },

    ];

    const handleClick = (e, target) => {
        // history.push('/empty');
        setPageLoading(true);
        console.log("handleClick", "target: ", target);
        // setPageLoading(false);
        setTimeout(() => {
            setPageLoading(false);
        }, 10);
        // history.replace(target);
    }

    return (
        <div className="nav">
            {
                windowWidth > 767 ?
                    <Fragment>
                        <img src="/logo.svg" alt="" className="logo" />
                        <h1>HornLog</h1>
                        <div className="menu">
                            {
                                menuItems.map((item, index) => {
                                    let linkTarget = {
                                        pathname: item.Url,
                                        key: Date.now(), // we could use Math.random, but that's not guaranteed unique.
                                        state: {
                                            applied: true
                                        }
                                    };

                                    return (
                                        <NavLink className="menuItem" onClick={(e) => handleClick(e, item.Url)} to={item.Url} key={index + " " + linkTarget.key}>
                                            <Icon type={item.Icon} />
                                            <h3>{item.Name}</h3>
                                        </NavLink>
                                    )
                                })
                            }
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <div className="mobileMenu">
                            {
                                menuItems.map((item, index) => (
                                    item.mobile === "left" &&
                                    <NavLink className="menuItem" to={item.Url} onClick={(e) => handleClick(e, item.Url)} key={index}>
                                        <Icon type={item.Icon} />
                                        {/* <h3>{item.Name}</h3> */}
                                    </NavLink>
                                ))
                            }
                            <NavLink className="menuItem" to="/home" onClick={(e) => handleClick(e, '/Home')}>
                                <img src="/logo.svg" alt="" className="logo" />
                            </NavLink>
                            {
                                menuItems.map((item, index) => (
                                    item.mobile === "right" &&
                                    <NavLink className="menuItem" to={item.Url} onClick={(e) => handleClick(e, item.Url)} key={index}>
                                        <Icon type={item.Icon} />
                                        {/* <h3>{item.Name}</h3> */}
                                    </NavLink>
                                ))
                            }
                        </div>

                    </Fragment>
            }





        </div>
    );
}

export default Nav;