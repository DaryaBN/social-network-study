// import { useState } from 'react'
import '../styles/Menu.css'
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const[feedClick, setFeedClick] = useState(false);
  const[profileClick, setProfileClick] = useState(true);
  const[settingslick, setSettingsClick] = useState(true);
  const[lineFeed, setLineFeed] = useState(false);
  const[lineProfile, setLineProfile] = useState(true);
  const[lineSettings, setLineSettings] = useState(true);


  return(
  <>
    <div className="menuWidth">
      <nav className="menuNavigation">
        <div className="Navigation" >
          <NavLink to='/feed' className="NavigationBlok" onClick={() => {setFeedClick(false);setProfileClick(true);setSettingsClick(true);setLineFeed(false); setLineProfile(true); setLineSettings(true);}} >
            <img className='IMGnavigation' src="img/home 1лента.svg" alt="лента новостей" width="17"/>
            <div className= {feedClick ? "colorTextMenu" : "colorBlue" }>Лента </div>
            <div className= {lineFeed ? "underlineNone" : "underlineFeed"}></div>
          </NavLink>
          <NavLink to='/profile' className="NavigationBlok" onClick={() => {setFeedClick(true);setProfileClick(false);setSettingsClick(true); setLineFeed(true); setLineProfile(false); setLineSettings(true);}}>
            <img className='IMGnavigation'  src="img/user (1) 1профиль.svg"  alt="Профиль" width="19"/>
            <div className= {profileClick ? "colorTextMenu" : "colorBlue" }>Профиль</div>
            <div className={lineProfile ? "underlineNone" : "underlineProfile" }></div>
          </NavLink>
          <NavLink to='/settings/profile' className="NavigationBlok" onClick={() => {setFeedClick(true);setProfileClick(true);setSettingsClick(false);setLineFeed(true); setLineProfile(true); setLineSettings(false);}}>
            <img  className='IMGnavigation' src="img/adjust 1настроийки.svg" alt="Настройки" width="17"/>
            <div className= {settingslick ? "colorTextMenu" : "colorBlue" }>Настройки</div>
            <div className={lineSettings ? "underlineNone" : "underlineSettings"}></div>
          </NavLink>
        </div>
      </nav>
      <div className="menuLogo">
        <img src="img/logoсиний.svg" alt="логотоп"/>
      </div>
      <div className="menuUser">
        <img className ="menuUser" src="img/image 8Мия Уоллес.png" alt="пользователь"/>
      </div>
    </div>
  </>
  )
}
export default Menu