import "../styles/PostsBlog.css";
import { useState } from "react";
import { useEffect } from 'react';
import TopicalList from "./TopicalList.jsx";
import BloggersList from "./BloggerList.jsx";
import UserInfo from "./UserInfo.jsx";
import UserPosts from "./userPosts.jsx";

const User = () => {
	const postTopical = [];
	const [topical, setTopical] = useState(postTopical);
	async function getPostsTopical() {
		const resTop = await fetch('/top').then((data) => data.json());
		setTopical(resTop)
	};

	const postBlogger = [];
	const [blogger, setBloggers] = useState(postBlogger);
	async function getPostsBloggers() {
		const resBlog = await fetch('/blog').then((data) => data.json());
		setBloggers(resBlog)
	};

	useEffect(() => {getPostsTopical(), getPostsBloggers()}, []);

  return (
		<>
			<div className="Indent"></div>
			<div className="headerFeed">
         <img src="img/logoбелый.svg" alt="дельфин"/>
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
						<TopicalList TopProps={topical} />
					</div>
					<div className="logicBlok2">
						<p className="postTitle">Интересные блогеры</p>
						<BloggersList BlogProps={blogger} />
					</div>
				</div>
			</div>
		</>
  )
}
export default User