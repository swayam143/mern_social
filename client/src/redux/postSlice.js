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
    },
    addNewPost: (state, action) => {
      state.allPosts = [...state.allPosts, action.payload];
    },
    updatePost: (state, action) => {
      const findpostInd = state.allPosts.findIndex(
        (item) => item._id === action.payload._id
      );
      const allPost = [...state.allPosts];

      allPost[findpostInd] = {
        ...allPost[findpostInd],
        content: action.payload.content,
        picture: action.payload.picture,
      };

      state.allPosts = allPost;
    },
    likePost: (state, action) => {
      const allPost = [...state.allPosts];
      // console.log(action.payload);

      allPost[action.payload.findpostIndex] = {
        ...allPost[action.payload.findpostIndex],
        likes: [
          ...allPost[action.payload.findpostIndex].likes,
          action.payload.user,
        ],
      };

      state.allPosts = allPost;
    },
    unlikePost: (state, action) => {
      const allPost = [...state.allPosts];
      // console.log(action.payload);

      allPost[action.payload.findpostIndex] = {
        ...allPost[action.payload.findpostIndex],
        likes: allPost[action.payload.findpostIndex].likes.filter(
          (item) => item._id !== action.payload.user._id
        ),
      };

      state.allPosts = allPost;
    },
    addComment: (state, action) => {
      const allPost = [...state.allPosts];
      // console.log(action.payload);

      allPost[action.payload.findpostIndex] = {
        ...allPost[action.payload.findpostIndex],
        comments: [
          ...allPost[action.payload.findpostIndex].comments,
          action.payload.newComment,
        ],
      };

      state.allPosts = allPost;
    },
    likedReply: (state, action) => {
      const allPost = [...state.allPosts];
      // console.log(action.payload);

      allPost[action.payload.findpostIndex] = {
        ...allPost[action.payload.findpostIndex],
        likes: [
          ...allPost[action.payload.findpostIndex].likes,
          action.payload.user,
        ],
      };

      state.allPosts = allPost;
    },
  },
});

export const {
  getAllPost,
  addNewPost,
  updatePost,
  likePost,
  unlikePost,
  addComment,
  likedReply,
} = postSlice.actions;

export default postSlice.reducer;
