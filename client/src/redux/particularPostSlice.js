import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Post: null,
};

export const particularPostSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    getPost: (state, action) => {
      state.Post = action.payload;
    },
  },
});

export const { getPost } = particularPostSlice.actions;

export default particularPostSlice.reducer;
