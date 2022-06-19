import MyHooks from "../itemGroups/myHooks";
// import Icon from "../global/Icon";
import HookDetails from "../itemGroups/HookDetails";
import Search from "../items/Search";
import { useState, useEffect } from 'react';
import HookEditNew from "../itemGroups/HookEditNew";
import Icon from "../global/Icon";
import Illustration from "../global/Illustration";

const Hooks = () => {
    const [selectedHook, setSelectedHook] = useState(null);
    const [displayMode, setDisplayMode] = useState("none");
    const [searchTerms, setSearchTerms] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    useEffect(() => {
        console.log("useEffect hooks, selectedHook: ");
        console.log(selectedHook);

        if (selectedHook && ["none", "view"].includes(displayMode)) {
            setDisplayMode("view");
            console.log("setDisplayMode", displayMode);
        } else if (displayMode === "new") {
            // setDisplayMode("none");
            console.log("setDisplayMode", displayMode);
            setSelectedHook(null);

        }

    }, [selectedHook, displayMode]);

    useEffect(() => {
        if (selectedHook && ["none", "view", "new"].includes(displayMode)) {
            setDisplayMode("view");
            console.log("setDisplayMode", displayMode);
        } else if (selectedHook && ["edit"].includes(displayMode)) {
            setDisplayMode("view");
            console.log("setDisplayMode", displayMode);
        }
    }, [selectedHook]);


    const handleClickNew = () => {
        setDisplayMode("view");

        setSelectedHook(null);
        // setSelectedHook("none");
        setDisplayMode("new");
    }
    return (
        <div className="content-inner">
            <div className={`hooks-page-inner ${displayMode}`}>
                <div className="left-side side">

                    <div className="hooks">
                        <div className="title">
                            <h1>Hooks</h1>
                            <div className="new" onClick={() => handleClickNew()}>
                                <p>New</p>
                                <Icon type="plus" />

                            </div>
                        </div>
                        <Search setSearchTerms={setSearchTerms} />
                        <MyHooks selectedHook={selectedHook} setSelectedHook={setSelectedHook} searchTerms={searchTerms} />
                    </div>

                </div>
               { 
               (windowWidth > 767 || (windowWidth < 767 && ["view", "edit", "new"].includes(displayMode))) &&
                <div className={`right-side side ${displayMode}`}>

                    {
                        ["view", "edit", "new"].includes(displayMode) &&
                        <HookDetails
                            hook={selectedHook}
                            displayMode={displayMode}
                            setDisplayMode={setDisplayMode}
                            setSelectedHook={setSelectedHook}
                        />
                    }
                    {displayMode === "none" &&
                        <div className="none">
                            <Illustration type="hooksNoSelection" />
                            <p>Select a hook to see details</p>
                        </div>
                    }
                    {/* {(displayMode === "edit" || displayMode === "new") && <HookEditNew displayMode={displayMode} setDisplayMode={setDisplayMode} setSelectedHook={setSelectedHook} />} */}

                </div>
                }
            </div>

            {/* <div className="filter">
                <p>Filters</p>
                <p>Grade</p>
                <p>Duration</p>
            </div> */}
        </div>
    );
}

export default Hooks;