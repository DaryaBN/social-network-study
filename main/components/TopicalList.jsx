import "../styles/PostsBlog.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hashtagApp } from "../../store/relevant";

const TopicalList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const top = useSelector((state) => state.hashtag.hashtagTop);

	const { status, error } = useSelector((state) => state.hashtag);
	useEffect(() => {
		dispatch(hashtagApp());
	}, [dispatch]);

	function NameHashtag(hashtag) {
		const h = hashtag.substring(1);
		navigate(`/hashtag/:${h}`);
	}

	const InfoTopical = top.map((item) => (
		<div className="topic" key={item.id}>
			<h4
				className="topText"
				onClick={() => NameHashtag(item.hashtagname)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						NameHashtag(item.hashtagname);
					}
				}}
				style={{ cursor: "pointer" }}
			>
				{item.hashtagname}
			</h4>
			<p className="topNumber">{item.hashtaglot} сообщение</p>
		</div>
	));
	const InfoTopicalQuantity = [
		{ id: "1" },
		{ id: "2" },
		{ id: "3" },
		{ id: "4" },
		{ id: "5" },
	];
	const InfoTopicalColor = InfoTopicalQuantity.map((obj) => (
		<div className="topic" key={obj.id}>
			<div className="topText color colorHeight"></div>
			<p className="topNumber color colorHeight colorWidth2"></p>
		</div>
	));
	if (status === "loading") {
		return <>{InfoTopicalColor}</>;
	} else if (status === "resolved") {
		return <>{InfoTopical}</>;
	} else if (error) {
		return <h2> An error occured: {error}</h2>;
	}
};

export default TopicalList;
