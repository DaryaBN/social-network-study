import "../styles/PostsBlog.css";
import PostList from "./PostList.jsx";
import TopicalList from "./TopicalList.jsx";
import BloggersList from "./BloggerList.jsx";

const PostsBlog = () => {

  return (
    <>
      <div className="Logic">
        <h2 className="TitleMess">Последние сообщения</h2>
        <div className="Left">
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
}

export default PostsBlog
