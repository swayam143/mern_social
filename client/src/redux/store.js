import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import discoverPostsSlice from "./discoverPostsSlice";
import particularPostSlice from "./particularPostSlice";
import postSlice from "./postSlice";
import savedPostSlice from "./savedPostSlice";
import socketSlice from "./socketSlice";
import updatedSlice from "./updtedPostSlice";
import userPostSlice from "./userPostSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    prticularPost: particularPostSlice,
    updatedPost: updatedSlice,
    discoverPost: discoverPostsSlice,
    userPost: userPostSlice,
    savedPost: savedPostSlice,
    socket: socketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
