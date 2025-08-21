import { useState } from "react";
import "../styles/modal.css";
import validationEmail from "../functions/validationEmail.js";

const Modal = ({ active, setActive }) => {
	const [state, setState] = useState({
		name: "",
		password: "",
	});

	const [textErrorName, settextErrorName] = useState(true);
	const [textErrorPassword, settextErrorPassword] = useState(true);
	const [textErrorLogin, settextErrorLogin] = useState(true);
	const [emailErrorBlok, setEmailError] = useState(true);
	const [errorColorName, setErrorColorName] = useState(true);
	const [errorColorPassword, setErrorColorPassword] = useState(true);

	const [loading, setLoading] = useState(true);

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (state.name.length === 0) {
			settextErrorName(e.target.checked);
			setErrorColorName(false);
		} else if (state.name.length !== 0) {
			setErrorColorName(true);
			settextErrorName(true);
		}
		if (validationEmail(state.name) === false) {
			setEmailError(false);
			setErrorColorName(false);
		} else if (validationEmail(state.name) === true) {
			setEmailError(true);
			setErrorColorName(true);
		}
		if (state.password.length === 0) {
			settextErrorPassword(e.target.checked);
			setErrorColorPassword(false);
		} else if (state.password.length !== 0) {
			setErrorColorPassword(true);
			settextErrorPassword(true);
		}
		if (
			state.name.length !== 0 &&
			validationEmail(state.name) === true &&
			state.password.length !== 0
		) {
			setLoading(false);
			const user = {
				email: state.name,
				password: state.password,
			};
			const response = fetch("/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(user),
			});
			const js = response;
			js.then((value) => {
				if (value.ok) {
					window.location.replace("/feed");
					setErrorColorName(true);
					setErrorColorPassword(true);
					settextErrorLogin(true);
					setLoading(true);
				} else if (!value.ok) {
					setLoading(true);
					setErrorColorName(false);
					setErrorColorPassword(false);
					settextErrorLogin(e.target.checked);
				}
			});
		}
	};
	return (
		<div
			className={active ? "modal active" : "modal"}
			onClick={() => setActive(false)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					setActive(false);
				}
			}}
		>
			<div
				className={active ? "modalContent  active" : "modalContent"}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.stopPropagation();
					}
				}}
			>
				<form onSubmit={handleSubmit}>
					<div
						className="titleClose"
						onClick={() => setActive(false)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								setActive(false);
							}
						}}
					></div>
					<div className="title">
						<h1 className="titleText">Авторизация</h1>
						<img
							className="titleIMG"
							src="/img/Vectorкрестик.svg"
							alt="закрыть"
							onClick={() => setActive(false)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									setActive(false);
								}
							}}
						/>
					</div>
					<div className="ErrorLogon">
						{textErrorLogin ? "" : "Неверно введен логин или пароль"}
					</div>
					<div className="boxError">
						{textErrorName ? "" : "Поле не заполненно"}
					</div>
					<label className={errorColorName ? "box" : "box borderError"}>
						<p className="boxText">Адрес электронной почты </p>
						<div className="boxInput">
							<input
								name="name"
								type="text"
								value={state.name}
								placeholder="@donaldjtrump"
								onChange={handleChange}
							/>
						</div>
						<div className="emailError">
							{emailErrorBlok ? "" : "Hеверный адрес"}
						</div>
					</label>
					<div className="boxError">
						{textErrorPassword ? "" : "Поле не заполненно"}
					</div>
					<label className={errorColorPassword ? "box" : "box borderError"}>
						<p className="boxText"> Пароль </p>
						<div className="boxInput">
							<input
								name="password"
								type="password"
								value={state.password}
								placeholder="Пароль"
								onChange={handleChange}
							/>
						</div>
					</label>
					<button type="submit" className="button">
						<p className={loading ? "buttonText" : "spinner"}></p>
						{loading ? "Войти" : ""}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Modal;
