import Icon from "../../global/Icon";

const SettingsHeader = (props) => {
    return ( 
    <div className="header">
        <Icon type={props.icon} />
        <h3>{props.title}</h3>

    </div> 
    );
}
 
export default SettingsHeader;