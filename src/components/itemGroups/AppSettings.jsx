import Icon from "../global/Icon";
import GendersEdit from "../items/settings/GendersEdit";
import SettingsHeader from "../items/settings/SettingsHeader";

const AppSettings = () => {
    return (
        <div className="settingsColumn">
            <SettingsHeader icon="settings" title="App Settings" />
            <button className="button inactive">
                <Icon type="save" />
                <span>Save</span>
            </button>
           
            <div className="blocksWrapper">
                <GendersEdit type="user" />
            </div>

        </div>
    );
}

export default AppSettings;