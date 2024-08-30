import "../styles/feedPosts.css"
const FeedUser = ({UserProps}) =>{
	const UserInf = UserProps.map((item) => (
		<div className="LogicUser" key={item.id}>
			<div className="UserProfile">
				<div className="UserProfilePhoto">
					<img className="ProfilePhoto" src="img/image 8Мия Уоллес.png" alt="пользователь" width="80"/>
				</div>
				<div className="UserProfileInfo">
					<p className="ProfileInfoName">{item.username}</p>
					<p className="ProfileInfoNick">{item.usernick}</p>
				</div>
			</div>
			<div className="UserProfileBox">
				<div className="BoxInfo">
					<h5>45K</h5>
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