import MyHooks from "./myHooks";

const Hooks = () => {
    return (
        <div>
            <h1>Hooks</h1>
            <div>
                <input placeholder="Search"></input>
            </div>
            <div className="filter">
                <p>Filters</p>
                <p>Grade</p>
                <p>Duration</p>
            </div>
            <MyHooks />
        </div>
    );
}

export default Hooks;