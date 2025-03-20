import "../styles/feedPosts.css"
import { UserInfoPost } from "../../store/userInfoNumber.js";
import { Widget } from '@uploadcare/react-widget';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';

const FeedUser = ({UserProps}) =>{
	const userNumer = useSelector(state => state.infoNumber.informationUser);
	const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserInfoPost());
  },[dispatch]);

	const UserInf = UserProps.map((item) => (
		<div className="LogicUser" key={item.id}>
			<div className="UserProfile">
				<div className="UserProfilePhoto">
					<img className="ProfilePhoto" src={item.photo} />
				</div>
				<div className="UserProfileInfo">
					<p className="ProfileInfoName">{item.username}</p>
					<p className="ProfileInfoNick">{item.usernick}</p>
				</div>
			</div>
			<div className="UserProfileBox">
				<div className="BoxInfo">
					<h5>{userNumer[0].post}</h5>
					<p className="BoxInfoText">Сообщений</p>
				</div>
				<div className="BoxInfo">   
					<h5>28</h5>
					<p className="BoxInfoText">Читаемых</p>
				</div>
				<div className="BoxInfo"> 
					<h5>118</h5>
					<p className="BoxInfoText">Читателей</p>
				</div>
			</div>
		</div> 
	))

return(
	<>
	{UserInf}
	</>
)

}
export default FeedUser