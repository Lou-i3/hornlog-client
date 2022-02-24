import Icon from "./Icon";
import { NavLink } from "react-router-dom";

const Nav = () => {
    const menuItems = [
        {
            Name: "Dashboard",
            Icon: "dashboard",
            Url: "/home"
        },
        {
            Name: "Profile",
            Icon: "profile",
            Url: "/profile"
        },
        {
            Name: "Admin",
            Icon: "admin",
            Url: "/admin"
        },
        {
            Name: "Partners",
            Icon: "partners",
            Url: "/partners"
        },
        {
            Name: "Hooks",
            Icon: "hooks",
            Url: "/hooks"
        },
        {
            Name: "Settings",
            Icon: "settings",
            Url: "/settings"
        },

    ];
    return (
        <div className="nav">
            <h1>HornLog</h1>
            <div className="menu">
                {
                    menuItems.map((item, index) => (
                       
                        <NavLink className="menuItem" to={item.Url} key={index}>
                            <Icon type={item.Icon} />
                            <h3>{item.Name}</h3>
                        </NavLink>
                    ))
                }
            </div>




        </div>
    );
}

export default Nav;