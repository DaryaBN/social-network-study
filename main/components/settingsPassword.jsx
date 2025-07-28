import "../styles/settingsProfile.css";
import MenuSettings from "./SettingsMenu";
import PasswordComponent from "./settingsPassComponents";

const SettingsPassword = () => {
	return(
		<div className="SettingsWidth">
			<p className="SettingsTitle">Сменить пароль</p> 
			<div className="SettingsMobile-menu">
				<MenuSettings />
			</div> 
			<div className="Settingsleft">
				<PasswordComponent />
			</div>
			<div className="SettingsRight">
				<MenuSettings />
			</div>
		</div>
	)
}
export default SettingsPassword