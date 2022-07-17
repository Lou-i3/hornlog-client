// import Icon from "../global/Icon";
import Profile from "../itemGroups/Profile";
import Search from "../items/Search";
import { useState, useEffect } from 'react';
import Icon from "../global/Icon";
import Illustration from "../global/Illustration";
import MyPartners from "../itemGroups/myPartners";
import FilterPanel from "../items/FilterPanel";

const Partners = () => {
    const [displayMode, setDisplayMode] = useState("none");
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [searchTerms, setSearchTerms] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [totalPartners, setTotalPartners] = useState(0);
    const [listAnimation, setListAnimation] = useState("");
    const [detailsAnimation, setDetailsAnimation] = useState("");
    const [filters, setFilters] = useState({
        sortColumn: "lastHook",
        sortType: "most recent", // most recent, oldest first
        hookDate: "first", // show date of : first, last
    });

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    const setAnimations = () => {
        if (windowWidth < 767) {
            if (selectedPartner || ["new", "view"].includes(displayMode)) {
                setListAnimation("fade-out");
                setDetailsAnimation("slide-in-from-right");
            }
            if (!selectedPartner && displayMode === "none") {
                setListAnimation("slide-in-from-left");
                setDetailsAnimation("fade-out");
            }
        } else {
            setListAnimation("");
            setDetailsAnimation("");
        }
    };

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
        setAnimations();

    }, [selectedPartner, displayMode]);

    useEffect(() => {
        // To fix transition in case of screen resize
        setAnimations();
    }, [windowWidth]);

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
                    <div className={`left-side side ${listAnimation}`}>
                        <div className="partners">
                            <div className="title">
                                <div className="titleWrapper">
                                <h1>Partners</h1>
                                <div className="total">{totalPartners}</div>
                                </div>
                                <div className="new" onClick={() => handleClickNew()}>
                                    <p>New</p>
                                    <Icon type="plus" />
                                </div>
                            </div>
                            <div className="title">

                            <Search setSearchTerms={setSearchTerms} />
                            <FilterPanel 
                                filters={filters}
                                setFilters={setFilters}
                                type="partners"
                            />
                            </div>
                            <MyPartners 
                            selectedPartner={selectedPartner} 
                            setSelectedPartner={setSelectedPartner} 
                            setDisplayMode={setDisplayMode} 
                            searchTerms={searchTerms} 
                            setTotalPartners={setTotalPartners}
                            filters={filters}
                            />
                        </div>


                    </div>
                }

                {
                    // (windowWidth > 767 || (windowWidth < 767 && ["view", "edit", "new"].includes(displayMode))) &&
                    <div className={`right-side side ${detailsAnimation}`}>
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