import "../styles/PostsBlog.css";
import TopicalList from "./TopicalList.jsx";
import BloggersList from "./BloggerList.jsx";
import PostList from "./PostList.jsx";
import { useParams } from 'react-router-dom';


const HashtagsPage = () =>{
	const { hashtag } = useParams();
	let titleHashtag = hashtag.substring(1)

  return (
		<>
			<div className="Indent"></div>
			<div className="headerFeed">
         <img src="/img/logoбелый.svg" alt="дельфин"/>
      </div>
			<div className="Logic">
				<div className="Left">
					<p className="folloverTitle">#{titleHashtag}</p> 
					<div className="LogicBlok1">
            <PostList />
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

export default HashtagsPage