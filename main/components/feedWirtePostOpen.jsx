import { useState } from 'react';
import "../styles/feedWirtePostOpen.css"
import "../styles/modal.css"
import FeedNewPost from "./feedWirtePost.jsx";

const OpenWirtePosts = ({open, setOpen}) => {
	 const closePostWindowPhone = () => {
    setOpen(false);
  };
	return (
		<>
			<div className={open ? "WirtePostOpen active" : "WirtePostOpen"} onClick={() => setOpen(false)} style={{ cursor: 'pointer' }}>
				<div className={open ? "PostOpenContent  active": "PostOpenContent"} onClick={e => e.stopPropagation()} style={{ cursor: 'pointer' }}>
				<div className="titleClose" onClick={() => setActive(false)} style={{ cursor: 'pointer' }}></div>
					<FeedNewPost onClose={closePostWindowPhone}/>
				</div>
			</div>
		</>
  );
};

export default OpenWirtePosts
