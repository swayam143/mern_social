import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: null,
  indexV: null,
  morehomePages: 2,
  noHomePost: false,
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
    moreHomePage: (state, action) => {
      state.morehomePages = state.morehomePages + 1;
    },
    noMoreaddHomePost: (state, action) => {
      state.noHomePost = true;
      state.morehomePages = state.morehomePages - 1;
    },
    addHomePost: (state, action) => {
      state.allPosts = [...state.allPosts, ...action.payload];
    },
    HpaginationTrue: (state, action) => {
      state.noHomePost = false;
    },
  },
});

export const {
  getAllPost,
  addNewPost,
  moreHomePage,
  noMoreaddHomePost,
  addHomePost,
  HpaginationTrue,
} = postSlice.actions;

export default postSlice.reducer;
