import "../styles/PostsBlog.css";
import BloggersList from "./BloggerList.jsx";
import TopicalList from "./TopicalList.jsx";
import UserInfo from "./UserInfo.jsx";
import UserPosts from "./userPosts.jsx";

const User = () => {
	return (
		<>
			<div className="Indent"></div>
			<div className="headerFeed">
				<img src="/img/logoбелый.svg" alt="дельфин" />
			</div>
			<div className="Logic">
				<div className="Left">
					<div className="LogicBlok1">
						<UserInfo />
					</div>
					<div className="brUserPage"></div>
					<div className="LogicBlok1">
						<UserPosts />
					</div>
				</div>
				<div className="Right">
					<div className="logicBlok2">
						<p className="postTitle">Актуальные темы</p>
						<TopicalList />
					</div>
					<div className="logicBlok2">
						<p className="postTitle">Интересные блогеры</p>
						<BloggersList />
					</div>
				</div>
			</div>
		</>
	);
};
export default User;
