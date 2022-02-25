import MyHooks from "../itemGroups/myHooks";
// import Icon from "../global/Icon";
import HookDetails from "../itemGroups/HookDetails";
import Search from "../items/Search";

const Hooks = () => {
    return (
        <div className="content-inner">
            <div className="hooks-page-inner">
                <div className="left-side side">

                    <div className="hooks">
                        <h1>Hooks</h1>
                        <Search />
                        <MyHooks />
                    </div>

                </div>
                <div className="right-side side">
                    <HookDetails />
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