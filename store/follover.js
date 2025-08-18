import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userFollowers = createAsyncThunk(
	"follovers/userFollowers",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("/userFollowers");
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

export const userFollowing = createAsyncThunk(
	"follovers/userFollowing",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("/userFollowing");
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

export const someUserFollowers = createAsyncThunk(
	"follovers/someUserFollowers",
	async (id, { rejectWithValue }) => {
		try {
			const response = await fetch("/someUserFollowers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(id),
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

export const someUserFollowing = createAsyncThunk(
	"follovers/someUserFollowing",
	async (id, { rejectWithValue }) => {
		try {
			const response = await fetch("/someUserFollowing", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(id),
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

const FolloverList = createSlice({
	name: "follovers",
	initialState: {
		folloversUser: [],
		status: null,
		error: null,
	},
	extraReducers: (builder) => {
		builder.addCase(userFollowers.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(userFollowers.fulfilled, (state, action) => {
			state.status = "resolved";
			state.folloversUser = action.payload;
		});
		builder.addCase(userFollowers.rejected, (state, action) => {
			state.status = "rejected";
			state.error = action.payload;
		});
		builder.addCase(userFollowing.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(userFollowing.fulfilled, (state, action) => {
			state.status = "resolved";
			state.folloversUser = action.payload;
		});
		builder.addCase(userFollowing.rejected, (state, action) => {
			state.status = "rejected";
			state.error = action.payload;
		});
		builder.addCase(someUserFollowers.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(someUserFollowers.fulfilled, (state, action) => {
			state.status = "resolved";
			state.folloversUser = action.payload;
		});
		builder.addCase(someUserFollowers.rejected, (state, action) => {
			state.status = "rejected";
			state.error = action.payload;
		});
		builder.addCase(someUserFollowing.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(someUserFollowing.fulfilled, (state, action) => {
			state.status = "resolved";
			state.folloversUser = action.payload;
		});
		builder.addCase(someUserFollowing.rejected, (state, action) => {
			state.status = "rejected";
			state.error = action.payload;
		});
	},
});

export const folloversReducer = FolloverList.reducer;
