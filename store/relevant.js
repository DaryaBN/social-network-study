import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const hashtagApp = createAsyncThunk(
  'hashtag/hashtagApp',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('/top');
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    };
  },
);

const hashtagList = createSlice({
  name: 'hashtag',
  initialState : {
    hashtagTop: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(hashtagApp.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(hashtagApp.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.hashtagTop = action.payload;
    });
    builder.addCase(hashtagApp.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const hashtagReducer = hashtagList.reducer;
