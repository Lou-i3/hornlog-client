import AdminPanel from "../itemGroups/AdminPanel";
import AppSettings from "../itemGroups/AppSettings";
import UserSettings from "../itemGroups/UserSettings";
import ReportIssue from "../items/settings/ReportIssue";


const Settings = () => {
    return (
        <div className="content-inner settings">
            <h1>Settings</h1>
            <ReportIssue />
            <div className="settingsWrapper">
                <AdminPanel />
                <UserSettings />
                <AppSettings />
            </div>
        </div>
    );
}

export default Settings;