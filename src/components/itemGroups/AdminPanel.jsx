import GendersEdit from "../items/settings/GendersEdit";
import SettingsHeader from "../items/settings/SettingsHeader";
import Icon from "../global/Icon";
import AllUsers from "./allUsers";
import { Link } from "react-router-dom";

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
                <Link className="settingsBlock icons" to="/icons">
                    <div className="settingsBlockHeader icons">
                        <Icon type="icons" />
                        <h3>Icons</h3>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default AdminPanel;