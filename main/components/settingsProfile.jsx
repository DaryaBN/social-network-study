import "../styles/settingsProfile.css";
import MenuSettings from "./SettingsMenu";
import UserSettings from "./SettingsUser";

const Settings = () => {
	return(
		<div className="SettingsWidth">
			<p className="SettingsTitle">Редактировать профиль</p> 
			<div className="Settingsleft">
				<UserSettings />
			</div>
			<div className="SettingsRight">
				<MenuSettings />
			</div>
		</div>
	)
}
export default Settings