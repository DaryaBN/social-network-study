import "./styles/footer.css";
import Modal from "./modal.jsx";
import ModalNewUser from "./modalNewUser.jsx";
import { useState } from "react";

const Footer = () => {
  const [modalActive, setModalActive] = useState(false)
  const [modalNewUserActive, setModalNewUserActive] = useState(false)
  return(
    <>
      <div className="footerText">Зарегистрируйтесь и узнайте обо всём первым
        <div className="footerButton">
          <button className="footerButton1"onClick={() => setModalNewUserActive(true)}>Зарегистрироваться</button>
          <button className="footerButton2" onClick={() => setModalActive(true)}> Войти </button>
        </div>
      </div>
      <Modal active = {modalActive} setActive = {setModalActive} />
      <ModalNewUser activeNewUser = {modalNewUserActive} setActiveNewUser = {setModalNewUserActive} />
    </>
  )
}

export default Footer;