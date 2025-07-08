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
  const[wirteOpen, setWirteOpen] = useState(false);
  const[wirteOpenWeb, setWirteOpenWeb] = useState(false);
   const toggleWrite = () => {
    setWirteOpenWeb(prev => !prev);
  };

  const userName =[];
  const[name, setName] = useState(userName);
  async function getUserName(){
    const resName = await fetch('/feedUser').then((data) => data.json());
    setName(resName)
  };

  useEffect(() => { getUserName() }, []);
 
  return (
    <> 
      <div className="Indent"></div>
      <div className="Logic">
        <div className="Left">
          <div onClick={toggleWrite} style={{ cursor: 'pointer' }}>
            <FeedTextPost NameProps={name} />
          </div>
          {wirteOpenWeb && (
            <div className="newPostWirte">
            <FeedNewPost /> 
          </div>
          )}
          <div className="headerFeed">
            <img src="/img/logoбелый.svg" alt="дельфин"/>
          </div>
          <div className="LogicBlok1">
            <PostList />  
          </div>
          <div className="rectangle" onClick={() => setWirteOpen(true)}>
            <img src="/img/Vectorнаписать.svg" alt="перо"/>
          </div>
        </div>
        <div className="Right">
          <FeedUser UserProps={name} />
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
      <OpenWirtePosts open = {wirteOpen} setOpen = {setWirteOpen} />
    </>
  )
}

export default FeedPosts