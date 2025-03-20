import "../styles/User.css"
import { userInfo } from "../../store/profileSett.js"
import { UserInfoPost } from "../../store/userInfoNumber.js";
import { Widget } from '@uploadcare/react-widget';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink } from "react-router-dom";

const UserInfo = () => {
	const user = useSelector(state => state.info.user);
	const {status, error} = useSelector (state => state.info);
	const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userInfo());
  },[dispatch]);
 
	const userNumer = useSelector(state => state.infoNumber.informationUser);
  useEffect(() => {
    dispatch(UserInfoPost());
  },[dispatch]);

	const UserPageInfo = user.map((item) => (
		<div key={item.id}>
		<div className="poster"></div>
			<div className="UserData">
				<img className="UserDataPhoto" src={item.photo} />
				<div className="UserDataBlok">
					<div className="DataBlok">
						<div className="DataBlokNumbers">{userNumer[0].post}</div>
						<div className="DataBlokText">Сообщений</div>
					</div>
					<div className="DataBlok">
						<div className="DataBlokNumbers">28</div>
						<div className="DataBlokText">Читаемых</div>
					</div>
					<div className="DataBlok">
						<div className="DataBlokNumbers">188</div>
						<div className="DataBlokText">Читателей</div>
					</div>
						<div className="DataBlok">
							<div className="InfoButton">
							<NavLink to='/settings/profile'>Редактировать профиль</NavLink>
							</div>
						</div>
				</div>
				<div className="positionUserInfo">
					<div className="UserNameNick">
						<div className="NameUser">{item.username}</div>
						<div className="NickUser">{item.usernick}</div>
					</div>
					<div className="InfoUser">{item.info}</div>
					<div className="UserInfoElse">
						<div className={item.address ? "Else" : "Else none"}>
							<div className="ElseVector">
								<img className="VectorPlace0" src="../img/Vectorместо серый.svg"></img>
								<img className="VectorPlace1" src="../img/Vectorкруг.svg"></img>
							</div>
							<div className="ElseText">{item.address}</div>
						</div>
						<div className={item.website ? "Else" : "Else none"}>
							<div className="ElseVector">
								<img className="VectorLink0" src="img/Vectorлевй угол.svg"/>
								<img className="VectorLink1" src="img/Vectorцентр палка.svg"/>
								<img className="VectorLink2" src="img/Vectorправый угол.svg"/>
							</div>
							<div className="ElseText">{item.website}</div>
						</div>
						<div className={item.birthday ? "Else" : "Else none"}>
							<div className="ElseVector">
							<img  src="img/Vectorкалендарь.svg" width={15}/>
							</div>
							<div className="ElseText">День рождения {item.birthday}</div>
						</div>					
					</div>
					<div className="UserDataBlokMob">
						<div className="DataBlok">
							<div className="DataBlokNumbers">{userNumer[0].post}</div>
							<div className="DataBlokText">Сообщений</div>
						</div>
						<div className="DataBlok">
							<div className="DataBlokNumbers">28</div>
							<div className="DataBlokText">Читаемых</div>
						</div>
						<div className="DataBlok">
							<div className="DataBlokNumbers">188</div>
							<div className="DataBlokText">Читателей</div>
						</div>
					</div>
					<div className="InfoButtonMob">
						<NavLink to='/settings/profile'>Редактировать профиль</NavLink>
					</div>
				</div>
			</div>
		</div>
	));
	if (status === "loading"){
    return (
    <>
      <h2> loading..</h2>
    </>
  )} else if (status === "resolved") {
    return (
      <>
        {UserPageInfo}
      </>
  )} else if (error) {
    return (
      <>
        <h2> An error occured: {error}</h2>
      </>
    )
	}
}

export default UserInfo