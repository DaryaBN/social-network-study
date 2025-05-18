import Settings from "../components/settingsProfile";
import Menu from "../components/feedMenu";
import { useState } from "react";
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function ProfileSettingsPage() {

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
        <Settings />
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

export default ProfileSettingsPage;