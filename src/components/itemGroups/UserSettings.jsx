import Icon from "../global/Icon";
import SettingsHeader from "../items/settings/SettingsHeader";

const UserSettings = () => {
    return (
        <div className="settingsColumn">
            <SettingsHeader icon="settings" title="User Settings" />
            <button className="button inactive">
                <Icon type="save" />
                <span>Save</span>
            </button>
            <div className="blocksWrapper">
        
            </div>
        </div>
    );
}

export default UserSettings;