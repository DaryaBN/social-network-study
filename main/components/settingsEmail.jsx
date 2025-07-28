import "../styles/settingsProfile.css";
import MenuSettings from "./SettingsMenu";
import EmailComponent from "./settingsEmailCompanents";

const SettingsEmail = () => {
	return(
		<div className="SettingsWidth">
			<p className="SettingsTitle">Сменить e-mail</p>
			<div className="SettingsMobile-menu">
				<MenuSettings />
			</div>  
			<div className="Settingsleft">
				<EmailComponent />
			</div>
			<div className="SettingsRight">
				<MenuSettings />
			</div>
		</div>
	)
}
export default SettingsEmail