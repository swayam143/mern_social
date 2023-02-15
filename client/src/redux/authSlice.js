import { createSlice } from "@reduxjs/toolkit";
import StoredVariables, {
  ClearSession,
  GetSession,
  SetSession,
} from "../constant/Session";
import { SECURED, UNSECURED } from "../constant/Util";

const initialState = {
  userData: GetSession(StoredVariables.logindata) || null,
  searchUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLogin: (state, action) => {
      state.userData = SECURED(action.payload);
      SetSession(StoredVariables.logindata, SECURED(action.payload));
    },
    followsUser: (state, action) => {
      const data = action.payload;
      let newUserData = { ...UNSECURED(state.userData) };

      const findFollowing = newUserData.user.following.findIndex(
        (item) => item._id === data._id
      );
      // console.log(findFollowing);
      if (findFollowing !== -1) {
        newUserData.user = {
          ...newUserData.user,
          following: newUserData.user.following.filter(
            (x) => x._id !== data._id
          ),
        };
      } else {
        newUserData.user = {
          ...newUserData.user,
          following: [...newUserData.user.following, data],
        };
      }
      state.userData = SECURED(newUserData);
    },
    savedPosts: (state, action) => {
      const data = action.payload;
      let newUserData = { ...UNSECURED(state.userData) };

      const findsavedPost = newUserData.user.saved.findIndex(
        (item) => item._id === data._id
      );
      // console.log(findFollowing);
      if (findsavedPost !== -1) {
        newUserData.user = {
          ...newUserData.user,
          saved: newUserData.user.saved.filter((x) => x._id !== data._id),
        };
      } else {
        newUserData.user = {
          ...newUserData.user,
          saved: [...newUserData.user.saved, data],
        };
      }
      state.userData = SECURED(newUserData);
    },
    logoutUser: (state) => {
      ClearSession();
      state.userData = null;
    },
    searchUsers: (state, action) => {
      state.searchUser = action.payload;
    },
    nullSearchUser: (state) => {
      state.searchUser = null;
    },
  },
});

export const {
  isLogin,
  logoutUser,
  searchUsers,
  nullSearchUser,
  followsUser,
  savedPosts,
} = authSlice.actions;

export default authSlice.reducer;
