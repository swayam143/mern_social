import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: null,
};

export const userPostSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    getuserPost: (state, action) => {
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

export const { getuserPost } = userPostSlice.actions;

export default userPostSlice.reducer;
