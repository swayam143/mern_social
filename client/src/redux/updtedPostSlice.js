import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_url } from "../constant";

const initialState = {
  updatedPosts: [],
  deletePosts: null,
  savedPost: [],
};

export const updatedSlice = createSlice({
  name: "updtedPost",
  initialState,
  reducers: {
    likeUpdatedPost: (state, action) => {
      const { data, user } = action.payload;

      let newPost = [...state.updatedPosts];

      const findpostIndex = newPost.findIndex((item) => item._id === data._id);
      if (findpostIndex === -1) {
        newPost = [...newPost, data];
      }
      const againfindpostIndex = newPost.findIndex(
        (item) => item._id === data._id
      );

      const IsAlreadyLiked = newPost[againfindpostIndex].likes.findIndex(
        (item) => item._id === user._id
      );

      if (IsAlreadyLiked !== -1) {
        newPost[againfindpostIndex] = {
          ...newPost[againfindpostIndex],
          likes: newPost[againfindpostIndex].likes.filter(
            (item) => item._id !== user._id
          ),
        };
        axios.post(`${Base_url}unlikePost`, {
          userId: user._id,
          postId: data._id,
        });
      } else {
        newPost[againfindpostIndex] = {
          ...newPost[againfindpostIndex],
          likes: [...newPost[againfindpostIndex].likes, user],
        };
        axios.post(`${Base_url}likePost`, {
          userId: user._id,
          postId: data._id,
        });
      }
      state.updatedPosts = newPost;
    },
    updateUpdatedPost: (state, action) => {
      let newPost = [...state.updatedPosts];
      const findpostIndex = newPost.findIndex(
        (item) => item._id === action.payload._id
      );

      if (findpostIndex === -1) {
        newPost = [...newPost, action.payload];
      }

      const findpostInd = newPost.findIndex(
        (item) => item._id === action.payload._id
      );

      newPost[findpostInd] = {
        ...newPost[findpostInd],
        content: action.payload.content,
        picture: action.payload.picture,
      };

      state.updatedPosts = newPost;
    },

    deleteUpdatedComments: (state, action) => {
      const { post } = action.payload;
      let newPost = [...state.updatedPosts];

      const findpostIndex = newPost.findIndex((item) => item._id === post._id);
      if (findpostIndex === -1) {
        newPost = [...newPost, post];
      }
      const againfindpostIndex = newPost.findIndex(
        (item) => item._id === post._id
      );

      newPost[againfindpostIndex] = {
        ...newPost[againfindpostIndex],
        comments: newPost[againfindpostIndex].comments.filter(
          (item) => item._id !== action.payload.data._id
        ),
      };
      state.updatedPosts = newPost;
    },
    addComment: (state, action) => {
      const { newComment, post } = action.payload;
      let newPost = [...state.updatedPosts];

      const findpostIndex = newPost.findIndex((item) => item._id === post._id);
      if (findpostIndex === -1) {
        newPost = [...newPost, post];
      }

      const againfindpostIndex = newPost.findIndex(
        (item) => item._id === post._id
      );

      newPost[againfindpostIndex] = {
        ...newPost[againfindpostIndex],
        comments: [newComment, ...newPost[againfindpostIndex].comments],
      };

      state.updatedPosts = newPost;
    },
    addPostComment: (state, action) => {
      const { post } = action.payload;
      let newPost = [...state.updatedPosts];

      const findpostIndex = newPost.findIndex((item) => item._id === post._id);
      if (findpostIndex === -1) {
        newPost = [...newPost, post];
      }

      state.updatedPosts = newPost;
    },
    likeComment: (state, action) => {
      const allPost = [...state.updatedPosts];
      const checkedArray = allPost.map((x) => {
        const valuesChangeCheck = x._id === action.payload.post._id;

        if (valuesChangeCheck) {
          const findIndex = x.comments.findIndex(
            (item) => item._id === action.payload.data._id
          );
          if (findIndex !== -1) {
            const isLikeExist = x.comments[findIndex].likes.find(
              (item) => item._id === action.payload.user._id
            );

            if (isLikeExist) {
              x.comments[findIndex] = {
                ...x.comments[findIndex],
                likes: [
                  ...x.comments[findIndex].likes.filter(
                    (item) => item._id !== action.payload.user._id
                  ),
                ],
              };
            } else {
              x.comments[findIndex] = {
                ...x.comments[findIndex],
                likes: [...x.comments[findIndex].likes, action.payload.user],
              };
            }
          }
        }

        return x;
      });
      state.updatedPosts = checkedArray;
    },
    upDateComment: (state, action) => {
      const allPost = [...state.updatedPosts];
      const checkedArray = allPost.map((x) => {
        const valuesChangeCheck = x._id === action.payload.post._id;

        if (valuesChangeCheck) {
          const findIndex = x.comments.findIndex(
            (item) => item._id === action.payload.data._id
          );
          //   console.log(findIndex);

          if (findIndex !== -1) {
            x.comments[findIndex] = {
              ...x.comments[findIndex],
              content: action.payload.content,
            };
          }
        }

        return x;
      });

      state.updatedPosts = checkedArray;
    },
    replyComments: (state, action) => {
      const allPost = [...state.updatedPosts];

      const checkedArray = allPost.map((x) => {
        const valuesChangeCheck = x._id === action.payload.post._id;

        if (valuesChangeCheck) {
          const findIndex = x.comments.findIndex(
            (item) => item._id === action.payload.data._id
          );
          // console.log(user, x.comments);
          if (findIndex !== -1) {
            x.comments[findIndex] = {
              ...x.comments[findIndex],
              reply: [
                {
                  user: action.payload.user,
                  content: action.payload.content,
                  createdAt: new Date().toISOString(),
                },
                ...x.comments[findIndex].reply,
              ],
            };

            // console.log(clonedObject);

            // clonedObject = { ...clonedObject, content: "value" };
          }
        }

        return x;
      });

      state.updatedPosts = checkedArray;
    },
    upDateReplyComment: (state, action) => {
      const allPost = [...state.updatedPosts];
      const checkedArray = allPost.map((x) => {
        const valuesChangeCheck = x._id === action.payload.post._id;

        if (valuesChangeCheck) {
          const findIndex = x.comments.findIndex(
            (item) => item._id === action.payload.commentId._id
          );
          // console.log(user, x.comments);
          if (findIndex !== -1) {
            const findContentIndex = x.comments[findIndex].reply.findIndex(
              (y) => y._id === action.payload.data._id
            );
            x.comments[findIndex].reply[findContentIndex] = {
              ...x.comments[findIndex].reply[findContentIndex],
              content: action.payload.content,
            };
          }
        }

        return x;
      });

      state.updatedPosts = checkedArray;
    },
    deletePosts: (state, action) => {
      state.deletePosts = action.payload._id;
    },
  },
});

export const {
  likeUpdatedPost,
  updateUpdatedPost,
  deleteUpdatedComments,
  likeComment,
  addComment,
  upDateComment,
  addPostComment,
  upDateReplyComment,
  replyComments,
  deletePosts,
} = updatedSlice.actions;

export default updatedSlice.reducer;
