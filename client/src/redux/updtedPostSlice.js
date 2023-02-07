import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updtedPosts: [],
};

export const updatedSlice = createSlice({
  name: "updtedPost",
  initialState,
  reducers: {
    likeUpdatedPost: (state, action) => {},
  },
});

export const { likeUpdatedPost } = updatedSlice.actions;

export default updatedSlice.reducer;
