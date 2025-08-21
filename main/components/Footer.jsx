import "../styles/footer.css";
import { useState } from "react";
import Modal from "./modal.jsx";
import ModalNewUser from "./modalNewUser.jsx";

const Footer = () => {
	const [modalActive, setModalActive] = useState(false);
	const [modalNewUserActive, setModalNewUserActive] = useState(false);
	return (
		<>
			<div className="footerText">
				Зарегистрируйтесь и узнайте обо всём первым
				<div className="footerButton">
					<button
						type="button"
						className="footerButton1"
						onClick={() => setModalNewUserActive(true)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								setModalNewUserActive(true);
							}
						}}
					>
						Зарегистрироваться
					</button>
					<button
						type="button"
						className="footerButton2"
						onClick={() => setModalActive(true)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								setModalActive(true);
							}
						}}
					>
						Войти
					</button>
				</div>
			</div>
			<Modal active={modalActive} setActive={setModalActive} />
			<ModalNewUser
				activeNewUser={modalNewUserActive}
				setActiveNewUser={setModalNewUserActive}
			/>
		</>
	);
};

export default Footer;
