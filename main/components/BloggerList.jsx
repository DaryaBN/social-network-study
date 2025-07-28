import "../styles/PostsBlog.css";
import { recomm } from "../../store/recommendations";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserInfoPost } from "../../store/userInfoNumber";

const BloggersList = () => {
  const dispatch = useDispatch();
	const navigate = useNavigate();

  const user = useSelector(state => state.recommendations.recommendationsUser);
	const {status, error} = useSelector (state => state.recommendations);
  const [isSuccess, setIsSuccess] = useState({});
  const [loading, setLoading] = useState(true);
  
  let feedResult = [{}];
  const [feedStatus, setFeedStstus] = useState(feedResult)
  
  async function loadFeed(){
  const cook = await fetch('/DolphinFeed').then((data) => data.text());
  setFeedStstus(cook)
  }
  useEffect(() => {loadFeed()}, []);
  
  useEffect(() => {
    dispatch(recomm());
  },[dispatch]);

  useEffect(() => {
  if (feedStatus === "ok") {
    fetchData();
  }
}, [feedStatus]);
  const fetchData = async () => {
    try {
      const subscriptionsResponse = await fetch('/userFollowing');
      const subscriptionsData = await subscriptionsResponse.json();

      const subscriptionsMap = {};
      subscriptionsData.forEach(sub => {
          subscriptionsMap[sub.user_id] = true;
      });
      
      setIsSuccess(subscriptionsMap);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };


  function resID(id){
    if(feedStatus === "ok"){
      navigate(`/profile/:${id}`);
    }else{
      console.log('Пожалуйста, войдите в систему для просмотра профиля.')
    }
    
  }

  function subscribeId(user_id) {
    if(feedStatus === "ok"){
      setLoading(prev => ({ ...prev, [user_id]: false }));
		async function subscribe(){
			return await fetch('/subscription', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({ user_id }),
			});
		}
	  const res = subscribe();
		res.then((value) => {
			if (value.ok) {
				const answer = async () => {
					const result = await value.text();
					setIsSuccess((prevStatus) => ({
						...prevStatus,
						[user_id]: result === 'читаю',
				}));
        dispatch(UserInfoPost());
				}
				answer();
        setLoading(prev => ({ ...prev, [user_id]: true }));
			} else if (!value.ok) {
				console.log('error')
			}
		})
  } else {
    console.log('Пожалуйста, войдите в систему для подписки.')
  }
	}



  const InfoBloggers = user.map((item) => (
    <div className="blogs" key={item.id}>
      <img className="blogIMG" src={item.photo} onClick={() => resID(item.user_id)} style={{ cursor: 'pointer' }}/>
      <div className= {isSuccess[item.user_id] ? "blogRead blogReadColor" : "blogRead"} onClick={() => subscribeId(item.user_id)} style={{ cursor: 'pointer' }}>
        <div className={loading ? "" : "spinner"}>{loading ? (isSuccess[item.user_id] ? 'Читаю' : 'Читать') : ""}</div>
      </div>
      <p className="blogName" onClick={() => resID(item.user_id)} style={{ cursor: 'pointer' }}>{item.username}</p>
      <p className="blogNick" onClick={() => resID(item.user_id)} style={{ cursor: 'pointer' }}>{item.usernick}</p>
    </div>
  ));
  const InfoBloggersQuantity = [
    {id: "1"},
    {id: "2"},
    {id: "3"},
  ];
  const InfoBloggersColor = InfoBloggersQuantity.map((obj) => (
    <div  className="blogs" key={obj.id}>
      <div className="blogIMG color"></div>
      <div className="blogRead">Читать</div>
      <p className="blogName  color colorWidthNam"></p>
      <p className="blogNick color colorWidthNic"></p>
    </div>
  ));
  if (status === "loading"){
    return (
    <>
      {InfoBloggersColor}
    </>
  )} else if (status === "resolved") {
    return (
      <>
        {InfoBloggers}
      </>
  )} else if (error) {
    return (
      <>
        <h2> An error occured: {error}</h2>
      </>
    )
	}
}
export default BloggersList
