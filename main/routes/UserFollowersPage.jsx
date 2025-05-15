import Folover from "../components/followerPage.jsx";
import Menu from "../components/feedMenu";
import Home from './HomePage.jsx';
import { useState } from "react";
import { useEffect } from 'react';

const UserFollowersPage = ()=> {
  let feedResult = [{}];
  const [feedStstus, setFeedStstus] = useState(feedResult)
  async function loadFeed(){
  const cook = await fetch('/DolphinFeed').then((data) => data.text());
  setFeedStstus(cook)
  }
  
  useEffect(() => {loadFeed()}, []);

  if(feedStstus == "ok"){
    return (
      <>
        <Menu />
        <Folover />
      </>
    );
  } else if (feedStstus == 'error'){
    return (
      <>
        <Home />
      </>
    );
  }
};
  
export default UserFollowersPage;