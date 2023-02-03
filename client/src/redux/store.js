import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import particularPostSlice from "./particularPostSlice";
import postSlice from "./postSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    prticularPost: particularPostSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
