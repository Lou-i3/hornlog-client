import { useState, useRef, useEffect } from "react";
import Icon from "../global/Icon";
import Pill from "./Pill";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, setVisible) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                //   alert("You clicked outside of me!");
                //   console.log("ref: ", ref);
                setVisible(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const FilterPanel = (props) => {
    const {
        filters, // { sortColumn, sortType, hookDate, nameType } || {  }
        setFilters,
        items,
        type // partners / hooks
    } = props;
    const [visible, setVisible] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setVisible);

    const handleSetFilter = (property, value) => {
        console.log("handleSetFilter", property, value);
        let newFilters = { ...filters };
        newFilters[property] = value;
        setFilters(newFilters);
    }

    const toggleFilterPanel = () => {
        console.log("toggleFilterPanel");
        if (!visible) {
            setVisible(true);
        }
        // setVisible(!visible);
    }

    const test = () => {
        console.log("test", props);
    }

    const filterItemSwitchClasses = (property) => {
        return filters.sortColumn === property ? "filterItem-switch selected" : "filterItem-switch";
    }

    return (
        <div className="filterWrapper" ref={wrapperRef} onClick={() => toggleFilterPanel()}>
            <Icon type="filter" />
            <div className={`filterPanel ${visible ? "visible" : ""}`}>
                {
                    type === "partners" &&
                    <div className="partnersFilter filtersWrapper">
                        <div className="test" onClick={() => test()}>Test</div>
                        <div className="filterGroup">
                            <div className="filterTitle">
                                <p>Sort by</p>
                            </div>
                            <div
                                className="filterItem"
                                onClick={() => handleSetFilter("sortColumn", "firstHook")}
                            >
                                <Icon type="date" />
                                First Hook
                                <div
                                    className={filterItemSwitchClasses("firstHook")}
                                ></div>
                            </div>
                            <div
                                className="filterItem"
                                onClick={() => handleSetFilter("sortColumn", "lastHook")}
                            >
                                <Icon type="date" />
                                Last Hook
                                <div
                                    className={filterItemSwitchClasses("lastHook")}
                                ></div>
                            </div>
                            <div
                                className="filterItem"
                                onClick={() => handleSetFilter("sortColumn", "name")}
                            >
                                <Icon type="user" />
                                Name
                                <div
                                    className={filterItemSwitchClasses("name")}
                                ></div>
                            </div>
                        </div>
                        <div className="filterGroup">
                            <div className="filterTitle">
                                <p>Show</p>
                            </div>
                            <div className="filterItem">
                                <Icon type="user" />
                                Name
                                <Pill
                                    text="Nick"
                                    selected={filters.nameType === "nickname"}
                                    onClick={() => handleSetFilter("nameType", "nickname")}
                                />
                                <Pill
                                    text="Full"
                                    selected={filters.nameType === "full"}
                                    // onClick={() => handleSetFilter("nameType", "full")}
                                />
                            </div>
                            <div className="filterItem">
                                <Icon type="hooks" />
                                Hook
                                <Pill
                                    text="First"
                                    selected={filters.hookDate === "first"}
                                    onClick={() => handleSetFilter("hookDate", "first")}
                                />
                                <Pill
                                    text="Last"
                                    selected={filters.hookDate === "last"}
                                    onClick={() => handleSetFilter("hookDate", "last")}
                                />
                            </div>
                        </div>
                    </div>
                }
                {
                    type === "hooks" &&
                    <div className="hooksFilter filtersWrapper">
                    </div>
                }
            </div>
        </div>

    );
}

export default FilterPanel;