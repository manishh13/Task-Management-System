// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  isLogin: false,
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setIsAdmin, setIsLogin, setUser } = userSlice.actions;

export default userSlice.reducer;
