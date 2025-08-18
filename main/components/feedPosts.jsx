import "../styles/PostsBlog.css";
import "../styles/feedPosts.css";
import { useCallback, useEffect, useState } from "react";
import BloggersList from "./BloggerList.jsx";
import FeedTextPost from "./feedTextPost.jsx";
import FeedUser from "./feedUserInfo.jsx";
import FeedNewPost from "./feedWirtePost.jsx";
import OpenWirtePosts from "./feedWirtePostOpen.jsx";
import PostList from "./PostList.jsx";
import TopicalList from "./TopicalList.jsx";

const FeedPosts = () => {
	const [wirteOpen, setWirteOpen] = useState(false);
	const [wirteOpenWeb, setWirteOpenWeb] = useState(false);
	const toggleWrite = () => {
		if (!wirteOpenWeb) {
			setWirteOpenWeb(true);
		} else {
			setWirteOpenWeb(false);
		}
	};
	const closePostWindow = () => {
		setWirteOpenWeb(false);
	};

	const userName = [];
	const [name, setName] = useState(userName);
	const getUserName = useCallback(async () => {
		const resName = await fetch("/feedUser").then((data) => data.json());
		setName(resName);
	}, []);

	useEffect(() => {
		getUserName();
	}, [getUserName]);

	return (
		<>
			<div className="Indent"></div>
			<div className="Logic">
				<div className="Left">
					<div
						onClick={toggleWrite}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								toggleWrite;
							}
						}}
						style={{ cursor: "pointer" }}
					>
						{!wirteOpenWeb && <FeedTextPost NameProps={name} />}
					</div>
					{wirteOpenWeb && (
						<div className="newPostWirte">
							<FeedNewPost onClose={closePostWindow} />
						</div>
					)}
					<div className="headerFeed">
						<img src="/img/logoбелый.svg" alt="дельфин" />
					</div>
					<div className="LogicBlok1">
						<PostList />
					</div>
					<div
						className="rectangle"
						onClick={() => setWirteOpen(true)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								setWirteOpen(true);
							}
						}}
						style={{ cursor: "pointer" }}
					>
						<img src="/img/Vectorнаписать.svg" alt="перо" />
					</div>
				</div>
				<div className="Right">
					<FeedUser UserProps={name} />
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
			<OpenWirtePosts open={wirteOpen} setOpen={setWirteOpen} />
		</>
	);
};

export default FeedPosts;
