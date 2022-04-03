import { useState } from "react";
import Icon from "../global/Icon";

const Icons = () => {
    const [iconsList, setIconsList] = useState([
        'dashboard',
        'user',
        'admin',
        'partners',
        'hooks',
        'search',
        'star',
        'apple',
        'archive',
        'edit',
        'duration',
        'mood',
        'save',
        'plus',
        'bin',
        'genders',
        'sexuality',
        'sexualityStraight',
        'birthday',
        'location',
        'phone',
        'email',
        'notes',
        'position',
        'path',
        'snapchat',
        'instagram',
        'nationality',
        'other'
    ].sort());

    // setIconsList(iconsList.sort());

    const handleClick = (icon) => {
        console.log("handleClick", icon);
        navigator.clipboard.writeText(icon);
    }

    return (
        <div className="content-inner">
            <h1>Icons</h1>
            <div className="iconsPageWrapper">
                {
                    iconsList.map((icon, index) => (
                        <div className="iconWrapper" key={index} onClick={() => handleClick(icon)}>
                            <Icon type={icon} />
                            <h3>{icon}</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Icons;