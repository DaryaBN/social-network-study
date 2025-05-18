import "../styles/PostsBlog.css";
import { useState } from "react";
import { useEffect } from 'react';
import TopicalList from "./TopicalList.jsx";
import BloggersList from "./BloggerList.jsx";
import UserInfo from "./UserInfo.jsx";
import Subscribers from "./followersList.jsx";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Folover = () =>{
	const location = useLocation();
	const params = useParams();
	const id = params.id;

	const [folloverText, setFolloverText] = useState(true)

	useEffect(() => {
		if (location.pathname === '/followers' || location.pathname === `/profile/${id}/followers`) {
				setFolloverText(true);
		} else if (location.pathname === '/following' || location.pathname === `/profile/${id}/following`) {
				setFolloverText(false);
		}
}, [location.pathname, id]);

  return (
		<>
			<div className="Indent"></div>
			<div className="headerFeed">
         <img src="/img/logoбелый.svg" alt="дельфин"/>
      </div>
			<div className="Logic">
				<div className="Left">
					<div className="LogicBlok1">
            <UserInfo />
          </div>
					<div className="brUserPage"></div>
					<div className="LogicBlok1">
					<p className="folloverTitle">{folloverText ? 'Подписчики' : 'Подписки'}</p> 
            <Subscribers />
          </div>
				</div>
				<div className="Right">
					<div className="logicBlok2">
						<p className="postTitle">Актуальные темы</p>
						<TopicalList />
					</div>
					<div className="logicBlok2">
						<p className="postTitle">Интересные блогеры</p>
						<BloggersList />
					</div>
				</div>
			</div>
		</>
  )
};

export default Folover
