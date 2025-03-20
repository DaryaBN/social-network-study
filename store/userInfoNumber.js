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
        // builder.addCase(correctionUserInfo.pending, (state, action) => {
        //     state.status = 'loading';
        //     state.error = null;
        // });
        // builder.addCase(correctionUserInfo.fulfilled, (state, action) => {
        //     state.text = action.payload;
        //     state.status = 'resolved';
        // });
        builder.addCase(UserInfoPost.rejected, setError);
        // builder.addCase(correctionUserInfo.rejected, setError);
    },
});


export default userInfoNumberSlice.reducer;