import ChoicePill from "../items/ChoicePill";

const HookEditNew = (props) => {
    return (
        <div className="hookEditNew">
            <h2>{props.displayMode} Hook</h2>
            <ChoicePill text="Date" />
            <ChoicePill text="One Night Stand" />
        </div>
    );
}

export default HookEditNew;