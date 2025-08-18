import "../styles/SettingsUser.css";
import { useState } from "react";

const PasswordComponent = () => {
	const [pass, setPass] = useState({
		oldPassword: "",
		newPassword: "",
		newPasswordTwo: "",
	});

	const handleChange = (e) => {
		setPass({
			...pass,
			[e.target.name]: e.target.value,
		});
	};

	const [textErrorOldPass, settextErrorOldPass] = useState(true);
	const [errorColorOldPass, setErrorColorOldPass] = useState(true);
	const [textErrorNewPass, settextErrorNewPass] = useState(true);
	const [errorColorNewPass, setErrorColorNewPass] = useState(true);
	const [textNewPass, settextNewPass] = useState("");
	const [loading, setLoading] = useState(true);
	const [visible, setVisible] = useState(false);

	const handleSubmit = (e) => {
		setLoading(false);
		e.preventDefault();
		const oldPass = {
			oldPassword: pass.oldPassword,
		};
		async function resOldPas() {
			return await fetch("/settingsOldPassword", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(oldPass),
			});
		}
		const userPassword = resOldPas();
		userPassword.then((value) => {
			if (value.ok) {
				settextErrorOldPass(true);
				setErrorColorOldPass(true);
				if (pass.newPassword === pass.newPasswordTwo) {
					settextErrorNewPass(true);
					setErrorColorNewPass(true);
					const newPass = {
						newPassword: pass.newPassword,
					};
					async function resNewPass() {
						return await fetch("/settingsNewPassword", {
							method: "POST",
							headers: {
								"Content-Type": "application/json;charset=utf-8",
							},
							body: JSON.stringify(newPass),
						});
					}
					const NewPass = resNewPass();
					NewPass.then((value) => {
						if (value.ok) {
							const func = async () => {
								const result = await value.text();
								if (result === "Пароль успешно изменен") {
									settextNewPass(result);
									setErrorColorNewPass(true);
									setLoading(true);
									setVisible(true);
									setTimeout(() => setVisible(false), 3000);
								} else if (result !== "Пароль успешно изменен") {
									settextNewPass(result);
									setErrorColorNewPass(false);
									setLoading(true);
									setVisible(true);
									setTimeout(() => setVisible(false), 3000);
								}
							};
							func();
						}
					});
				} else if (pass.newPassword !== pass.newPasswordTwo) {
					settextErrorNewPass(false);
					setErrorColorNewPass(false);
					setLoading(true);
				}
			} else if (!value.ok) {
				settextErrorOldPass(false);
				setErrorColorOldPass(false);
				setLoading(true);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="SettingsInform">
				<div
					className={
						errorColorOldPass ? "EditInput" : "EditInput EditInputError"
					}
				>
					<p className="EditLabel">Старый пароль</p>
					<div className="EditValue">
						<input
							type="text"
							name="oldPassword"
							value={pass.oldPassword}
							placeholder="*******************"
							onChange={handleChange}
						/>
					</div>
					<div className="TextNickError">
						{textErrorOldPass ? "" : "Неверный пароль"}
					</div>
				</div>
				<div
					className={
						errorColorNewPass ? "EditInput" : "EditInput EditInputError"
					}
				>
					<p className="EditLabel">Новый пароль</p>
					<div className="EditValue">
						<input
							type="text"
							name="newPassword"
							value={pass.newPassword}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div
					className={
						errorColorNewPass ? "EditInput" : "EditInput EditInputError"
					}
				>
					<p className="EditLabel">Новый пароль еще раз</p>
					<div className="EditValue">
						<input
							type="text"
							name="newPasswordTwo"
							value={pass.newPasswordTwo}
							onChange={handleChange}
						/>
					</div>
					<div className="TextNickError">
						{textErrorNewPass ? "" : "Пароли не совпадают"}
					</div>
				</div>
			</div>
			<div className="EditButton">
				<button
					className="SettingsButton"
					type="button"
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
						textNewPass !== "Пароль успешно изменен"
							? "SettingsResultRed"
							: textNewPass === "Пароль успешно изменен"
								? "SettingsResultGreen"
								: ""
					}`}
				>
					{textNewPass}
				</div>
			)}
		</form>
	);
};
export default PasswordComponent;
