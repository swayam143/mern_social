import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: null,
};

export const postSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {
    getAllPost: (state, action) => {
      state.allPosts = action.payload;
    },
    addNewPost: (state, action) => {
      state.allPosts = [...state.allPosts, action.payload];
    },
  },
});

export const { getAllPost, addNewPost } = postSlice.actions;

export default postSlice.reducer;
