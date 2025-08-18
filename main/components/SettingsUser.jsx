import "../styles/SettingsUser.css";
import { Widget } from "@uploadcare/react-widget";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { correctionUserInfo, userInfo } from "../../store/profileSett.js";

const UserSettings = () => {
	const user = useSelector((state) => state.info.user);
	const { status, error } = useSelector((state) => state.info);
	const text = useSelector((state) => state.info.text);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(userInfo());
	}, [dispatch]);

	const [loading, setLoading] = useState(true);
	const [visible, setVisible] = useState(false);

	const [imgUrl, setImgUrl] = useState("");
	const handleFileUpload = (fileInfo) => {
		setImgUrl(fileInfo.cdnUrl);
	};

	const [selected, setSelected] = useState("everyone");
	const [birthday, setBirthday] = useState("");
	const [textErrorBoxNick, settextErrorBoxNick] = useState(true);
	const [errorColorNick, setErrorColorNick] = useState(true);

	const [information, setInformation] = useState({
		username: "",
		usernick: "",
		photo: "",
		info: "",
		address: "",
		website: "",
		birthday: "",
		privacy: "",
	});

	const handleChange = (e) => {
		setInformation({
			...information,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		setLoading(false);
		e.preventDefault();
		if (
			information.usernick.length > 0 &&
			!information.usernick[0].includes("@")
		) {
			settextErrorBoxNick(e.target.checked);
			setErrorColorNick(false);
		} else {
			settextErrorBoxNick(true);
			setErrorColorNick(true);
			const userData = {
				username: information.username,
				usernick: information.usernick,
				photo: String(imgUrl),
				info: information.info,
				address: information.address,
				website: information.website,
				birthday: birthday,
				privacy: selected,
			};
			const userInf = {};
			for (const key in userData) {
				if (userData[key].length > 0) {
					userInf[key] = userData[key];
				}
			}
			dispatch(correctionUserInfo(userInf));
			setLoading(true);
			setVisible(true);
			setTimeout(() => setVisible(false), 3000);
		}
	};

	const EditProfile = user.map((item) => (
		<div key={item.id}>
			<form onSubmit={handleSubmit}>
				<div className="SettingsNameNickPhoto">
					<div className="SettingsNameNick">
						<div className="EditInput">
							<p className="EditLabel">Ваше имя</p>
							<div className="EditValue">
								<input
									type="text"
									name="username"
									value={information.username}
									placeholder={item.username}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div
							className={
								errorColorNick ? "EditInput" : "EditInput EditInputError"
							}
						>
							<p className="EditLabel">Никнейм</p>
							<div className="EditValue">
								<input
									type="text"
									name="usernick"
									value={information.usernick}
									placeholder={item.usernick}
									onChange={handleChange}
								/>
							</div>
							<div className="TextNickError">
								{textErrorBoxNick ? "" : "Никнейм не валиден"}
							</div>
						</div>
					</div>
					<div className="SettingsPhoto">
						<img className="EditPhoto" src={imgUrl || item.photo} alt="user" />
						<div className="EditVektor">
							<Widget
								publicKey="af13cab7ba4d80ad78a2"
								onChange={(fileInfo) => handleFileUpload(fileInfo)}
							/>
						</div>
					</div>
				</div>
				<div className="SettingsInform">
					<div className="EditInput">
						<p className="EditLabel">О себе</p>
						<div className="EditValue">
							<input
								type="text"
								name="info"
								value={information.info}
								placeholder={item.info}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="EditInput">
						<p className="EditLabel">Геолокация</p>
						<div className="EditValue">
							<input
								type="text"
								name="address"
								value={information.address}
								placeholder={item.address}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="EditInput">
						<p className="EditLabel">Веб-сайт</p>
						<div className="EditValue">
							<input
								type="text"
								name="website"
								value={information.website}
								placeholder={item.website}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
				<div className="SettingsBirthday">
					<div className="EditInput">
						<p className="EditLabel">День рожденья</p>
						<div className="EditValue">
							<input
								type="date"
								name="birthday"
								min="1946-01-01"
								max="2023-12-31"
								defaultValue={item.birthday}
								onChange={(e) => setBirthday(e.target.value)}
							/>
						</div>
					</div>
					<div className="EditInput">
						<p className="EditLabel">Показывать дату рождения</p>
						<div className="EditValue">
							<select
								defaultValue={item.privacy}
								onChange={(e) => setSelected(e.target.value)}
							>
								<option value="everyone">Показывать всем</option>
								<option value="nobody">Показывать никому</option>
							</select>
						</div>
					</div>
				</div>
				<div className="EditButton">
					<button
						type="button"
						className="SettingsButton"
						style={{ cursor: "pointer" }}
					>
						<div className={loading ? "" : "spinner"}>
							{loading ? "Сохранить" : ""}
						</div>
					</button>
				</div>
				{visible && (
					<div
						className={`SettingsResult show ${
							text === "Данный никнейм уже используется"
								? "SettingsResultRed"
								: text === "Данные успешно изменены"
									? "SettingsResultGreen"
									: ""
						}`}
					>
						{text}
					</div>
				)}
			</form>
		</div>
	));

	if (status === "loading") {
		return <h2> loading..</h2>;
	} else if (status === "resolved") {
		return <>{EditProfile}</>;
	} else if (error) {
		return <h2> An error occured: {error}</h2>;
	}
};

export default UserSettings;
