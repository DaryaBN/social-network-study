/* eslint-disable */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userInfo = createAsyncThunk(
	"info/userInfo",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("/feedUser");
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
export const correctionUserInfo = createAsyncThunk(
	"info/correctionUserInfo",
	async (userInf, { rejectWithValue }) => {
		try {
			const response = await fetch("/userInfo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(userInf),
			});
			if (response.ok) {
				return await response.text();
			} else if (!response.ok) {
				throw new Error("Can add task. Server error.");
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const someUserInfo = createAsyncThunk(
	"userPostSlice/somePostInfo",
	async (someId, { rejectWithValue }) => {
		try {
			const response = await fetch("/someUserInfo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(someId),
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

const userInfoSlice = createSlice({
	name: "info",
	initialState: {
		user: [],
		status: null,
		error: null,
	},
	extraReducers: (builder) => {
		builder.addCase(userInfo.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(userInfo.fulfilled, (state, action) => {
			state.status = "resolved";
			state.user = action.payload;
		});
		builder.addCase(correctionUserInfo.pending, (state, _action) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(correctionUserInfo.fulfilled, (state, action) => {
			state.text = action.payload;
			state.status = "resolved";
		});
		builder.addCase(userInfo.rejected, setError);
		builder.addCase(correctionUserInfo.rejected, setError);
		builder.addCase(someUserInfo.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(someUserInfo.fulfilled, (state, action) => {
			state.status = "resolved";
			state.user = action.payload;
		});
		builder.addCase(someUserInfo.rejected, setError);
	},
});

export default userInfoSlice.reducer;
