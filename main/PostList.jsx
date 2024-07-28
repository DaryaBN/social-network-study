import "./styles/PostsBlog.css";
import time from './functions/PostTime.js'

const PostList = ({ PostsProps }) => {
  const Info = PostsProps.map((item) => (
    <div className="PostListClass" key={item.id}>
      <div className="PostLogic">
        <div className="PostPoto">
          <div className="PotoUser"></div>
        </div>
        <div className="PostInfo">
          <div className="InfoData">
            <div className="InfoName">
              <p className="UserName"> {item.name}</p>
              <p className="UserNick">{item.nick}</p>
            </div>
            <p className="PostTime">{time(item.time)}</p>
          </div>
          <p className="PostText">{item.mes}</p>
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
  if (PostsProps.length == 0){
    return (
    <>
      {InfoColor}
    </>
  )} else {
    return (
      <>
        {Info}
      </>
    )
  }
}

export default PostList
