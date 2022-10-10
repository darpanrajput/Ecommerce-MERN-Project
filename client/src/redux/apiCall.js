import { publicRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import { logoutFailure, logoutStart, logoutSuccess } from "./userSlice";
import {
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,

  deleteCartFailure,
  deleteCartStart,
  deleteCartSuccess,
} from "./cartSlice";

// LOGIN THE USER
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    // console.log(res.data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// REGISTER THE USER AND SAVE LOGIN REDUCER
export const register = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    // console.log(res.data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};


//LOGOUT

export const logout = async (dispatch) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
};

//DELETE THE REDUX STOED CART PRODUCTS BY ITS ID 
export const deleteProducts = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};


//DELETE THE REDUX STOED CART PRODUCTS BY ITS ID 
export const deleteCartProducts = (dispatch) => {
  dispatch(deleteCartStart());
  try {
    dispatch(deleteCartSuccess());
  } catch (err) {
    dispatch(deleteCartFailure());
  }
};
