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
    const [searchTerms, setSearchTerms] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    useEffect(() => {
        console.log("useEffect Partners");
        console.log("selected Partner: ", selectedPartner);

        if (selectedPartner && ["none", "view"].includes(displayMode)) {
            setDisplayMode("view");
            console.log("setDisplayMode", displayMode);
        } else if (displayMode === "new") {
            // setDisplayMode("none");
            console.log("setDisplayMode", displayMode);
            setSelectedPartner(null);

        }

    }, [selectedPartner, displayMode]);

    // useEffect(() => {
    //     if (selectedPartner && ["none", "view"].includes(displayMode)) {
    //         setDisplayMode("between");
    //         console.log("setDisplayMode", displayMode);
    //     } else if (selectedPartner && ["between"].includes(displayMode)) {
    //         setDisplayMode("view");
    //         console.log("setDisplayMode", displayMode);
    //     }
    // }, [selectedPartner]);

    const handleClickNew = () => {
        setDisplayMode("view");

        setSelectedPartner(null);
        setDisplayMode("new");
    }

    return (
        <div className="content-inner">
            <div className={`partners-page-inner ${displayMode}`}>
                {
                    <div className="left-side side">
                        <div className="partners">
                            <div className="title">
                                <h1>Partners</h1>
                                <div className="new" onClick={() => handleClickNew()}>
                                    <p>New</p>
                                    <Icon type="plus" />
                                </div>
                            </div>
                            <Search setSearchTerms={setSearchTerms} />
                            <MyPartners selectedPartner={selectedPartner} setSelectedPartner={setSelectedPartner} setDisplayMode={setDisplayMode} searchTerms={searchTerms} />
                        </div>


                    </div>
                }

                {
                    (windowWidth > 767 || (windowWidth < 767 && ["view", "edit", "new"].includes(displayMode))) &&
                    <div className="right-side side">
                        {
                            ["view", "edit", "new"].includes(displayMode) &&
                            <Profile partner={selectedPartner} person={selectedPartner ? selectedPartner.person : null} displayMode={displayMode} setDisplayMode={setDisplayMode} setSelectedPartner={setSelectedPartner} />
                        }
                        {displayMode === "none" &&
                            <div className="none">
                                <Illustration type="partnersNoSelection" />
                                <p>Select a partner to see details</p>
                            </div>
                        }
                        {/* {(displayMode === "edit" || displayMode === "new") && <PartnerEditNew displayMode={displayMode} setDisplayMode={setDisplayMode} setSelectedHook={setSelectedHook} />} */}
                    </div>
                }

            </div>

        </div>
    );
}

export default Partners;