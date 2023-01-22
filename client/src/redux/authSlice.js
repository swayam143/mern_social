import { createSlice } from "@reduxjs/toolkit";
import { Success } from "../components/toast/Toasts";
import StoredVariables, {
  ClearSession,
  GetSession,
  SetSession,
} from "../constant/Session";
import { SECURED } from "../constant/Util";

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
      Success(action.payload.msg);
      SetSession(StoredVariables.logindata, SECURED(action.payload));
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

export const { isLogin, logoutUser, searchUsers, nullSearchUser } =
  authSlice.actions;

export default authSlice.reducer;
