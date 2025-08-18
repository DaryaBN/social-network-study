import { configureStore } from "@reduxjs/toolkit";
import { folloversReducer } from "./follover.js";
import { likesReducer } from "./likesPost.js";
import counterReducer from "./postsSlice.js";
import infoReducer from "./profileSett.js";
import { recommendationsReducer } from "./recommendations.js";
import { hashtagReducer } from "./relevant.js";
import infoNumberReducer from "./userInfoNumber.js";
import userPostReducer from "./userPosts.js";

export default configureStore({
	reducer: {
		counter: counterReducer,
		info: infoReducer,
		userPost: userPostReducer,
		infoNumber: infoNumberReducer,
		follovers: folloversReducer,
		recommendations: recommendationsReducer,
		hashtag: hashtagReducer,
		postLikes: likesReducer,
	},
});
