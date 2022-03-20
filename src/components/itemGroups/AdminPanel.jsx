import GendersEdit from "../items/settings/GendersEdit";
import SettingsHeader from "../items/settings/SettingsHeader";
import Icon from "../global/Icon";
import AllUsers from "./allUsers";

const AdminPanel = () => {
    return ( 
    <div className="settingsColumn">
        <SettingsHeader icon="settings" title="Admin Panel" />
        <button className="button inactive">
                <Icon type="save" />
                <span>Save</span>
            </button>
        <div className="blocksWrapper">
            <GendersEdit type="app" />
            <AllUsers />
        </div>
    </div> 
    );
}
 
export default AdminPanel;