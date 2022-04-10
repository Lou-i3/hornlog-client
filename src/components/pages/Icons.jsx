import { useState } from "react";
import Icon from "../global/Icon";
import Search from "../items/Search";

const Icons = () => {
    const [searchTerms, setSearchTerms] = useState("");

    const handleClick = (icon) => {
        console.log("handleClick", icon);
        navigator.clipboard.writeText(icon);
    }

    return (
        <div className="content-inner">
            <h1>Icons</h1>
            <Search
                setSearchTerms={setSearchTerms}
            />
            <div className="iconsPageWrapper">
                <Icon
                    all={true}
                    onClick={handleClick}
                    searchTerms={searchTerms}
                />
            </div>
        </div>
    );
}

export default Icons;