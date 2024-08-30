import { useState } from 'react';
import "../styles/feedWirtePostOpen.css"
import "../styles/modal.css"
import FeedNewPost from "./feedWirtePost.jsx";

const OpenWirtePosts = ({open, setOpen}) => {
	return (
		<>
			<div className={open ? "WirtePostOpen active" : "WirtePostOpen"} onClick={() => setOpen(false)}>
				<div className={open ? "PostOpenContent  active": "PostOpenContent"} onClick={e => e.stopPropagation()}>
				<div className="titleClose" onClick={() => setActive(false)}></div>
					<FeedNewPost />
				</div>
			</div>
		</>
  );
};

export default OpenWirtePosts
