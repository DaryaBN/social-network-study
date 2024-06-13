import styles from "@/styles/Header.module.css";
import Modal from "@/modal.jsx";
import ModalNewUser from "@/modalNewUser.jsx";
import { useState } from "react";

const Header = () => {
  const [modalActive, setModalActive] = useState(false)
  const [modalNewUserActive, setModalNewUserActive] = useState(false)
  return (
    <div>
    <header>
      <div className={styles.IndexHeaderWithe}>
        <div className={styles.box}>
          <img
            className={styles.vector}
            src="/img/Vector.svg"
            alt="логотип"
          />
          <p className={styles.text}>
            Оставайся на связи с друзьями, даже когда их нет рядом
          </p>
          <button className={styles.button1IndexBox}onClick={() => setModalNewUserActive(true)}>Зарегистрироваться</button>
          <button className={styles.button2IndexBox} onClick={() => setModalActive(true)}> Войти </button>
        </div>
        <div className={styles.box}>
          <img
            className={styles.wrapped}
            src="/img/toa-heftiba-x9I-6yoXrXE-unsplash 1друзья.jpg"
            alt="логотип"
          />
        </div>
      </div>
    </header>
    <Modal active = {modalActive} setActive = {setModalActive} />
    <ModalNewUser activeNewUser = {modalNewUserActive} setActiveNewUser = {setModalNewUserActive} />
    </div>
  );
};
export default Header;