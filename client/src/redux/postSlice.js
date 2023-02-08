import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: null,
  indexV: null,
};

export const postSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {
    getAllPost: (state, action) => {
      state.allPosts = action.payload;
      // const newPost = [...action.payload];
      // const checkedArray = newPost.map((x, i) => {
      //   x.comments[i] = {
      //     ...x.comments[i],
      //     reply: [],
      //   };
      //   return x;
      // });
      // state.allPosts = checkedArray;
    },
    addNewPost: (state, action) => {
      state.allPosts = [...state.allPosts, action.payload];
    },
  },
});

export const { getAllPost, addNewPost } = postSlice.actions;

export default postSlice.reducer;
