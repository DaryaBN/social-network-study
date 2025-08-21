import "../styles/HeaderModule.css";
import { useState } from "react";
import Modal from "./modal.jsx";
import ModalNewUser from "./modalNewUser.jsx";

const Header = () => {
	const [modalActive, setModalActive] = useState(false);
	const [modalNewUserActive, setModalNewUserActive] = useState(false);
	return (
		<div>
			<header>
				<div className="IndexHeaderWithe">
					<div className="boxHeaderWithe">
						<img className="vector" src="/img/Vector.svg" alt="логотип" />
						<p className="text">
							Оставайся на связи с друзьями, даже когда их нет рядом
						</p>
						<button
							type="button"
							className="button1IndexBox"
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
							className="button2IndexBox"
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
					<div className="boxHeaderWithe">
						<img
							className="wrapped"
							src="/img/toa-heftiba-x9I-6yoXrXE-unsplash 1друзья.jpg"
							alt="логотип"
						/>
					</div>
				</div>
			</header>
			<Modal active={modalActive} setActive={setModalActive} />
			<ModalNewUser
				activeNewUser={modalNewUserActive}
				setActiveNewUser={setModalNewUserActive}
			/>
		</div>
	);
};
export default Header;
