import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import particularPostSlice from "./particularPostSlice";
import postSlice from "./postSlice";
import updatedSlice from "./updtedPostSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    prticularPost: particularPostSlice,
    updatedPost: updatedSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
