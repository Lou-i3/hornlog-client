import { useState, useEffect } from "react";
import Icon from "../global/Icon";
import Search from "../items/Search";
import { useMatomo } from '@datapunt/matomo-tracker-react'

const Icons = () => {
    const [searchTerms, setSearchTerms] = useState("");

    const { trackPageView } = useMatomo();

    useEffect(() => {
        trackPageView({
            documentTitle: 'Icons',
        });
    }, []);

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