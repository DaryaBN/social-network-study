import { useState } from 'react';
import './styles/modal.css';

const Modal = ({active, setActive}) => {
    const [state, setState] = useState({
        name: "",
        password: ""
    });

    // const [errorClassName, setError] = useState("boxError");
    // const [boxClassName, setbox] = useState("box");

    const [text, settext] = useState(true);
    const [text1, settext1] = useState(true);
    const [text3, settext3] = useState(true);
    const [emailErrorBlok, setEmailError] = useState(true)
    const [errorColor, setErrorColor] = useState(true);
    const [errorColor1, setErrorColor1] = useState(true);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
            if(state.name.length == 0){
                settext(e.target.checked)
                setErrorColor(false)
                // setError("boxError boxErrorActive"), 
                // setbox(" box borderError")
            } else if (state.name.length != 0){
                setErrorColor(true)
                settext(true)
            }
            if(!state.name.includes('@') && !state.name.includes('.ru' || '.com')){
                setEmailError(false)
                setErrorColor(false)
            } else if (state.name.includes('@') && state.name.includes('.ru' || '.com')){
                setEmailError(true)
                setErrorColor(true)
            }
             if(state.password.length == 0){
                settext1(e.target.checked)
                setErrorColor1(false)
                // setError("boxError boxErrorActive"),
                // setbox("box borderError")
            } else if(state.password.length != 0){
                setErrorColor1(true)
                settext1(true)
            }
            if(state.name.length != 0 && state.name.includes('@') && state.name.includes('.ru' || '.com') && state.password.length != 0) {
            const user ={
                id: +new Date(),
                user_id: +new Date(),
                email: state.name,
                password: state.password,
            }
            try {
                const response = fetch('/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                  body: JSON.stringify(user),
                });
                const js = response;
                js.then((value) => {
                  if (value.ok) {
                    window.location.replace('/Feed.html');
                    setErrorColor(true);
                    setErrorColor1(true);
                    settext3(true);
                } else if (!value.ok) {
                    setErrorColor(false);
                    setErrorColor1(false);
                    settext3(e.target.checked);
                }
                });
            } catch (error) {
                console.log('Возникла проблема с вашим fetch запросом: ', error.message);
            }
        }
    };
    
    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className={active ? "modalContent  active": "modalContent"} onClick={e => e.stopPropagation()}>
                    <form onSubmit={handleSubmit}>
                        <div className="titleClose" onClick={() => setActive(false)}></div>
                        <div className="title">
                            <h1 className="titleText">Авторизация</h1>
                            <img className="titleIMG" src="../img/Vectorкрестик.svg"  alt="закрыть" onClick={() => setActive(false)}/>
                        </div>
                        <div className= "ErrorLogon">{text3 ? '' : 'Неверно введен логин или пароль'}</div>
                        {/* <div className= {errorClassName}>Поле не заполненно</div> */}
                        <div className= "boxError">{text ? '' : 'Поле не заполненно'}</div>
                        <label className= {errorColor ? "box" : "box borderError"}>
                            <p className="boxText">Адрес электронной почты {" "}</p>
                            <div className="boxInput">
                                <input name="name" type="text" value={state.name} placeholder="@donaldjtrump" onChange={handleChange}/>
                            </div>
                            <div className= "emailError">{emailErrorBlok ? '' : 'Hеверный адрес'}</div>
                        </label>
                        {/* <div className= {errorClassName} >Поле не заполненно</div> */}
                        <div className= "boxError">{text1 ? '' : 'Поле не заполненно'}</div>
                        {/* <label className={boxClassName}> */}
                        <label className= {errorColor1 ? "box" : "box borderError"}>
                            <p className="boxText"> Пароль {" "}</p>
                            <div className="boxInput">
                                <input name="password"  type="password" value={state.password} placeholder="Пароль" onChange={handleChange}/>
                            </div>
                        </label>
                        <button type="submit" className="button">Войти</button>
                        {/* <div class="SingInTextError1">Hеверный адрес</div> */}
                        {/* <div class="SingInTextError">Поле не заполненно</div> */}
                        {/* <div class="SingInTextError1 Error1">Неверный пароль</div> */}
                    </form> 
                </div>
            </div>
        </>
    );
   
};

export default Modal