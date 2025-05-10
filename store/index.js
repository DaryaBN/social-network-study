import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './postsSlice.js';
import infoReducer from './profileSett.js';
import userPostReducer from './userPosts.js';
import infoNumberReducer from './userInfoNumber.js';
import { folloversReducer } from './follover.js';

export default configureStore({
  reducer: {
    counter: counterReducer,
    info: infoReducer,
    userPost: userPostReducer,
    infoNumber: infoNumberReducer,
    follovers: folloversReducer,
  },
});
