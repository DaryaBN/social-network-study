import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postMyLike = createAsyncThunk(
  'postLikes/postMyLike',
  async function ({ id }, { rejectWithValue }) {
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
      return { id, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const resultLike = createAsyncThunk(
  'postLikes/resultLike',
  async function ({ id },{ rejectWithValue, dispatch }) {
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
        dispatch(toggleLike({ id, data }));
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
        return { id, count: data };
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
    likesData: {},
    status: null,
    error: null,
  },
  reducers: {
    toggleLike(state, action) {
      const { id } = action.payload;
      if (!state.likesData[id]) {
        state.likesData[id] = {
          likesNumber: 0,
          likesStatus: false,
        };
      }
      const current = state.likesData[id];
      if (current.likesStatus) {
        current.likesStatus = false;
        current.likesNumber -= 1;
      } else {
        current.likesStatus = true;
        current.likesNumber += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postMyLike.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(postMyLike.fulfilled, (state, action) => {
      state.status = 'resolved';
      const { id, data } = action.payload;
      if (!state.likesData[id]) {
        if (data === 'yes') {
          state.likesData[id] = {
            likesNumber: 0,
            likesStatus: true,
          };
        } else if (data === 'no') {
          state.likesData[id] = {
            likesNumber: 0,
            likesStatus: false,
          };
        }
      } else {
        if (data === 'yes') {
          state.likesData[id].likesStatus = true;
        } else if (data === 'no') {
          state.likesData[id].likesStatus = false;
        };
      }
    });
    builder.addCase(resultLike.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(resultLike.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(NumberLikePost.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(NumberLikePost.fulfilled, (state, action) => {
      state.status = 'resolved';
      const { id, count } = action.payload;
      if (!state.likesData[id]) {
        state.likesData[id] = {
          likesNumber: count,
          likesStatus: false,
        };
      } else {
        state.likesData[id].likesNumber = count;
      }
    });
    builder.addCase(postMyLike.rejected, setError);
    builder.addCase(resultLike.rejected, setError);
    builder.addCase(NumberLikePost.rejected, setError);
  },
});

export const { toggleLike } = LikesSlice.actions;
export const likesReducer =  LikesSlice.reducer;
