const ChoicePill = (props) => {
    return (
        <div className={`choicePill${props.selected ? " selected" : ""}${props.edit ? " edit" : ""}`} key={props.keyProp} onClick={props.onClick} >
            <p>{props.text}</p>
        </div>
    );
}

export default ChoicePill;