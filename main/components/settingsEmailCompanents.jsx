import "../styles/SettingsUser.css";
import { useState } from "react";
import validationEmail from '../functions/validationEmail.js';

const EmailComponent = () => {
	const [usersEmail, setEmail] = useState({
			email: "",
			password:"",
		});

		const [loading, setLoading] = useState(true);
		const [visible, setVisible] = useState(false);
	
		const handleChange = (e) => {
			setEmail({
				...usersEmail,
				[e.target.name]: e.target.value
			});
		};
	
		const [textErrorPass, settextErrorPass] = useState(true);
		const [errorColorPass, setErrorColorPass] = useState(true);
		const [textErrorValdation, settextErrorValdation] = useState(true);
		const [textErrorLenght, settextErrorLenght] = useState(true);
		const [errorColorEmail, seterrorColorEmail] = useState(true);
		const [textNewEmail, settextNewEmail] = useState('');
	
	
		const handleSubmit = (e) => {
			setLoading(false);
			if(usersEmail.email.length == 0){
				settextErrorLenght(false)
				seterrorColorEmail(false)
				setLoading(true)
			} else if (usersEmail.email.length != 0){
				settextErrorLenght(true)
				seterrorColorEmail(true)
				setLoading(true)
			}
			if(validationEmail(usersEmail.email) == false){
				settextErrorValdation(false)
				seterrorColorEmail(false)
				setLoading(true)
			} else if (validationEmail(usersEmail.email) == true){
				settextErrorValdation(true)
				seterrorColorEmail(true)
				setLoading(true)
			}
			if (usersEmail.email.length != 0 && (validationEmail(usersEmail.email) == true)){
			e.preventDefault();
			const newEmail = {
				email: usersEmail.email,
				password: usersEmail.password,
			}
			async function resEmeil(){
				return await fetch('/settingsEmail', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					body: JSON.stringify(newEmail),
				});
			}
			const res = resEmeil();
				res.then((value) => {
					if (value.ok) {
						const func = async () => {
							const result = await value.text();
							if(result === 'Email успешно изменен'){
								settextNewEmail(result);	
								seterrorColorEmail(true);
								setLoading(true);	
								setVisible(true);
								setTimeout(() => setVisible(false), 3000);						
							} else if (result !== 'Email успешно изменен'){
								settextNewEmail(result);	
								seterrorColorEmail(false);
								setLoading(true);
								setVisible(true);
								setTimeout(() => setVisible(false), 3000);
							}
						};
						func();
					} else if (!value.ok) {
						settextErrorPass(false);
						setErrorColorPass(false);
						setLoading(true);
					}
				});
			}
		}

	return(
		<>
			<form onSubmit={handleSubmit}>
				<div className="SettingsInform">
				<div className={errorColorEmail ? "EditInput" : "EditInput EditInputError"}>
						<p className="EditLabel">Новая электронная почта</p>
						<div className="EditValue">
							<input type="text" name="email" value={usersEmail.email}  onChange={handleChange} />
						</div>
						<div className= "TextNickError">{textErrorValdation ? '' : 'Адрес не валиден'}</div>
						<div className= "TextNickError">{textErrorLenght ? '' : 'Поле не заполненно'}</div>
					</div>
					<div className={errorColorPass ? "EditInput" : "EditInput EditInputError"}>
						<p className="EditLabel">Пароль для подтвеждения</p>
						<div className="EditValue"> 
							<input type="text" name="password" value={usersEmail.password} placeholder="*******************" onChange={handleChange}/>
						</div>
						<div className= "TextNickError">{textErrorPass ? '' : 'Неверный пароль'}</div>
					</div>
				</div>
				<div className="EditButton">
					<button className="SettingsButton" style={{ cursor: 'pointer' }}>
						<div className={loading ? "" : "spinner"}>{loading ? "Сохранить" : ""}</div>
					</button>
				</div>
				{visible && (
        <div className={`SettingsResult show ${
						textNewEmail !== "Email успешно изменен" ? "SettingsResultRed" : 
						textNewEmail === "Email успешно изменен" ? "SettingsResultGreen" : ""
					}`}>
          {textNewEmail}
        </div>
				)}
			</form>
		</>
	)
}
export default EmailComponent
