import "../styles/PostsBlog.css";
import { useState } from "react";
import PostList from "./PostList.jsx";
import TopicalList from "./TopicalList.jsx";
import BloggersList from "./BloggerList.jsx";
import { useEffect } from 'react';

const PostsBlog = () => {

  const postTopical = [];
  const [topical, setTopical] = useState(postTopical);
  async function getPostsTopical() {
    const resTop = await fetch('/top').then((data) => data.json())
    setTopical(resTop)
  }

  const postBlogger = [];
  const [blogger, setBloggers] = useState(postBlogger);
  async function getPostsBloggers() {
    const resBlog = await fetch('/blog').then((data) => data.json())
    setBloggers(resBlog)
  }

  useEffect(() => { getPostsTopical(), getPostsBloggers()}, []);
 
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
            <TopicalList TopProps={topical} />
          </div>
          <div className="logicBlok2">
            <p className="postTitle">Интересные блогеры</p>
            <BloggersList BlogProps={blogger} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PostsBlog
