import "../styles/PostsBlog.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	NewPostContent,
	newsFeed,
	postContent,
	postHashtag,
} from "../../store/postsSlice.js";
import hasht from "../functions/hashtag.jsx";
import time from "../functions/PostTime.js";
import PostLikes from "./PostLikes";

const PostList = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { hashtag } = useParams();

	const counterStatus = useSelector((state) => state.counter.status);
	const counterError = useSelector((state) => state.counter.error);
	const todos = useSelector((state) => state.counter.posts);
	const [isInitialLoading, setIsInitialLoading] = useState(true);

	const [currentTime, setCurrentTime] = useState(Date.now());
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(Date.now());
		}, 60000);
		return () => clearInterval(intervalId);
	}, []);

	function resID(id) {
		navigate(`/profile/:${id}`);
	}

	useEffect(() => {
		if (location.pathname === "/feed") {
			dispatch(newsFeed());
		} else if (location.pathname === "/") {
			dispatch(postContent());
		} else if (hashtag) {
			const hashtagResult = hashtag.substring(1);
			dispatch(postHashtag({ hashtagResult }));
		}
		dispatch(NewPostContent());
		setIsInitialLoading(false);
	}, [dispatch, location.pathname, hashtag]);

	const handleHashtagClick = (tag) => {
		navigate(`/hashtag/:${tag}`);
	};

	const Info = todos.map((item) => (
		<div className="PostListClass" key={item.id}>
			<div className="PostLogic">
				<div
					className="PostPoto"
					onClick={() => resID(item.id_user)}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							resID(item.id_user);
						}
					}}
					style={{ cursor: "pointer" }}
				>
					{item.photo ? (
						<img className="PotoUser" src={item.photo} alt="user" />
					) : (
						<div className="PotoUser"></div>
					)}
				</div>
				<div className="PostInfo">
					<div className="InfoData">
						<div
							className="InfoName"
							onClick={() => resID(item.id_user)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									resID(item.id_user);
								}
							}}
							style={{ cursor: "pointer" }}
						>
							<p className="UserName"> {item.username}</p>
							<p className="UserNick">{item.usernick}</p>
						</div>
						<p className="PostTime">{time(item.time, currentTime)}</p>
					</div>
					<p className="PostText">
						{hasht(item.mess, handleHashtagClick)}
						{item.img && <img className="postImg" src={item.img} alt="img" />}
					</p>
					<ul className="PostLike">
						<li>
							<img
								className="LikeIMG"
								src="../img/Vectorстрелка.svg"
								alt="поделиться"
							/>
							<p className="LikeText">0</p>
						</li>
						<li>
							<PostLikes postId={item.id} />
						</li>
						<li>
							<img
								className="LikeIMG"
								src="../img/Vectorскачать.svg"
								alt="скачать"
							/>
							<p className="LikeText">0</p>
						</li>
					</ul>
				</div>
			</div>
			<div className="line"></div>
		</div>
	));
	const InfoQuantity = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
	const InfoColor = InfoQuantity.map((obj) => (
		<div className="PostListClass" key={obj.id}>
			<div className="PostLogic">
				<div className="PostPoto">
					<div className="PotoUser color"></div>
				</div>
				<div className="PostInfo">
					<div className="InfoData">
						<div className="InfoName">
							<p className="UserName color colorHeight colorWidth"></p>
							<p className="UserNick color colorHeight colorWidth"></p>
						</div>
						<p className="PostTime color colorHeight"></p>
					</div>
					<p className="PostText color colorHeight2"></p>
					<ul className="PostLike">
						<li>
							<img
								className="LikeIMG"
								src="../img/Vectorстрелка.svg"
								alt="поделиться"
							/>
							<p className="LikeText color colorHeight colorWidth"></p>
						</li>
						<li>
							<img
								className="LikeIMG"
								src="../img/Vectorнравится.svg"
								alt="нравиться"
							/>
							<p className="LikeText color colorHeight colorWidth"></p>
						</li>
						<li>
							<img
								className="LikeIMG"
								src="../img/Vectorскачать.svg"
								alt="скачать"
							/>
							<p className="LikeText color colorHeight colorWidth"></p>
						</li>
					</ul>
				</div>
			</div>
			<div className="line"></div>
		</div>
	));
	if (counterStatus === "loading" && isInitialLoading) {
		return <>{InfoColor}</>;
	} else if (counterStatus === "resolved") {
		return (
			<>
				{Info}
				<div className="br"></div>
			</>
		);
	} else if (counterError) {
		return <h2> An error occured: {error}</h2>;
	}
};

export default PostList;
