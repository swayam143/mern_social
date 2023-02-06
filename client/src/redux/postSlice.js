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
    deletePosts: (state, action) => {
      state.allPosts = state.allPosts.filter(
        (item) => parseInt(item._id) !== parseInt(action.payload._id)
      );
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
    deleteComments: (state, action) => {
      const allPost = [...state.allPosts];
      // console.log(action.payload);

      allPost[action.payload.findpostIndex] = {
        ...allPost[action.payload.findpostIndex],
        comments: allPost[action.payload.findpostIndex].comments.filter(
          (item) => item._id !== action.payload.data._id
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
    //
    likeComment: (state, action) => {
      const allPost = [...state.allPosts];
      const checkedArray = allPost.map((x) => {
        const valuesChangeCheck = x._id === action.payload.postId;

        if (valuesChangeCheck) {
          const findIndex = x.comments.findIndex(
            (item) => item._id === action.payload.data._id
          );
          // console.log(user, x.comments);
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

            // console.log(clonedObject);

            // clonedObject = { ...clonedObject, content: "value" };
          }
        }

        return x;
      });

      state.allPosts = checkedArray;
    },
    upDateComment: (state, action) => {
      const allPost = [...state.allPosts];
      const checkedArray = allPost.map((x) => {
        const valuesChangeCheck = x._id === action.payload.postId;

        if (valuesChangeCheck) {
          const findIndex = x.comments.findIndex(
            (item) => item._id === action.payload.data._id
          );
          // console.log(user, x.comments);
          if (findIndex !== -1) {
            x.comments[findIndex] = {
              ...x.comments[findIndex],
              content: action.payload.content,
            };

            // console.log(clonedObject);

            // clonedObject = { ...clonedObject, content: "value" };
          }
        }

        return x;
      });

      state.allPosts = checkedArray;
    },
    upDateReplyComment: (state, action) => {
      const allPost = [...state.allPosts];
      const checkedArray = allPost.map((x) => {
        const valuesChangeCheck = x._id === action.payload.postId;

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

      state.allPosts = checkedArray;
    },
    replyComments: (state, action) => {
      const allPost = [...state.allPosts];
      const checkedArray = allPost.map((x) => {
        const valuesChangeCheck = x._id === action.payload.postId;

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
                  frontendId: action.payload.frontendId,
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

      state.allPosts = checkedArray;
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
  deletePosts,
  likedReply,
  likeComment,
  upDateComment,
  replyComments,
  deleteComments,
  upDateReplyComment,
} = postSlice.actions;

export default postSlice.reducer;
