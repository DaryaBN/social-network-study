import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './postsSlice.js';
import infoReducer from './profileSett.js';
import userPostReducer from './userPosts.js';
import infoNumberReducer from './userInfoNumber.js';
import { folloversReducer } from './follover.js';
import { recommendationsReducer } from './recommendations.js';
import { hashtagReducer } from './relevant.js';
import { likesReducer } from './likesPost.js';

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
