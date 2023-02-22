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
  },
});

export const {
  getsavedPosts,
  addmoreSavedPost,
  noMoresavedPost,
  savedpaginationTrue,
  //   nullDiscoverPost,
  moreSavedPage,
} = savedpostSlice.actions;

export default savedpostSlice.reducer;
