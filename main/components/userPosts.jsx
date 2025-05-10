import "../styles/PostsBlog.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { userContent } from "../../store/userPosts.js";
import { someUserContent } from "../../store/userPosts.js";
import time from '../functions/PostTime.js';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UserPosts = () => {
  const dispatch = useDispatch();
	const location = useLocation();
	const params = useParams();
  const id = params.id;

  const posts = useSelector(state => state.userPost.posts);
	const {status, error} = useSelector (state => state.userPost);
	

  useEffect(() => {
    if (location.pathname !== '/profile') {
      dispatch(someUserContent({ id }));
    } else if(location.pathname === '/profile'){
      dispatch(userContent());
    }
  }, [dispatch, location.pathname]);
	
	const PostsUser = posts.map((item) =>(
		<div className="PostListClass" key={item.id}>
		<div className="PostLogic">
			<div className="PostPoto">
				<img className ="PotoUser" src={item.photo}/>
			</div>
			<div className="PostInfo">
				<div className="InfoData">
					<div className="InfoName">
						<p className="UserName"> {item.username}</p>
						<p className="UserNick">{item.usernick}</p>
					</div>
					<p className="PostTime">{time(item.time)}</p>
				</div>
				<p className="PostText">{item.mess}
					<img className="postImg"src={item.img} /></p>
				<ul className="PostLike">
					<li>
						<img className="LikeIMG" src="/img/Vectorстрелка.svg" alt="поделиться"/>
						<p className="LikeText">21</p>
					</li>
					<li>
						<img className="LikeIMG" src="/img/Vectorнравится.svg" alt="нравиться"/>
						<p className="LikeText">23</p>
					</li>
					<li>
						<img className="LikeIMG" src="/img/Vectorскачать.svg" alt="скачать"/>
						<p className="LikeText">9</p>
					</li>
				</ul>
			</div>
		</div>
		<div className="line"></div>
	</div>
	))

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
              <img className="LikeIMG" src="/img/Vectorстрелка.svg" alt="поделиться"/>
              <p className="LikeText color colorHeight colorWidth"></p>
            </li>
            <li>
              <img className="LikeIMG" src="/img/Vectorнравится.svg" alt="нравиться"/>
              <p className="LikeText color colorHeight colorWidth"></p>
            </li>
            <li>
              <img className="LikeIMG" src="/img/Vectorскачать.svg" alt="скачать"/>
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
        {PostsUser}
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

export default UserPosts
