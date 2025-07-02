import "../styles/PostsBlog.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postMyLike } from "../../store/likesPost.js";
import { resultLike } from "../../store/likesPost.js";
import { NumberLikePost } from "../../store/likesPost.js";

const PostLikes = ({ postId }) => {
  const dispatch = useDispatch();

  let id = postId.toString()
  const likesData = useSelector((state) => state.postLikes.likesData[id]);
  
  useEffect(() => {
    if(!likesData){
      let id = postId.toString()
      dispatch(NumberLikePost({ id }));
      if(location.pathname === '/feed'){
        dispatch(postMyLike({ id }));
      }
      
    }
  }, [likesData, dispatch, postId]);


 async function like() {
  if(location.pathname !==  '/'){
    let id = postId.toString()
    dispatch(resultLike({ id }));
  }else if (location.pathname === '/'){
    console.log('необходимо войти в систему')
  }
}

  return (
    <div className="LikeVecktor" onClick={() => like()}>
      <img className={likesData?.likesStatus ? "LikeIMGfilter" : "LikeIMG"} src="../img/Vectorнравится.svg" alt="нравиться"/>
      <p className="LikeText" >{likesData?.likesNumber ?? 0}</p>
    </div>
  );
};

export default PostLikes;