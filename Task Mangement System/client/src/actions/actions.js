import { setIsAdmin, setIsLogin, setUser } from "../Slices/AuthSlice";

export const setAdminStatus = (isAdmin) => (dispatch) => {
  dispatch(setIsAdmin(isAdmin));
};

export const setLoginStatus = (isLogin) => (dispatch) => {
  dispatch(setIsLogin(isLogin));
};

export const setUserDetails = (user) => (dispatch) => {
  dispatch(setUser(user));
};
