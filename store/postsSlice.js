/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postContent = createAsyncThunk(
	'counter/postContent',
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch('/posts');
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

export const NewPostContent = createAsyncThunk(
	'counter/NewPostContent',
	async function ({ tx,im },{ rejectWithValue, dispatch }) {
		try {
			const postMes = {
				mes: tx,
				img: im,
			}
			let response = await fetch('/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(postMes)
			});
			if (response.ok) { 
				const mes = await fetch('/postsHome');
				const data = await mes.json();
				dispatch(addPosts(data[0]));
			} else if (!response.ok){
				throw new Error("Can add task. Server error.")
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

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    posts: [],
		status: null,
		error: null,
  },
  reducers: {
    addPosts(state, action) {
      state.posts.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
		builder.addCase(postContent.pending, (state) => {
			state.status = 'loading';
			state.error = null;
		});
		builder.addCase(postContent.fulfilled, (state, action) => {
			state.status = 'resolved';
			state.posts = action.payload;
		});
		builder.addCase(NewPostContent.pending, (state) => {
			state.status = 'loading';
			state.error = null;
		});
		builder.addCase(NewPostContent.fulfilled, (state) => {
			state.status = 'resolved';
		});
		builder.addCase(postContent.rejected, setError);
		builder.addCase(NewPostContent.rejected, setError);
	},
});

export const { addPosts } = counterSlice.actions;

export default counterSlice.reducer;
