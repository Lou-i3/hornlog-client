import Icon from "../global/Icon";

const ChoicePill = (props) => {
    // console.log("choice pill ", props);
    const { keyProp, selected, edit, onClick, text, icon } = props;
    return (
        <div key={keyProp} className={`choicePill${selected ? " selected" : ""}${edit ? " edit" : ""}`}  onClick={onClick} >
            {
                icon && <Icon type={icon} />
            }
            <p>{text}</p>
        </div>
    );
}

export default ChoicePill;