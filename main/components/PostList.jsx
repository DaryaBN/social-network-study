import "../styles/PostsBlog.css";
import time from '../functions/PostTime.js';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { postContent } from "../../store/postsSlice.js";
import { newsFeed } from "../../store/postsSlice.js";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PostList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {status, error} = useSelector (state => state.counter);
  const todos = useSelector(state => state.counter.posts);

  function resID(id){
    navigate(`/profile/:${id}`);
  }
  useEffect(() => {
      if(location.pathname === '/feed'){
        dispatch(newsFeed());
      } else if (location.pathname !== '/feed'){
        dispatch(postContent());
      }
    }, [dispatch, location.pathname]);

  const Info = todos.map((item) => (
    <div className="PostListClass" key={item.id}>
      <div className="PostLogic">
        <div className="PostPoto" onClick={() => resID(item.id_user)}>
        <img className ="PotoUser" src={item.photo}/>
        </div>
        <div className="PostInfo">
          <div className="InfoData">
            <div className="InfoName" onClick={() => resID(item.id_user)}>
             <p className="UserName"> {item.username}</p>
             <p className="UserNick">{item.usernick}</p>
            </div>
            <p className="PostTime">{time(item.time)}</p>
          </div>
          <p className="PostText">{item.mess}
           <img className="postImg"src={item.img} /></p>
          <ul className="PostLike">
            <li>
              <img className="LikeIMG" src="../img/Vectorстрелка.svg" alt="поделиться"/>
              <p className="LikeText">21</p>
            </li>
            <li>
              <img className="LikeIMG" src="../img/Vectorнравится.svg" alt="нравиться"/>
              <p className="LikeText">23</p>
            </li>
            <li>
              <img className="LikeIMG" src="../img/Vectorскачать.svg" alt="скачать"/>
              <p className="LikeText">9</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="line"></div>
    </div>
  ));
  const InfoQuantity = [
    {id: "1"},
    {id: "2"},
    {id: "3"},
    {id: "4"},
  ];
  const InfoColor = InfoQuantity.map((obj) => (
    <div className="PostListClass" key={obj.id}>
      <div className="PostLogic">
        <div className="PostPoto">
          <div className="PotoUser color"></div>
        </div>
        <div className="PostInfo">
          <div className="InfoData">
            <div className="InfoName">
              <p className="UserName color colorHeight colorWidth"></p>
              <p className="UserNick color colorHeight colorWidth"></p>
            </div>
            <p className="PostTime color colorHeight"></p>
          </div>
          <p className="PostText color colorHeight2"></p>
          <ul className="PostLike">
            <li>
              <img className="LikeIMG" src="../img/Vectorстрелка.svg" alt="поделиться"/>
              <p className="LikeText color colorHeight colorWidth"></p>
            </li>
            <li>
              <img className="LikeIMG" src="../img/Vectorнравится.svg" alt="нравиться"/>
              <p className="LikeText color colorHeight colorWidth"></p>
            </li>
            <li>
              <img className="LikeIMG" src="../img/Vectorскачать.svg" alt="скачать"/>
              <p className="LikeText color colorHeight colorWidth"></p>
            </li>
          </ul>
        </div>
      </div>
      <div className="line"></div>
    </div>
  ));
  if (status === "loading"){
    return (
    <>
      {InfoColor}
    </>
  )} else if (status === "resolved") {
    return (
      <>
        {Info}
        <div className="br"></div>
      </>
  )} else if (error) {
    return (
      <>
        <h2> An error occured: {error}</h2>
      </>
    )
  }
}

export default PostList
