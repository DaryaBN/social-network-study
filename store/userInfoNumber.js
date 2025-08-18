/* eslint-disable */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const UserInfoPost = createAsyncThunk(
	"infoNumber/messNumber",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("/NumberUserPosts");
			if (!response.ok) {
				throw new Error("Server Error!");
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const someUserInfoPost = createAsyncThunk(
	"infoNumber/someMessNumber",
	async (someUser, { rejectWithValue }) => {
		try {
			const response = await fetch("/someNumberUserPosts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(someUser),
			});
			if (response.ok) {
				const data = await response.json();
				return data;
			} else if (!response.ok) {
				throw new Error("Can add task. Server error.");
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

const setError = (state, action) => {
	state.status = "rejected";
	state.error = action.payload;
};

const userInfoNumberSlice = createSlice({
	name: "infoNumber",
	initialState: {
		informationUser: [
			{
				post: 0,
				follower: 0,
				following: 0,
			},
		],
		status: null,
		error: null,
	},
	extraReducers: (builder) => {
		builder.addCase(UserInfoPost.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(UserInfoPost.fulfilled, (state, action) => {
			state.status = "resolved";
			state.informationUser[0].post = action.payload.post;
			state.informationUser[0].follower = action.payload.subscribers;
			state.informationUser[0].following = action.payload.subscriptions;
		});
		builder.addCase(someUserInfoPost.pending, (state, _action) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(someUserInfoPost.fulfilled, (state, action) => {
			state.status = "resolved";
			state.informationUser[0].post = action.payload.post;
			state.informationUser[0].follower = action.payload.subscribers;
			state.informationUser[0].following = action.payload.subscriptions;
		});
		builder.addCase(UserInfoPost.rejected, setError);
		builder.addCase(someUserInfoPost.rejected, setError);
	},
});

export default userInfoNumberSlice.reducer;
