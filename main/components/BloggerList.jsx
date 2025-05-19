import "../styles/PostsBlog.css";
import { recomm } from "../../store/recommendations";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const BloggersList = () => {
  const dispatch = useDispatch();
	const navigate = useNavigate();
  const user = useSelector(state => state.recommendations.recommendationsUser);
	const {status, error} = useSelector (state => state.recommendations);
  const [isSuccess, setIsSuccess] = useState({});

  
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
				}
				answer();
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
      <div className="blogIMG" src={item.photo} onClick={() => resID(item.user_id)}></div>
      <div className={isSuccess[item.user_id] ? "blogRead blogReadColor" : "blogRead"} onClick={() => subscribeId(item.user_id)} >{isSuccess[item.user_id] ? 'Читаю' : 'Читать'}</div>
      <p className="blogName" onClick={() => resID(item.user_id)}>{item.username}</p>
      <p className="blogNick" onClick={() => resID(item.user_id)}>{item.usernick}</p>
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
