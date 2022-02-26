import MyHooks from "../itemGroups/myHooks";
// import Icon from "../global/Icon";
import HookDetails from "../itemGroups/HookDetails";
import Search from "../items/Search";
import { useState, useEffect } from 'react';
import HookEditNew from "../itemGroups/HookEditNew";
import Icon from "../global/Icon";

const Hooks = () => {
    const [selectedHook, setSelectedHook] = useState(null);
    const [displayMode, setDisplayMode] = useState("none");

    useEffect(() => {
        console.log("useEffect");
        console.log(selectedHook);

        if (selectedHook) {
            setDisplayMode("view");
            console.log("setDisplayMode", displayMode);
        } else {
            // setDisplayMode("none");
        }

    }, [selectedHook]);

    const handleClickNew = () => {
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
                        <Search />
                        <MyHooks selectedHook={selectedHook} setSelectedHook={setSelectedHook} />
                    </div>

                </div>
                <div className={`right-side side ${displayMode}`}>

                    {displayMode == "view" && <HookDetails hook={selectedHook} />}
                    {displayMode == "none" && <p>Select a hook to see details</p>}
                    {(displayMode == "edit" || displayMode == "new") && <HookEditNew displayMode={displayMode} setDisplayMode={setDisplayMode} setSelectedHook={setSelectedHook}/>}

                </div>
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