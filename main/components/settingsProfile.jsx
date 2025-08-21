import "../styles/settingsProfile.css";
import MenuSettings from "./SettingsMenu";
import UserSettings from "./SettingsUser";

const Settings = () => {
	return (
		<>
			<div className="SettingsWidth">
				<p className="SettingsTitle">Редактировать профиль</p>
				<div className="SettingsMobile-menu">
					<MenuSettings />
				</div>
				<div className="Settingsleft">
					<UserSettings />
				</div>
				<div className="SettingsRight">
					<MenuSettings />
				</div>
			</div>
			<div className="brSett"></div>
		</>
	);
};
export default Settings;
