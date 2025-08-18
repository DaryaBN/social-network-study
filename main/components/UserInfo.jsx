import "../styles/User.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { someUserInfo, userInfo } from "../../store/profileSett.js";
import { someUserInfoPost, UserInfoPost } from "../../store/userInfoNumber.js";

const UserInfo = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const params = useParams();
	const id = params.id;

	const user = useSelector((state) => state.info.user);
	const { status, error } = useSelector((state) => state.info);
	const userNumer = useSelector((state) => state.infoNumber.informationUser);

	const [buttonSetting, setbuttonSetting] = useState(true);
	const [buttonRead, setbuttonRead] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const [loading, setLoading] = useState(true);

	const subscribeButtun = useCallback(async () => {
		async function subscribeButtunId() {
			return await fetch("/subscriptionNow", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify({ id }),
			});
		}
		const res = subscribeButtunId();
		res.then((value) => {
			if (value.ok) {
				const func = async () => {
					const result = await value.text();
					if (result === "читаю") {
						setIsSuccess(true);
					} else if (result === "читать") {
						setIsSuccess(false);
					}
				};
				func();
			} else if (!value.ok) {
				console.log("error");
			}
		});
	}, [id]);

	useEffect(() => {
		if (
			location.pathname === "/profile" ||
			location.pathname === "/followers" ||
			location.pathname === "/following"
		) {
			setbuttonRead(false);
			setbuttonSetting(true);
			dispatch(userInfo());
			dispatch(UserInfoPost());
		} else if (
			location.pathname !== "/profile" &&
			location.pathname !== "/followers" &&
			location.pathname !== "/following"
		) {
			setbuttonSetting(false);
			setbuttonRead(true);
			dispatch(someUserInfo({ id }));
			dispatch(someUserInfoPost({ id }));
			subscribeButtun();
		}
	}, [dispatch, location.pathname, id, subscribeButtun]);

	function subscribeId() {
		setLoading(false);
		const user_id = id.substring(1);
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
					if (result === "читаю") {
						setIsSuccess(true);
					} else if (result === "читать") {
						setIsSuccess(false);
					}
					dispatch(someUserInfoPost({ id }));
				};
				answer();
				setLoading(true);
			} else if (!value.ok) {
				console.log("error");
			}
		});
	}

	const navigate = useNavigate();

	const following = () => {
		if (
			location.pathname !== "/profile" &&
			location.pathname !== "/followers" &&
			location.pathname !== "/following"
		) {
			navigate(`/profile/${id}/following`);
		} else if (
			location.pathname === "/profile" ||
			location.pathname === "/followers" ||
			location.pathname === "/following"
		) {
			navigate("/following");
		}
	};

	const followers = () => {
		if (
			location.pathname !== "/profile" &&
			location.pathname !== "/followers" &&
			location.pathname !== "/following"
		) {
			navigate(`/profile/${id}/followers`);
		} else if (
			location.pathname === "/profile" ||
			location.pathname === "/followers" ||
			location.pathname === "/following"
		) {
			navigate("/followers");
		}
	};

	const UserPageInfo = user.map((item) => (
		<div key={item.id}>
			<div className="poster"></div>
			<div className="UserData">
				{item.photo ? (
					<img className="UserDataPhoto" src={item.photo} alt="user" />
				) : (
					<div className="UserDataPhoto"></div>
				)}
				<div className="UserDataBlok">
					<div className="UserDataBlokInf">
						<div className="DataBlok">
							<div className="DataBlokNumbers">{userNumer[0].post}</div>
							<div className="DataBlokText">Сообщений</div>
						</div>
						<div
							className="DataBlok"
							onClick={following}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									following;
								}
							}}
							style={{ cursor: "pointer" }}
						>
							<div className="DataBlokNumbers">{userNumer[0].following}</div>
							<div className="DataBlokText">Читаемых</div>
						</div>
						<div
							className="DataBlok"
							onClick={followers}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									followers;
								}
							}}
							style={{ cursor: "pointer" }}
						>
							<div className="DataBlokNumbers">{userNumer[0].follower}</div>
							<div className="DataBlokText">Читателей</div>
						</div>
					</div>
					<div className="DataBlok">
						<div
							className={buttonSetting ? "InfoButton" : "none"}
							style={{ cursor: "pointer" }}
						>
							<NavLink to="/settings/profile">Редактировать профиль</NavLink>
						</div>
						<div
							className={
								buttonRead ? (isSuccess ? "ButtonColor" : " ReadButt") : "none"
							}
							onClick={() => subscribeId()}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									subscribeId();
								}
							}}
							style={{ cursor: "pointer" }}
						>
							<div className={loading ? "" : "spinner"}>
								{loading ? (isSuccess ? "Читаю" : "Читать") : ""}
							</div>
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
								<img
									className="VectorPlace0"
									src="/img/Vectorместо серый.svg"
									alt="svg"
								></img>
								<img
									className="VectorPlace1"
									src="/img/Vectorкруг.svg"
									alt="svg"
								></img>
							</div>
							<div className="ElseText">{item.address}</div>
						</div>
						<div className={item.website ? "Else" : "Else none"}>
							<div className="ElseVector">
								<img
									className="VectorLink0"
									src="/img/Vectorлевй угол.svg"
									alt="svg"
								/>
								<img
									className="VectorLink1"
									src="/img/Vectorцентр палка.svg"
									alt="svg"
								/>
								<img
									className="VectorLink2"
									src="/img/Vectorправый угол.svg"
									alt="svg"
								/>
							</div>
							<div className="ElseText">{item.website}</div>
						</div>
						<div className={item.birthday ? "Else" : "Else none"}>
							<div className="ElseVector">
								<img
									className="VectorBirthday"
									src="/img/Vectorкалендарь.svg"
									alt="svg"
								/>
							</div>
							<div className="ElseText">День рождения {item.birthday}</div>
						</div>
					</div>
					<div className="UserDataBlokMob">
						<div className="DataBlok">
							<div className="DataBlokNumbers">{userNumer[0].post}</div>
							<div className="DataBlokText">Сообщений</div>
						</div>
						<div
							className="DataBlok"
							onClick={following}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									following;
								}
							}}
							style={{ cursor: "pointer" }}
						>
							<div className="DataBlokNumbers">{userNumer[0].following}</div>
							<div className="DataBlokText">Читаемых</div>
						</div>
						<div
							className="DataBlok"
							onClick={followers}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									followers;
								}
							}}
							style={{ cursor: "pointer" }}
						>
							<div className="DataBlokNumbers">{userNumer[0].follower}</div>
							<div className="DataBlokText">Читателей</div>
						</div>
					</div>
					<div
						className={buttonSetting ? "InfoButtonMob" : "none"}
						style={{ cursor: "pointer" }}
					>
						<NavLink to="/settings/profile">Редактировать профиль</NavLink>
					</div>
					<div
						className={
							buttonRead
								? isSuccess
									? "ButtonColorMob"
									: "InfoButtonMob"
								: "none"
						}
						onClick={() => subscribeId()}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								subscribeId();
							}
						}}
						style={{ cursor: "pointer" }}
					>
						<div className={loading ? "" : "spinner"}>
							{loading ? (isSuccess ? "Читаю" : "Читать") : ""}
						</div>
					</div>
				</div>
			</div>
		</div>
	));
	if (status === "loading") {
		return <h2> loading..</h2>;
	} else if (status === "resolved") {
		return <>{UserPageInfo}</>;
	} else if (error) {
		return <h2> An error occured: {error}</h2>;
	}
};

export default UserInfo;
