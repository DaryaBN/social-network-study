import "../styles/feedPosts.css";
import { Widget } from "@uploadcare/react-widget";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NewPostContent } from "../../store/postsSlice.js";
import { hashtagPush } from "../../store/relevant.js";
import { UserInfoPost } from "../../store/userInfoNumber.js";
import postSize from "../functions/post_size.js";

const FeedNewPost = (props) => {
	const dispatch = useDispatch();

	const [border, setBorder] = useState("PostWriteSizeColor PostWriteSize");
	const initialNumber = 123;
	const [currentNumber, setCurrentNumber] = useState(initialNumber);

	const [loading, setLoading] = useState(true);

	const [imgUrl, setImgUrl] = useState("");
	const handleFileUpload = (fileInfo) => {
		setImgUrl(fileInfo.cdnUrl);
	};

	const [NewPost, setNewPost] = useState({
		post: "",
	});

	const sizePost = Number(postSize(NewPost.post));

	const handleChangeNewPost = (e) => {
		setNewPost({
			...NewPost,
			[e.target.name]: e.target.value,
		});
		const newNumber = initialNumber - sizePost;
		setCurrentNumber(newNumber);
		if (sizePost <= 1) {
			setBorder("PostWriteSizeColor PostWriteSize");
		} else if (sizePost > 1 && sizePost <= 30) {
			setBorder("PostWriteSizeColor1 PostWriteSize");
		} else if (sizePost > 31 && sizePost <= 60) {
			setBorder("PostWriteSizeColor2 PostWriteSize");
		} else if (sizePost > 61 && sizePost <= 90) {
			setBorder("PostWriteSizeColor3 PostWriteSize");
		} else if (sizePost > 91 && sizePost <= 123) {
			setBorder("PostWriteSizeColor4 PostWriteSize");
		} else if (sizePost > 123) {
			setBorder("PostWriteSizeColorRed PostWriteSize");
		}
	};

	const handleSubmitNewPost = (e) => {
		e.preventDefault();
		const textOFpost = NewPost.post;
		const imgOFpost = String(imgUrl);
		setLoading(false);
		if (sizePost <= 123) {
			setNewPost({
				post: "",
			});
			setBorder("PostWriteSizeColor PostWriteSize");
			setCurrentNumber(123);

			async function hashtag(textHashtag) {
				let hashtagWords;
				const hashtagWordsText = textHashtag
					.split(" ")
					.filter((item) => item.includes("#"));
				const parts = textHashtag.split("#");
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
					dispatch(hashtagPush({ hashtagWords }));
				}
			}
			dispatch(NewPostContent({ textOFpost, imgOFpost })).then(() => {
				dispatch(UserInfoPost());
				if (props.onClose) {
					props.onClose();
				}
			});
			hashtag(textOFpost);
			setLoading(true);
		} else if (sizePost > 123) {
			setLoading(true);
			console.log("Недопустимое количество символов");
		}
	};

	return (
		<div className="LogicPostWrite">
			<div className="PostWriteBox">
				<form onSubmit={handleSubmitNewPost}>
					<div className="PostWriteText">
						<textarea
							name="post"
							value={NewPost.post}
							onChange={handleChangeNewPost}
						/>
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
							<button
								type="submit"
								className={`PostWriteSend ${sizePost > 123 ? "disabled" : ""}`}
								disabled={sizePost > 123}
								style={{ cursor: "pointer" }}
							>
								<p className={loading ? "PostWriteSendText" : "spinnerPost"}>
									{loading ? "Отправить" : ""}
								</p>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default FeedNewPost;
