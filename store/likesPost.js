import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postMyLike = createAsyncThunk(
  'postLikes/postMyLike',
  async function (_, { rejectWithValue }) {
    try {
      let response = await fetch('/myLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ idPost: id }),
      });
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.text();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const resultLike = createAsyncThunk(
  'postLikes/resultLike',
  async function ({ id },{ rejectWithValue }) {
    try {
      let response = await fetch('/deleteANDputLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ idPost: id }),
      });
      if (response.ok) {
        const data = await response.text();
        return data;
      } else if (!response.ok){
        throw new Error('Can add task. Server error.');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const NumberLikePost = createAsyncThunk(
  'postLikes/NumberLikePost',
  async function ({ id },{ rejectWithValue }) {
    try {
      let response = await fetch('/LikePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ idPost: id }),
      });
      if (response.ok) {
        const data = await response.json();
        return data[0];
      } else if (!response.ok){
        throw new Error('Can add task. Server error.');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const LikesSlice = createSlice({
  name: 'postLikes',
  initialState: {
    likesNumer: 0,   //колличесвко лайков
    likesStatus: false,  //стоит ли лайк
    status: null,
    error: null,
  },
  reducers: {
    setLikes(state, action) {
      state.likesNumer = action.payload;
    },
    setIsLiked(state, action) {
      state.likesStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postMyLike.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(postMyLike.fulfilled, (state, action) => {
      state.status = 'resolved';
      if (action.likesStatus === 'yes') {
          state.isLiked = true;
        } else if (action.payload === 'no') {
          state.likesStatus = false;
        }
    });
    builder.addCase(resultLike.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(resultLike.fulfilled, async (state, action) => {
      state.status = 'resolved';
        if (action.payload === 'yes') {
          state.likesStatus = true;
        } else if (action.payload === 'no') {
          state.likesStatus = false;
        }
        const response = await fetch('/LikePost', { method: 'POST', body: JSON.stringify({ idPost }) });
        const countData = await response.json();
        state.likesNumer = countData[0];
    });
    builder.addCase(NumberLikePost.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(NumberLikePost.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.likesNumer = action.payload;
    });
    builder.addCase(postMyLike.rejected, setError);
    builder.addCase(resultLike.rejected, setError);
    builder.addCase(NumberLikePost.rejected, setError);
  },
});

export const { setLikes, setIsLiked } = LikesSlice.actions;

export const likesReducer =  LikesSlice.reducer;