import { useState } from 'react';
import '../styles/modal.css';
import validationEmail from '../functions/validationEmail.js';

const ModalNewUser = ({activeNewUser, setActiveNewUser}) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    passworConfirmation: ""
  });

  const [textErrorBoxName, settextErrorBoxName] = useState(true);
  const [textErrorBoxEmail, settextErrorBoxEmail] = useState(true);
  const [textErrorBoxPassword, settextErrorBoxPassword] = useState(true);
  const [textErrorBoxPassworConfirmation, settextErrorBoxPassworConfirmation] = useState(true);
  const [textErrorLogon, settextErrorLogon] = useState(true);
  const [errorColorName, setErrorColorName] = useState(true);
  const [errorColorEmail, setErrorColorEmail] = useState(true);
  const [errorColorPassword, setErrorColorPassword] = useState(true);
  const [errorColorPassworConfirmation, setErrorColorPassworConfirmation] = useState(true);
  const [passwordError, setpasswordError] = useState(true)
  const [emailErrorBlok, setEmailError] = useState(true)
  const [nameErrorBlok, setNameError] = useState(true)

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(state.name.length == 0){
      settextErrorBoxName(e.target.checked)
      setErrorColorName(false)
    } else if (!state.name[0].includes('@')){
      setNameError(e.target.checked)
      setErrorColorName(false)
    } else if (state.name.length != 0 && (state.name[0].includes('@'))){
      settextErrorBoxName(true)
      setNameError(true)
      setErrorColorName(true)
    }
    if(state.email.length == 0){
      settextErrorBoxEmail(e.target.checked)
      setErrorColorEmail(false)
    } else if (state.email.length != 0){
      settextErrorBoxEmail(true)
      setErrorColorEmail(true)
    }
    if(state.password.length == 0){
      settextErrorBoxPassword(e.target.checked)
      setErrorColorPassword(false)
    } else if (state.password.length != 0){
      settextErrorBoxPassword(true)
      setErrorColorPassword(true)
    }
    if(state.passworConfirmation.length == 0){
      settextErrorBoxPassworConfirmation(e.target.checked)
      setErrorColorPassworConfirmation(false)
    } else if (state.passworConfirmation.length != 0){
      settextErrorBoxPassworConfirmation(true)
      setErrorColorPassworConfirmation(true)
    }
    if(state.password !== state.passworConfirmation){
      setpasswordError(false)
      setErrorColorPassword(false)
      setErrorColorPassworConfirmation(false)
    } else if(state.password === state.passworConfirmation){
      setpasswordError(true)
      setErrorColorPassword(true)
      setErrorColorPassworConfirmation(true)
    }
    if(validationEmail(state.email) == false){
      setEmailError(false)
      setErrorColorEmail(false)
    } else if (validationEmail(state.email) == true){
      setEmailError(true)
      setErrorColorEmail(true)
    }
    if (state.name.length != 0 
      && state.email.length != 0 
      && state.password.length != 0 
      && state.passworConfirmation.length != 0 
      && state.password === state.passworConfirmation
      && (validationEmail(state.email) == true)
    ){
      const user = {
        username: state.name,
        email: state.email,
        password: state.password,
      }
      const res = fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      });
      const us = res;
      us.then((value) => {
        if (value.ok) {
          window.location.replace('/feed');
          setErrorColorEmail(true);
          settextErrorLogon(true);
        } else if (!value.ok) {
          setErrorColorEmail(false);
          settextErrorLogon(e.target.checked);
        }
      });
    }
  };

  return (
    <>
      <div className={activeNewUser ? "modal active" : "modal"} onClick={() => setActiveNewUser(false)}>
        <div className={activeNewUser ? "modalContent  active": "modalContent"} onClick={e => e.stopPropagation()}>
          <form onSubmit={handleSubmit}>
            <div className="titleClose" onClick={() => setActiveNewUser(false)}></div>
            <div className="title">
              <h1 className="titleText">Регистрация</h1>
              <img className="titleIMG" src="../img/Vectorкрестик.svg"  alt="закрыть" onClick={() => setActiveNewUser(false)}/>
            </div>
            <div className= "ErrorLogon">{textErrorLogon ? '' : 'Этот адрес электронной почты уже используется'}</div>
            <div className= "boxError">{textErrorBoxName ? '' : 'Поле не заполненно'}</div>
            <label className= {errorColorName ? "box" : "box borderError"}>
              <p className="boxText">Выберите никнейм {" "}</p>
              <div className="boxInput">
                <input name="name" type="text" value={state.name} placeholder="@donaldjtrump" onChange={handleChange}/>
              </div>
              <div className= "emailError">{nameErrorBlok ? '' : 'Никнейм не валиден'}</div>
            </label>
            <div className= "boxError">{textErrorBoxEmail ? '' : 'Поле не заполненно'}</div>
            <label className= {errorColorEmail ? "box" : "box borderError"}>
              <p className="boxText">Электронная почта {" "}</p>
              <div className="boxInput">
                <input name="email" type="text" value={state.email} placeholder="@donaldjtrump" onChange={handleChange}/>
              </div>
              <div className= "emailError">{emailErrorBlok ? '' : 'Адрес не валиден'}</div>
            </label>
            <div className= "boxError">{textErrorBoxPassword ? '' : 'Поле не заполненно'}</div>
            <label className= {errorColorPassword ? "box" : "box borderError"}>
              <p className="boxText"> Пароль {" "}</p>
              <div className="boxInput">
                <input name="password"  type="password" value={state.password} placeholder="Пароль" onChange={handleChange}/>
              </div>
            </label>
            <div className= "boxError">{textErrorBoxPassworConfirmation ? '' : 'Поле не заполненно'}</div>
            <label className= {errorColorPassworConfirmation ? "box" : "box borderError"}>
              <p className="boxText"> Подтверждение пароля {" "}</p>
              <div className="boxInput">
                <input name="passworConfirmation"  type="password" value={state.passworConfirmation} placeholder="Подтверждение пароля" onChange={handleChange}/>
              </div>
              <div className= "emailError">{passwordError ? '' : 'К сожалению, пароли не совпадают'}</div>
            </label>
            <button type="submit" className="button">Зарегистрироваться</button>
          </form> 
        </div>
      </div>
    </>
  ); 
};

export default ModalNewUser