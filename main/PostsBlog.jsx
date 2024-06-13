import "./styles/PostsBlog.css";
import { useState } from "react";
import PostList from "./PostList.jsx";
import TopicalList from "./TopicalList";
import BloggersList from "./BloggerList";
import { useEffect } from 'react';

const PostsBlog = () => {
    const postContent = [];
    const [post, setPost] = useState(postContent);
    async function getPosts() {
        const res = await fetch('/posts').then((data) => data.json());
        setPost(res);
    }
    useEffect(() => {getPosts()}, []);

    const postTopical = [];
    const [topical, setTopical] = useState(postTopical);
    async function getPostsTopical() {
        const resTop = await fetch('/top').then((data) => data.json());
        setTopical(resTop)
    }
    useEffect(() => {getPostsTopical();}, []);

    const postBlogger = [];
    const [blogger, setBloggers] = useState(postBlogger);
    async function getPostsBloggers() {
        const resBlog = await fetch('/blog').then((data) => data.json());
       setBloggers(resBlog)
    }
    useEffect(() => {getPostsBloggers()}, []);
 
    return (
        <>
            <div className="Logic">
                <h2 className="TitleMess">Последние сообщения</h2>
                <div className="LogicBlok1">
                    <PostList todosProps={post} />
                </div>
                <div className="logicBlok2">
                    <p className="postTitle">Актуальные темы</p>
                        <TopicalList todosPropsTop={topical} />
                </div>
                <div className="logicBlok2">
                    <p className="postTitle">Интересные блогеры</p>
                    <BloggersList todosPropsBlog={blogger} />
                </div>
            </div>
            <div className="gradient"></div>
        </>
    )
    
}
export default PostsBlog
