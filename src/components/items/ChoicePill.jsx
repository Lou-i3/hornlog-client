const ChoicePill = (props) => {
    console.log("choice pill ", props);
    return (
        <div key={props.keyProp} className={`choicePill${props.selected ? " selected" : ""}${props.edit ? " edit" : ""}`}  onClick={props.onClick} >
            <p>{props.text}</p>
        </div>
    );
}

export default ChoicePill;