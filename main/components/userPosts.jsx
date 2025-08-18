import "../styles/PostsBlog.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { postHashtag } from "../../store/postsSlice.js";
import { someUserContent, userContent } from "../../store/userPosts.js";
import hasht from "../functions/hashtag.jsx";
import time from "../functions/PostTime.js";
import PostLikes from "./PostLikes";

const UserPosts = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const params = useParams();
	const id = params.id;
	const { hashtag } = useParams();

	const posts = useSelector((state) => state.userPost.posts);
	const { status, error } = useSelector((state) => state.userPost);

	useEffect(() => {
		if (location.pathname !== "/profile" && !hashtag) {
			dispatch(someUserContent({ id }));
		} else if (location.pathname === "/profile") {
			dispatch(userContent());
		} else if (hashtag) {
			const h = hashtag.substring(1);
			dispatch(postHashtag({ h }));
		}
	}, [dispatch, location.pathname, hashtag, id]);

	const handleHashtagClick = (tag) => {
		navigate(`/hashtag/:${tag}`);
	};

	const PostsUser = posts.map((item) => (
		<div className="PostListClass" key={item.id}>
			<div className="PostLogic">
				<div className="PostPoto">
					{item.photo ? (
						<img
							className="PotoUser" src={item.photo} alt="user"
						/>
						) : (
							<div className="PotoUser"></div>
					)}
				</div>
				<div className="PostInfo">
					<div className="InfoData">
						<div className="InfoName">
							<p className="UserName"> {item.username}</p>
							<p className="UserNick">{item.usernick}</p>
						</div>
						<p className="PostTime">{time(item.time)}</p>
					</div>
					<p className="PostText">
						{hasht(item.mess, handleHashtagClick)}
						{item.img && (
							<img className="postImg" src={item.img} alt="img" />
						)}
					</p>
					<ul className="PostLike">
						<li>
							<img
								className="LikeIMG"
								src="/img/Vectorстрелка.svg"
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
								src="/img/Vectorскачать.svg"
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
								src="/img/Vectorстрелка.svg"
								alt="поделиться"
							/>
							<p className="LikeText color colorHeight colorWidth"></p>
						</li>
						<li>
							<img
								className="LikeIMG"
								src="/img/Vectorнравится.svg"
								alt="нравиться"
							/>
							<p className="LikeText color colorHeight colorWidth"></p>
						</li>
						<li>
							<img
								className="LikeIMG"
								src="/img/Vectorскачать.svg"
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

	if (status === "loading") {
		return <>{InfoColor}</>;
	} else if (status === "resolved") {
		return (
			<>
				{PostsUser}
				<div className="br"></div>
			</>
		);
	} else if (error) {
		return <h2> An error occured: {error}</h2>;
	}
};

export default UserPosts;
