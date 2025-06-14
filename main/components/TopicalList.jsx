import "../styles/PostsBlog.css";
import { hashtagApp } from "../../store/relevant";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TopicalList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const top = useSelector(state => state.hashtag.hashtagTop);
	const {status, error} = useSelector (state => state.hashtag);
  useEffect(() => {
    dispatch(hashtagApp());
  },[dispatch]);

  function NameHashtag(hashtag){
    let h = hashtag.substring(1);
    navigate(`/hashtag/:${h}`);
  }

  const InfoTopical = top.map((item) => (
    <div  className="topic" key={item.id}>
      <h4 className="topText" onClick={() => NameHashtag(item.hashtagname)}>{item.hashtagname}</h4>
      <p  className="topNumber">{item.hashtaglot} сообщение</p> 
    </div>
  ))
  const InfoTopicalQuantity = [
    {id: "1"},
    {id: "2"},
    {id: "3"},
    {id: "4"},
    {id: "5"},
  ];
  const InfoTopicalColor = InfoTopicalQuantity.map((obj) => (
    <div  className="topic" key={obj.id}>
      <h4 className="topText color colorHeight"></h4>
      <p  className="topNumber color colorHeight colorWidth2"></p> 
    </div>
  ))
  if (status === "loading"){
    return (
    <>
      {InfoTopicalColor}
    </>
  )} else if (status === "resolved") {
    return (
      <>
        {InfoTopical}
      </>
  )} else if (error) {
    return (
      <>
        <h2> An error occured: {error}</h2>
      </>
    )
	}
}

export default TopicalList
