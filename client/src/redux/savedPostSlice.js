import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedPost: null,
  noPost: false,
  morePage: 2,
};

export const savedpostSlice = createSlice({
  name: "savedPost",
  initialState,
  reducers: {
    getsavedPosts: (state, action) => {
      state.savedPost = action.payload;
    },
    addmoreSavedPost: (state, action) => {
      state.savedPost = [...state.savedPost, ...action.payload];
    },
    noMoresavedPost: (state, action) => {
      state.noPost = true;
      state.morePage = state.morePage - 1;
    },
    savedpaginationTrue: (state, action) => {
      state.noPost = false;
    },
    moreSavedPage: (state, action) => {
      state.morePage = state.morePage + 1;
    },
    savedPosts: (state, action) => {
      if (state.savedPost !== null) {
        const findsavedPost = state.savedPost.findIndex(
          (item) => item._id === action.payload._id
        );
        if (findsavedPost !== -1) {
          state.savedPost = state.savedPost.filter(
            (x) => x._id !== action.payload._id
          );
        } else {
          state.savedPost = [...state.savedPost, action.payload];
        }
      } else {
        state.savedPost = [action.payload];
      }
    },
  },
});

export const {
  getsavedPosts,
  addmoreSavedPost,
  noMoresavedPost,
  savedpaginationTrue,
  savedPosts,
  moreSavedPage,
} = savedpostSlice.actions;

export default savedpostSlice.reducer;
