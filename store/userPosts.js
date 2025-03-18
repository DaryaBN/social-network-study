/*eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userContent = createAsyncThunk(
	'userPostSlice/postContent',
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch('/UserPosts');
			if (!response.ok) {
				throw new Error('Server Error!');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
);

const userPostSlice = createSlice({
  name: 'userPost',
  initialState: {
    posts: [],
		status: null,
		error: null,
  },
  extraReducers: (builder) => {
		builder.addCase(userContent.pending, (state) => {
			state.status = 'loading';
			state.error = null;
		});
		builder.addCase(userContent.fulfilled, (state, action) => {
			state.status = 'resolved';
			state.posts = action.payload;
		});
		builder.addCase(userContent.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
	},
});

export default userPostSlice.reducer;
