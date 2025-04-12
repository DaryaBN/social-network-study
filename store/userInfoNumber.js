/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const UserInfoPost = createAsyncThunk(
	'infoNumber/messNumber',
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch('/NumberUserPosts');
			if (!response.ok) {
				throw new Error('Server Error!');
			}
			const data = await response.json();
			return data[0].count;
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
);

export const someUserInfoPost = createAsyncThunk(
	'infoNumber/someMessNumber',
	async function (someUser, { rejectWithValue, dispatch }) {
		try {
			let response = await fetch('/someNumberUserPosts', {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(someUser),
			  });
			if (response.ok) {
				const data = await response.json()
				return data[0].count;
			} else if (!response.ok){
				throw new Error("Can add task. Server error.")
			}
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
);

const setError = (state, action) => {
	state.status = 'rejected';
	state.error = action.payload;
};

const userInfoNumberSlice = createSlice({
  name: 'infoNumber',
  initialState: {
    informationUser : [{
        post: 0,
        follower: 0,
        following:0
        }],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
        builder.addCase(UserInfoPost.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(UserInfoPost.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.informationUser[0].post = action.payload;
        });
        builder.addCase(someUserInfoPost.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(someUserInfoPost.fulfilled, (state, action) => {
            state.status = 'resolved';
						state.informationUser[0].post = action.payload;
        });
        builder.addCase(UserInfoPost.rejected, setError);
        builder.addCase(someUserInfoPost.rejected, setError);
    },
});


export default userInfoNumberSlice.reducer;