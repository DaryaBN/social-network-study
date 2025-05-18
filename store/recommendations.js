import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const recomm = createAsyncThunk(
  'recommendations/recomm',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('/recommendations');
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


const RecommendationsList = createSlice({
  name: 'recommendations',
  initialState : {
    recommendationsUser: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(recomm.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(recomm.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.recommendationsUser = action.payload;
    });
    builder.addCase(recomm.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const recommendationsReducer = RecommendationsList.reducer;
