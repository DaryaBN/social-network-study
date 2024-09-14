import "../styles/feedPosts.css"
import { useState } from "react";
import { useEffect } from 'react';
import postSize from "../functions/post_size.js";
import ModalPostetd from './feedModalPosted.jsx';
import { Widget } from '@uploadcare/react-widget';

const FeedNewPost = () =>{
	const [border, setBorder] = useState("PostWriteSizeColor PostWriteSize");
  const [modalPosted, setModalPosted] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const handleFileUpload = (fileInfo) => {
    setImgUrl(fileInfo.cdnUrl);
  };

  const [NewPost, setNewPost] = useState({
    post: ""
  });

  let text = [{
    answerText: ""
  }]
  const [answer, setAnswer] = useState(text)
	let sizePost = Number(postSize(NewPost.post))

  const handleChangeNewPost = (e) => {
    setNewPost({
      ...NewPost,
      [e.target.name]: e.target.value
    });
		if(sizePost <= 1) {
		setBorder("PostWriteSizeColor PostWriteSize")
		} else if(sizePost > 1 && sizePost <= 30){
		setBorder("PostWriteSizeColor1 PostWriteSize")
		}else if(sizePost > 31 && sizePost <= 60){
			setBorder("PostWriteSizeColor2 PostWriteSize")
		}else if(sizePost > 61 && sizePost <= 90){
			setBorder("PostWriteSizeColor3 PostWriteSize")
		}else if(sizePost > 91 && sizePost <= 123){
			setBorder("PostWriteSizeColor4 PostWriteSize")
		}	
  };
  const handleSubmitNewPost = (e) => {
    e.preventDefault();
	const postMes = {
		mes: NewPost.post,
    img: imgUrl
	}
  setModalPosted(true)
		if(sizePost <= 123){
			setNewPost({
			  post: ""
			});
			setBorder("PostWriteSizeColor PostWriteSize")
			try {
				const res = fetch('/posts', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					body: JSON.stringify(postMes),
				});
      setAnswer({
        answerText: "Ваш пост успешно опубликован"
      })
			} catch (error) {
        console.log('Возникла проблема с вашим fetch запросом: ', error.message);
      }
		} else {
      setAnswer({
        answerText: "Недопустимое количество символов"
      })
		}
  };

	return (
		<>
		<div className="LogicPostWrite">
			<div className ="PostWriteBox">
				<form onSubmit={handleSubmitNewPost}>
					<div className="PostWriteText">
						<textarea name="post" value={NewPost.post} onChange={handleChangeNewPost}/>
					</div>
					<div className="PostWriteButton">
						<div className="PostWriteButtonPhoto">
							<Widget
							publicKey="af13cab7ba4d80ad78a2"
							onChange={(fileInfo) => handleFileUpload(fileInfo)}
							/>
						</div>
						<div className="PostWriteButtonSend">
							<div className={border}>123</div>
							<button type="submit" className="PostWriteSend">Отправить</button>
						</div>
					</div>
				</form>
			</div>
		</div>
    <ModalPostetd textProps = {answer} activePosted = {modalPosted} setActivePosted = {setModalPosted}/>
		</>
	)

}
export default FeedNewPost