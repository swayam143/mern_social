import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Post: null,
};

export const particularPostSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    getPost: (state, action) => {
      state.Post = action.payload;
    },
    updateParticularPost: (state, action) => {
      state.Post = {
        ...state.Post,
        content: action.payload.content,
        picture: action.payload.picture,
      };
    },
    unlikeParticularPost: (state, action) => {
      state.Post = {
        ...state.Post,
        likes: state.Post.likes.filter(
          (item) => item._id !== action.payload.user._id
        ),
      };
    },
    likeParticularPost: (state, action) => {
      state.Post = {
        ...state.Post,
        likes: [...state.Post.likes, action.payload.user],
      };
    },
    addParticularPostComment: (state, action) => {
      state.Post = {
        ...state.Post,
        comments: [action.payload.newComment, ...state.Post.comments],
      };
    },
    likeParticularPostComment: (state, action) => {
      const findIndex = state.Post.comments.findIndex(
        (item) => item._id === action.payload.data._id
      );
      if (findIndex !== -1) {
        const isLikeExist = state.Post.comments[findIndex].likes.find(
          (item) => item._id === action.payload.user._id
        );
        if (isLikeExist) {
          state.Post.comments[findIndex] = {
            ...state.Post.comments[findIndex],
            likes: [
              ...state.Post.comments[findIndex].likes.filter(
                (item) => item._id !== action.payload.user._id
              ),
            ],
          };
        } else {
          state.Post.comments[findIndex] = {
            ...state.Post.comments[findIndex],
            likes: [
              ...state.Post.comments[findIndex].likes,
              action.payload.user,
            ],
          };
        }
      }
    },
    upDateParticularPostComment: (state, action) => {
      const findIndex = state.Post.comments.findIndex(
        (item) => item._id === action.payload.data._id
      );
      if (findIndex !== -1) {
        state.Post.comments[findIndex] = {
          ...state.Post.comments[findIndex],
          content: action.payload.content,
        };
      }
    },
    deleteParticularPostComments: (state, action) => {
      state.Post.comments = [
        ...state.Post.comments.filter(
          (item) => item._id !== action.payload.data._id
        ),
      ];
    },
    replyParticularPostComments: (state, action) => {
      const findIndex = state.Post.comments.findIndex(
        (item) => item._id === action.payload.data._id
      );

      if (findIndex !== -1) {
        state.Post.comments[findIndex] = {
          ...state.Post.comments[findIndex],
          reply: [
            {
              user: action.payload.user,
              content: action.payload.content,
              createdAt: new Date().toISOString(),
              frontendId: action.payload.frontendId,
            },
            ...state.Post.comments[findIndex].reply,
          ],
        };

        // console.log(clonedObject);

        // clonedObject = { ...clonedObject, content: "value" };
      }
    },
  },
});

export const {
  getPost,
  updateParticularPost,
  unlikeParticularPost,
  likeParticularPost,
  addParticularPostComment,
  likeParticularPostComment,
  upDateParticularPostComment,
  deleteParticularPostComments,
  replyParticularPostComments,
} = particularPostSlice.actions;

export default particularPostSlice.reducer;
