import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './postsSlice.js';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
