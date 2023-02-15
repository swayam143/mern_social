import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: null,
  moreUserPage: 2,
  noUserPost: false,
};

export const userPostSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    getuserPost: (state, action) => {
      state.allPosts = action.payload;
    },
    addNewPost: (state, action) => {
      state.allPosts = [...state.allPosts, action.payload];
    },
    moreUserPage: (state, action) => {
      state.moreUserPage = state.moreUserPage + 1;
    },
    noMoreaddUserPost: (state, action) => {
      state.noUserPost = true;
      state.moreUserPage = state.moreUserPage - 1;
    },
    addUserPost: (state, action) => {
      state.allPosts = [...state.allPosts, ...action.payload];
    },
    UpaginationTrue: (state, action) => {
      state.noUserPost = false;
      state.moreUserPage = 2;
    },
  },
});

export const {
  getuserPost,
  moreUserPage,
  noMoreaddUserPost,
  addUserPost,
  UpaginationTrue,
} = userPostSlice.actions;

export default userPostSlice.reducer;
