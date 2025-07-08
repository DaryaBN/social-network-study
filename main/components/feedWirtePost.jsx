import "../styles/feedPosts.css"
import { useState } from "react";
import { useEffect } from 'react';
import postSize from "../functions/post_size.js";
import ModalPostetd from './feedModalPosted.jsx';
import { Widget } from '@uploadcare/react-widget';
import { useSelector, useDispatch } from "react-redux";
import { NewPostContent } from "../../store/postsSlice.js";

const FeedNewPost = () => {
	const dispatch = useDispatch();
	// const {status, error} = useSelector (state => state.counter);

	const [border, setBorder] = useState("PostWriteSizeColor PostWriteSize");
	const initialNumber = 123;
  const [currentNumber, setCurrentNumber] = useState(initialNumber);
  // const [modalPosted, setModalPosted] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const handleFileUpload = (fileInfo) => {
    setImgUrl(fileInfo.cdnUrl);
  };

  const [NewPost, setNewPost] = useState({
    post: ""
  });

  // let text = [{
  //   answerText: ""
  // }];

  // const [answer, setAnswer] = useState(text);

	let sizePost = Number(postSize(NewPost.post));

  const handleChangeNewPost = (e) => {
    setNewPost({
      ...NewPost,
      [e.target.name]: e.target.value
    });
		const newNumber = initialNumber - sizePost;
		setCurrentNumber(newNumber >= 0 ? newNumber : 0);
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
		const tx = NewPost.post;
		const im = String(imgUrl);
		// setModalPosted(true)
		if(sizePost <= 123){	
			setNewPost({
			  post: ""
			});
			setBorder("PostWriteSizeColor PostWriteSize");
			setCurrentNumber(123)

			async function hashtag(textHashtag) {
  			let hashtagWords;
				let hashtagWordsText = textHashtag
					.split(' ')
					.filter((item) => item.includes('#'));
				const parts = textHashtag.split('#');
				const countHashes = parts.length - 1;
				if (countHashes !== hashtagWordsText.length) {
					const hashtagWordsParts = parts
						.map((word) => word.trim())
						.filter((word) => word.length > 0);
					hashtagWords = hashtagWordsParts.map((tag) => `#${tag}`);
				} else {
					hashtagWords = hashtagWordsText;
				}
				if (hashtagWords.length > 0) {
					try {
						const response = await fetch('/hashtagWords', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json;charset=utf-8',
							},
							body: JSON.stringify(hashtagWords),
						});

						if (!response.ok) {
							const errorText = await response.text();
							console.error('Ошибка при отправке хештегов:', errorText);
						} else {
							console.log('Хештеги успешно отправлены');
						}
					} catch (error) {
						console.error('Ошибка при выполнении fetch:', error);
					}
				}
			}

			dispatch(NewPostContent({ tx,im }));
      hashtag(tx);

			// if (status === "resolved") {
			// 	setAnswer({
			// 		answerText: "Ваш пост успешно опубликован"
			// 	})
			// } else if (status === "rejected") {
			// 	setAnswer({
			// 		answerText: {error}
			// 	})
			// } 
		} else if (sizePost > 123) {
			console.log("Недопустимое количество символов")
      // setAnswer({
      //   answerText: "Недопустимое количество символов"
      // })
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
								<div className={border}>{currentNumber}</div>
								<button type="submit" className="PostWriteSend">Отправить</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			{/* <ModalPostetd textProps = {answer} activePosted = {modalPosted} setActivePosted = {setModalPosted}/> */}
		</>
	)
}
export default FeedNewPost
