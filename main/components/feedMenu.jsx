import '../styles/Menu.css';
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from 'react';
import MenuPhoto from './feedMenuPhoto';

const Menu = () => {
  const[feedClick, setFeedClick] = useState(true);
  console.log(feedClick)
  const[profileClick, setProfileClick] = useState(true);
  const[settingslick, setSettingsClick] = useState(true);
  const[lineFeed, setLineFeed] = useState(true);
  const[lineProfile, setLineProfile] = useState(true);
  const[lineSettings, setLineSettings] = useState(true);

  const userPhoto =[];
  const[photo, setPhoto] = useState(userPhoto);
  async function getUserPhoto(){
    const resPhoto = await fetch('/feedUser').then((data) => data.json());
    setPhoto(resPhoto)
  }
  useEffect(() => {getUserPhoto()}, []);


  return(
  <>
    <div className="menuWidth">
      <nav className="menuNavigation">
        <div className="Navigation" >
          <NavLink to='/feed' className="NavigationBlok" onClick={() => {setFeedClick(false);setLineFeed(false);}} >
            <img className='IMGnavigation' src="../img/home 1лента.svg" alt="лента новостей" width="17"/>
            <div className= {feedClick ? "colorTextMenu" : "colorBlue" }>Лента </div>
            <div className= {lineFeed ? "underlineNone" : "underlineFeed"}></div>
          </NavLink>
          <NavLink to='/profile' className="NavigationBlok" onClick={() => {setProfileClick(false);setLineProfile(false);}}>
            <img className='IMGnavigation'  src="../img/user (1) 1профиль.svg"  alt="Профиль" width="19"/>
            <div className= {profileClick ? "colorTextMenu" : "colorBlue" }>Профиль</div>
            <div className={lineProfile ? "underlineNone" : "underlineProfile" }></div>
          </NavLink>
          <NavLink to='/settings/profile' className="NavigationBlok" onClick={() => {setSettingsClick(false);setLineSettings(false);}}>
            <img  className='IMGnavigation' src="../img/adjust 1настроийки.svg" alt="Настройки" width="17"/>
            <div className= {settingslick ? "colorTextMenu" : "colorBlue" }>Настройки</div>
            <div className={lineSettings ? "underlineNone" : "underlineSettings"}></div>
          </NavLink>
        </div>
      </nav>
      <div className="menuLogo">
        <img src="../img/logoсиний.svg" alt="логотоп"/>
      </div>
      <MenuPhoto PhotoProps={photo}/>
    </div>
  </>
  )
}
export default Menu