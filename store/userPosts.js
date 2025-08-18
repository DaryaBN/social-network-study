import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userContent = createAsyncThunk(
	"userPostSlice/userPostContent",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("/UserPosts");
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

export const someUserContent = createAsyncThunk(
	"userPostSlice/somePostContent",
	async (someUser, { rejectWithValue }) => {
		try {
			const response = await fetch("/someUserPost", {
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

const userPostSlice = createSlice({
	name: "userPost",
	initialState: {
		posts: [],
		status: null,
		error: null,
	},
	extraReducers: (builder) => {
		builder.addCase(userContent.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(userContent.fulfilled, (state, action) => {
			state.status = "resolved";
			state.posts = action.payload;
		});
		builder.addCase(userContent.rejected, (state, action) => {
			state.status = "rejected";
			state.error = action.payload;
		});
		builder.addCase(someUserContent.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(someUserContent.fulfilled, (state, action) => {
			state.status = "resolved";
			state.posts = action.payload;
		});
		builder.addCase(someUserContent.rejected, (state, action) => {
			state.status = "rejected";
			state.error = action.payload;
		});
	},
});

export default userPostSlice.reducer;
