import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  disoverPost: null,
  noPost: false,
};

export const discoverpostSlice = createSlice({
  name: "disoverPost",
  initialState,
  reducers: {
    discoverPost: (state, action) => {
      state.disoverPost = action.payload;
    },
    adddiscoverPost: (state, action) => {
      state.disoverPost = [...state.disoverPost, ...action.payload];
    },
    noMoreadddiscoverPost: (state, action) => {
      state.noPost = true;
    },
    paginationTrue: (state, action) => {
      state.noPost = false;
    },
  },
});

export const {
  discoverPost,
  adddiscoverPost,
  noMoreadddiscoverPost,
  paginationTrue,
} = discoverpostSlice.actions;

export default discoverpostSlice.reducer;
