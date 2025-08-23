import "../styles/follower.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	someUserFollowers,
	someUserFollowing,
	userFollowers,
	userFollowing,
} from "../../store/follover.js";
import { UserInfoPost } from "../../store/userInfoNumber.js";

const Subscribers = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const params = useParams();
	const id = params.id;

	const user = useSelector((state) => state.follovers.folloversUser);

	const { status, error } = useSelector((state) => state.follovers);

	const [isSuccess, setIsSuccess] = useState({});
	const [myId, setMyId] = useState(null);

	const fetchMyId = useCallback(async () => {
		const json = await fetch("/myId").then((data) => data.json());
		const jsonId = json[0].id.toString();
		setMyId(jsonId);
	}, []);
	useEffect(() => {
		fetchMyId();
	}, [fetchMyId]);

	const fetchData = useCallback(async () => {
		try {
			const subscriptionsResponse = await fetch("/userFollowing");
			const subscriptionsData = await subscriptionsResponse.json();

			const subscriptionsMap = {};
			subscriptionsData.forEach((sub) => {
				subscriptionsMap[sub.user_id] = true;
			});

			setIsSuccess(subscriptionsMap);
		} catch (error) {
			console.error("Ошибка при получении данных:", error);
		}
	}, []);

	useEffect(() => {
		fetchData();
		if (location.pathname === "/followers") {
			dispatch(userFollowers());
		} else if (location.pathname === "/following") {
			dispatch(userFollowing());
		} else if (location.pathname === `/profile/${id}/followers`) {
			dispatch(someUserFollowers({ id }));
		} else if (location.pathname === `/profile/${id}/following`) {
			dispatch(someUserFollowing({ id }));
		}
	}, [dispatch, location.pathname, id, fetchData]);

	function subscribeId(user_id) {
		async function subscribe() {
			return await fetch("/subscription", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify({ user_id }),
			});
		}
		const res = subscribe();
		res.then((value) => {
			if (value.ok) {
				const answer = async () => {
					const result = await value.text();
					setIsSuccess((prevStatus) => ({
						...prevStatus,
						[user_id]: result === "читаю",
					}));
				};
				dispatch(UserInfoPost());
				answer();
			} else if (!value.ok) {
				console.log("error");
			}
		});
	}

	function resID(idUser) {
		navigate(`/profile/:${idUser}`);
	}

	const Info = user.map((item) => (
		<div key={item.id}>
			<div className="followerLogic">
				{item.photo ? (
					<img
						className="followePhoto"
						onClick={() => resID(item.user_id)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								resID(item.user_id);
							}
						}}
						style={{ cursor: "pointer" }}
						src={item.photo}
						alt="user"
					/>
				) : (
					<button
						type="button"
						className="followePhoto"
						onClick={() => resID(item.user_id)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								resID(item.user_id);
							}
						}}
						style={{ cursor: "pointer" }}
					></button>
				)}
				<div className="folloverInfo">
					<button
						type="button"
						className="folloverName nonebutton"
						onClick={() => resID(item.user_id)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								resID(item.user_id);
							}
						}}
						style={{ cursor: "pointer" }}
					>
						{item.username}
					</button>
					<button
						type="button"
						className="folloverNick nonebutton"
						onClick={() => resID(item.user_id)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								resID(item.user_id);
							}
						}}
						style={{ cursor: "pointer" }}
					>
						{item.usernick}
					</button>
					<div className="folloverStstus">{item.info}</div>
				</div>
				{myId !== item.user_id && (
					<button
						type="button"
						className={
							isSuccess[item.user_id]
								? "folloverButtun folloverButtunColor"
								: "folloverButtun"
						}
						onClick={() => subscribeId(item.user_id)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								subscribeId(item.user_id);
							}
						}}
						style={{ cursor: "pointer" }}
					>
						{isSuccess[item.user_id] ? "Читаю" : "Читать"}
					</button>
				)}
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
				</div>
			</div>
		</div>
	));
	if (status === "loading") {
		return <>{InfoColor}</>;
	} else if (status === "resolved") {
		return (
			<>
				{Info}
				<div className="br"></div>
			</>
		);
	} else if (error) {
		return <h2> An error occured: {error}</h2>;
	}
};

export default Subscribers;
