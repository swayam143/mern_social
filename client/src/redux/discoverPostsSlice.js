import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  disoverPost: null,
  noPost: false,
  moreDiscoverPage: 2,
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
      state.moreDiscoverPage = state.moreDiscoverPage - 1;
    },
    DpaginationTrue: (state, action) => {
      state.noPost = false;
    },
    moreDiscoverPage: (state, action) => {
      state.moreDiscoverPage = state.moreDiscoverPage + 1;
    },
  },
});

export const {
  discoverPost,
  adddiscoverPost,
  noMoreadddiscoverPost,
  DpaginationTrue,
  nullDiscoverPost,
  moreDiscoverPage,
} = discoverpostSlice.actions;

export default discoverpostSlice.reducer;
