import "../styles/settingsProfile.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const MenuSettings = () => {
	const[ProfileSettings, setProfileSettings] = useState(false);
	const[ChangePassword, setPChangePassword] = useState(true);
	const[ChangeEmail, setChangeEmail] = useState(true);


	const[lineProfileSettings, setLineProfileSettings] = useState(false);
	const[lineChangePassword, setLineChangePassword] = useState(true);
	const[lineChangeEmail, setLineChangeEmail] = useState(true);


	return(
		<>
			<nav className="SettingsNavigationNAV">
				<div className="SettingsNavigation" >
					<p className="EditTitleSettings">Настройки</p>

					<NavLink to='/settings/profile' className={"SettingsBlock"} onClick={() => {setProfileSettings(false);setPChangePassword(true);setChangeEmail(true);   setLineProfileSettings(false); setLineChangePassword(true); setLineChangeEmail(true);}} >
						<div className= {lineProfileSettings ? "lineNoneSettings" : "lineBlueProfile"}></div>
						<div className= {ProfileSettings ? "colorTextSettings" : "colorBlueSettings" }>Настройки профиля</div>
					</NavLink>

					<NavLink to='/settings/password' className={"SettingsBlock"} onClick={() => {setProfileSettings(true);setPChangePassword(false);setChangeEmail(true);     setLineProfileSettings(true); setLineChangePassword(false); setLineChangeEmail(true);}}>
						<div className={lineChangePassword ? "lineNoneSettings" : "lineBlueProfile" }></div>
						<div className= {ChangePassword ? "colorTextSettings" : "colorBlueSettings" }>Сменить пароль</div>
					</NavLink>


					<NavLink to='/settings/email' className={"SettingsBlock"} onClick={() => {setProfileSettings(true);setPChangePassword(true);setChangeEmail(false);        setLineProfileSettings(true); setLineChangePassword(true); setLineChangeEmail(false);}}>
						<div className={lineChangeEmail ? "lineNoneSettings" : "lineBlueProfile"}></div>
						<div className= {ChangeEmail ? "colorTextSettings" : "colorBlueSettings" }>Сменить e-mail</div>
					</NavLink>

						<div className="colorTextSettings SettingsBlock">Конфиденциальность</div>
						
						<div className="colorTextSettings SettingsBlock">Удалить профиль</div>
				</div>
			</nav>
		</>
	)
}

export default MenuSettings