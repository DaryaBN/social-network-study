import "../styles/PostsBlog.css";
import "../styles/feedPosts.css";
import { useState } from "react";
import { useEffect } from 'react';
import PostList from "./PostList.jsx";
import TopicalList from "./TopicalList.jsx";
import BloggersList from "./BloggerList.jsx";
import FeedTextPost from "./feedTextPost.jsx";
import FeedNewPost from "./feedWirtePost.jsx";
import FeedUser from "./feedUserInfo.jsx";
import OpenWirtePosts from "./feedWirtePostOpen.jsx";


const FeedPosts = () => {
  const[wirteOpen, setWirteOpen] = useState(false)

  const userName =[];
  const[name, setName] = useState(userName);
  async function getUserName(){
    const resName = await fetch('/feedUser').then((data) => data.json());
    setName(resName)
  }

  const postContent = [];
  const [posts, setPosts] = useState(postContent);
  async function getPosts() {
    const res = await fetch('/posts').then((data) => data.json());
    setPosts(res);
  }

  const postTopical = [];
  const [topical, setTopical] = useState(postTopical);
  async function getPostsTopical() {
    const resTop = await fetch('/top').then((data) => data.json());
    setTopical(resTop)
  }

  const postBlogger = [];
  const [blogger, setBloggers] = useState(postBlogger);
  async function getPostsBloggers() {
    const resBlog = await fetch('/blog').then((data) => data.json());
    setBloggers(resBlog)
  }

  useEffect(() => {getPosts(), getPostsTopical(), getPostsBloggers(), getUserName()}, []);
 
  return (
    <> 
      <div className="Indent"></div>
      <div className="Logic">
        <div className="Left">
          <FeedTextPost NameProps={name} />
          <div className="newPostWirte">
            <FeedNewPost /> 
          </div>
          <div className="headerFeed">
            <img src="img/logoбелый.svg" alt="дельфин"/>
          </div>
          <div className="LogicBlok1">
            <PostList PostsProps={posts} />
          </div>
          <div className="rectangle" onClick={() => setWirteOpen(true)}>
            <img src="img/Vectorнаписать.svg" alt="перо"/>
          </div>
        </div>
        <div className="Right">
          <FeedUser UserProps={name} />
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
      <OpenWirtePosts open = {wirteOpen} setOpen = {setWirteOpen} />
    </>
  )
}

export default FeedPosts