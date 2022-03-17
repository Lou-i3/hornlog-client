// import Icon from "../global/Icon";
import Profile from "../itemGroups/Profile";
import Search from "../items/Search";
import { useState, useEffect } from 'react';
import Icon from "../global/Icon";
import Illustration from "../global/Illustration";
import MyPartners from "../itemGroups/myPartners";

const Partners = () => {
    const [displayMode, setDisplayMode] = useState("none");
    const [selectedPartner, setSelectedPartner] = useState(null);

    useEffect(() => {
        console.log("useEffect");
        console.log(selectedPartner);

        if (selectedPartner) {
            setDisplayMode("view");
            console.log("setDisplayMode", displayMode);
        } else {
            // setDisplayMode("none");
        }

    }, [selectedPartner, displayMode]);

    const handleClickNew = () => {
        setSelectedPartner(null);
        setDisplayMode("new");
    }

    return (
        <div className="content-inner">
            <div className={`partners-page-inner ${displayMode}`}>
                <div className="left-side side">
                    <div className="partners">
                        <div className="title">
                            <h1>Partners</h1>
                            <div className="new" onClick={() => handleClickNew()}>
                                <p>New</p>
                                <Icon type="plus" />
                            </div>
                        </div>
                        <Search />
                        <MyPartners selectedPartner={selectedPartner} setSelectedPartner={setSelectedPartner} />
                    </div>
                    

                </div>
                <div className="right-side side">
                    {displayMode === "view" && <Profile partner={selectedPartner} person={selectedPartner.person}/>}
                    {displayMode === "none" &&
                        <div className="none">
                            <Illustration type="partnersNoSelection" />
                            <p>Select a partner to see details</p>
                        </div>
                    }
                    {/* {(displayMode === "edit" || displayMode === "new") && <PartnerEditNew displayMode={displayMode} setDisplayMode={setDisplayMode} setSelectedHook={setSelectedHook} />} */}
                </div>
            </div>

        </div>
    );
}

export default Partners;