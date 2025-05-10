import '../styles/Menu.css';
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from 'react';
import MenuPhoto from './feedMenuPhoto';

const Menu = () => {
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
           <div className="NavigationBlok" >
           <NavLink to='/feed'><img className='IMGnavigation newsFeed' src="/img/home 1лента.svg" alt="лента новостей" /></NavLink>
            <NavLink to='/feed'  className={({ isActive }) => isActive ? "colorBlue "  : "colorTextMenu" }>Лента</NavLink>
            <NavLink to='/feed' className={({ isActive }) => isActive ? "underlineFeed" : "underlineNone"}></NavLink>
          </div>
          <div className="NavigationBlok" >
          <NavLink to='/profile'><img className='IMGnavigation Profile'  src="/img/user (1) 1профиль.svg"  alt="Профиль" /></NavLink>
            <NavLink to='/profile' className={({ isActive }) => isActive ? "colorBlue "  : "colorTextMenu"}>Профиль</NavLink>
            <NavLink to='/profile' className={({ isActive }) => isActive ? "underlineProfile" : "underlineNone"}></NavLink>
          </div>
          <div className="NavigationBlok" >
          <NavLink to='/settings/profile'><img  className='IMGnavigation newsFeed' src="/img/adjust 1настроийки.svg" alt="Настройки"/></NavLink>
            <NavLink to='/settings/profile' className={({ isActive }) => isActive ? "colorBlue "  : "colorTextMenu"}>Настройки</NavLink>
            <NavLink to='/settings/profile' className={({ isActive }) => isActive ? "underlineSettings" : "underlineNone"}></NavLink>
          </div>
        </div>
      </nav>
      <div className="menuLogo">
        <img src="/img/logoсиний.svg" alt="логотоп"/>
      </div>
      <MenuPhoto PhotoProps={photo}/>
    </div>
  </>
  )
}
export default Menu