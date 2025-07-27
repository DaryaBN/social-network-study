import "../styles/settingsProfile.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const MenuSettings = () => {
	
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => {
		setMobileMenuOpen(!isMobileMenuOpen);
	};

	return(
		<>
			<nav className="SettingsNavigationNAV"  >
				<div className="SettingsNavigation desktop-menu">
					<p className="EditTitleSettings">Настройки</p>
					<div className={"SettingsBlock"}>
            <NavLink to='/settings/profile'  className={({ isActive }) => isActive ? "lineBlueProfile"  : "lineNoneSettings" }></NavLink>
            <NavLink to='/settings/profile'  className={({ isActive }) => isActive ? "colorBlueSettings" : "colorTextSettings"}>Настройки профиля</NavLink>
          </div>
					<div className={"SettingsBlock"}>
            <NavLink to='/settings/password'  className={({ isActive }) => isActive ? "lineBlueProfile"  : "lineNoneSettings" }></NavLink>
            <NavLink to='/settings/password'  className={({ isActive }) => isActive ? "colorBlueSettings" : "colorTextSettings"}>Сменить пароль</NavLink>
          </div>
					<div className={"SettingsBlock"}>
            <NavLink to='/settings/email'  className={({ isActive }) => isActive ? "lineBlueProfile"  : "lineNoneSettings" }></NavLink>
            <NavLink to='/settings/email'  className={({ isActive }) => isActive ? "colorBlueSettings" : "colorTextSettings"}>Сменить e-mail</NavLink>
          </div>
					<div className="colorTextSettings SettingsBlock">Конфиденциальность</div>
					<div className="colorTextSettings SettingsBlock">Удалить профиль</div>
				</div>
				<div className="mobile-menu">
					 <button className="burger" onClick={toggleMobileMenu}>
							☰
					</button>
					{isMobileMenuOpen && (
						<div className="SettingsNavigationMob">
							<p className="EditTitleSettings">Настройки</p>
							<div className={"SettingsBlock"}>
								<NavLink to='/settings/profile'  className={({ isActive }) => isActive ? "lineBlueProfile"  : "lineNoneSettings" }></NavLink>
								<NavLink to='/settings/profile'  className={({ isActive }) => isActive ? "colorBlueSettings" : "colorTextSettings"}>Настройки профиля</NavLink>
							</div>
							<div className={"SettingsBlock"}>
								<NavLink to='/settings/password'  className={({ isActive }) => isActive ? "lineBlueProfile"  : "lineNoneSettings" }></NavLink>
								<NavLink to='/settings/password'  className={({ isActive }) => isActive ? "colorBlueSettings" : "colorTextSettings"}>Сменить пароль</NavLink>
							</div>
							<div className={"SettingsBlock"}>
								<NavLink to='/settings/email'  className={({ isActive }) => isActive ? "lineBlueProfile"  : "lineNoneSettings" }></NavLink>
								<NavLink to='/settings/email'  className={({ isActive }) => isActive ? "colorBlueSettings" : "colorTextSettings"}>Сменить e-mail</NavLink>
							</div>
							<div className="colorTextSettings SettingsBlock">Конфиденциальность</div>
							<div className="colorTextSettings SettingsBlock">Удалить профиль</div>
						</div>
					)}
				</div>
			</nav>
		</>
	)
}

export default MenuSettings