import { useState } from 'react';
import './styles/modal.css';

const ModalNewUser = ({activeNewUser, setActiveNewUser}) => {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        passworConfirmation: ""
    });
    const [textErrorBox, settextErrorBox] = useState(true);
    const [textErrorBox1, settextErrorBox1] = useState(true);
    const [textErrorBox2, settextErrorBox2] = useState(true);
    const [textErrorBox3, settextErrorBox3] = useState(true);
    const [textErrorLogon, settextErrorLogon] = useState(true);
    const [errorColor, setErrorColor] = useState(true);
    const [errorColor1, setErrorColor1] = useState(true);
    const [errorColor2, setErrorColor2] = useState(true);
    const [errorColor3, setErrorColor3] = useState(true);
    const [passwordError, setpasswordError] = useState(true)
    const [emailErrorBlok, setEmailError] = useState(true)


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
            if(state.name.length == 0){
                settextErrorBox(e.target.checked)
                setErrorColor(false)
            } else if (state.name.length != 0){
                settextErrorBox(true)
                setErrorColor(true)
            }
            if(state.email.length == 0){
                settextErrorBox1(e.target.checked)
                setErrorColor1(false)
            } else if (state.email.length != 0){
                settextErrorBox1(true)
                setErrorColor1(true)
            }
            if(state.password.length == 0){
                settextErrorBox2(e.target.checked)
                setErrorColor2(false)
            } else if (state.password.length != 0){
                settextErrorBox2(true)
                setErrorColor2(true)
            }
            if(state.passworConfirmation.length == 0){
                settextErrorBox3(e.target.checked)
                setErrorColor3(false)
            } else if (state.passworConfirmation.length != 0){
                settextErrorBox3(true)
                setErrorColor3(true)
            }
            if(state.password !== state.passworConfirmation){
                setpasswordError(false)
                setErrorColor2(false)
                setErrorColor3(false)
            } else if(state.password === state.passworConfirmation){
                setpasswordError(true)
                setErrorColor2(true)
                setErrorColor3(true)
            }
            if(!state.email.includes('@') && !state.email.includes('.ru' || '.com')){
                setEmailError(false)
                setErrorColor1(false)
            } else if (state.email.includes('@') && state.email.includes('.ru' || '.com')){
                setEmailError(true)
                setErrorColor1(true)
            }
            if (state.name.length != 0 
                && state.email.length != 0 
                && state.password.length != 0 
                && state.passworConfirmation.length != 0 
                && state.password === state.passworConfirmation
                && state.email.includes('@') && state.email.includes('.ru' || '.com'))
                {
                const user = {
                id: +new Date() ,
                id_user: +new Date(),
                username: state.name,
                email: state.email,
                password: state.password,
            }
            try {
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
                          window.location.replace('/Feed.html');
                          setErrorColor1(true);
                          settextErrorLogon(true);
                        } else if (!value.ok) {
                            setErrorColor1(false);
                            settextErrorLogon(e.target.checked);
                        //   alert('Этот адрес электронной почты уже используется');
                        }
                      });
                    } catch (error) {
                      console.log('Возникла проблема с вашим fetch запросом: ', error.message);
                    }
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
                        <div className= "boxError">{textErrorBox ? '' : 'Поле не заполненно'}</div>
                        <label className= {errorColor ? "box" : "box borderError"}>
                            <p className="boxText">Выберите никнейм {" "}</p>
                            <div className="boxInput">
                                <input name="name" type="text" value={state.name} placeholder="@donaldjtrump" onChange={handleChange}/>
                            </div>
                        </label>
                        <div className= "boxError">{textErrorBox1 ? '' : 'Поле не заполненно'}</div>
                        <label className= {errorColor1 ? "box" : "box borderError"}>
                            <p className="boxText">Электронная почта {" "}</p>
                            <div className="boxInput">
                                <input name="email" type="text" value={state.email} placeholder="@donaldjtrump" onChange={handleChange}/>
                            </div>
                            <div className= "emailError">{emailErrorBlok ? '' : 'Адрес не валиден'}</div>
                        </label>
                        <div className= "boxError">{textErrorBox2 ? '' : 'Поле не заполненно'}</div>
                        <label className= {errorColor2 ? "box" : "box borderError"}>
                            <p className="boxText"> Пароль {" "}</p>
                            <div className="boxInput">
                                <input name="password"  type="password" value={state.password} placeholder="Пароль" onChange={handleChange}/>
                            </div>
                        </label>
                        <div className= "boxError">{textErrorBox3 ? '' : 'Поле не заполненно'}</div>
                        <label className= {errorColor3 ? "box" : "box borderError"}>
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