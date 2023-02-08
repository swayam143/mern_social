import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  disoverPost: null,
  indexV: null,
};

export const discoverpostSlice = createSlice({
  name: "disoverPost",
  initialState,
  reducers: {
    discoverPost: (state, action) => {
      state.disoverPost = action.payload;
    },
  },
});

export const { discoverPost } = discoverpostSlice.actions;

export default discoverpostSlice.reducer;
