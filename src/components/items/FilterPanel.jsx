import { useState } from "react";
import Icon from "../global/Icon";
import Pill from "./Pill";

const FilterPanel = (props) => {
    const {
        filters, // { sortColumn, sortType, HookDate } || {  }
        setFilters,
        items,
        type // partners / hooks
    } = props;
    const [visible, setVisible] = useState(false);

    const handleSetFilter = (property, value) => {
        console.log("handleSetFilter", property, value);
        let newFilters = { ...filters };
        newFilters[property] = value;
        setFilters(newFilters);
    }

    const toggleFilterPanel = () => {
        console.log("toggleFilterPanel");
        setVisible(!visible);
    }

    const test = () => {
        console.log("test", props);
    }

    const filterItemSwitchClasses = (property) => {
        return filters.sortColumn === property ? "filterItem-switch selected" : "filterItem-switch";
    }

    return (
        <div className="filterWrapper" onClick={() => toggleFilterPanel()}>
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
                            <div className="filterItem">
                                <Icon type="date" />
                                First Hook
                                <div className={ filterItemSwitchClasses("firstHook") }></div>
                            </div>
                            <div className="filterItem">
                                <Icon type="date" />
                                Last Hook
                                <div className={ filterItemSwitchClasses("lastHook") }></div>
                            </div>
                            <div className="filterItem">
                                <Icon type="user" />
                                Name
                                <div className={ filterItemSwitchClasses("name") }></div>
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
                                    selected={true}
                                />
                                <Pill
                                    text="Full"
                                    selected={false}
                                />
                            </div>
                            <div className="filterItem">
                                <Icon type="hooks" />
                                Hook
                                <Pill
                                    text="First"
                                    selected={filters.hookDate === "first"}
                                />
                                <Pill
                                    text="Last"
                                    selected={filters.hookDate === "last"}
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