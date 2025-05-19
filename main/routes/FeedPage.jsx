import FeedPosts from '../components/feedPosts.jsx';
import Menu from "../components/feedMenu";
import { useState } from "react";
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const FeedPage = () => {
  let feedResult = [{}];
  const [feedStstus, setFeedStstus] = useState(feedResult)
  async function loadFeed(){
  const cook = await fetch('/DolphinFeed').then((data) => data.text());
  setFeedStstus(cook)
  }
  useEffect(() => {loadFeed()}, []);
  console.log(feedStstus)

  if(feedStstus == "ok"){
    return (
      <>
        <Menu />
        <FeedPosts />
      </>
    );
  } else if (feedStstus == 'error'){
    return (
      <>
      <Navigate to="/" replace />
      </>
    );
  }
};

export default FeedPage;