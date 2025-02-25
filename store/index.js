import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './postsSlice.js';
import infoReducer from './profileSett.js';

export default configureStore({
  reducer: {
    counter: counterReducer,
    info: infoReducer,
  },
});
