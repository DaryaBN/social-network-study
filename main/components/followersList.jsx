import "../styles/follower.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { userFollowers } from "../../store/follover.js";
import { userFollowing } from "../../store/follover.js";
import { someUserFollowers } from "../../store/follover.js";
import { someUserFollowing } from "../../store/follover.js";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Subscribers = () =>{
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const params = useParams();
  const id = params.id;

	const user = useSelector(state => state.follovers.folloversUser);

	const {status, error} = useSelector (state => state.follovers);

	const [isSuccess, setIsSuccess] = useState({});

  
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

	// fetchData();
 
	useEffect(() => {
		fetchData();
		if(location.pathname === '/followers'){
			dispatch(userFollowers());	
		} else if(location.pathname === '/following'){
			dispatch(userFollowing());
		} else if (location.pathname === `/profile/${id}/followers` ){
			dispatch(someUserFollowers({ id }))
		}else if(location.pathname === `/profile/${id}/following`){
			dispatch(someUserFollowing({ id }))
		}
	 }, [dispatch, location.pathname]);
 
	function subscribeId(user_id) {
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
	}

	function resID(idUser){
    navigate(`/profile/:${idUser}`);
  }


  const Info = user.map((item) => (
		<div  key={item.id}>
		<div className="followerLogic">
			<div className="followePhoto" onClick={() => resID(item.user_id)} src={item.photo}></div>
			<div className="folloverInfo">
				<div className="folloverName" onClick={() => resID(item.user_id)}>{item.username}</div>
				<div className="folloverNick" onClick={() => resID(item.user_id)}>{item.usernick}</div>
				<div className="folloverStstus">{item.info}</div>
			</div>
			<div className={isSuccess[item.user_id] ? "folloverButtun folloverButtunColor" : "folloverButtun"} onClick={() => subscribeId(item.user_id)}>{isSuccess[item.user_id] ? 'Читаю' : 'Читать'}</div>
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
        </div>
      </div>
    </div>
  ));
  if (status === "loading"){
    return (
    <>
      {InfoColor}
    </>
  )} else if (status === "resolved") {
    return (
      <>
        {Info}
        <div className="br"></div>
      </>
  )} else if (error) {
    return (
      <>
        <h2> An error occured: {error}</h2>
      </>
    )
  }
}

export default Subscribers
