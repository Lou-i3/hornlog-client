const ChoicePill = (props) => {
    return (
        <div className={`choicePill${props.selected ? " selected" : ""}${props.edit ? " edit" : ""}`} onClick={props.onClick}>
            <p>{props.text}</p>
        </div>
    );
}

export default ChoicePill;