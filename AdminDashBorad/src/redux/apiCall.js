import { publicRequest, userRequest } from "../requestMethod";
import { loginSuccess, loginStart, loginFailure } from "./userSlice";
import { logoutSuccess, logoutStart, logoutFailure } from "./userSlice";

import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productSlice";

function checkProducts() {
  const p = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).product
  ).products;
  // console.log(p);
  if (p && !p.length) {
    // the array is defined and has no elements
    return false;
  } else {
    return true;
  }
}

// console.log(checkProducts());

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


//LOGOUT THE USER
export const logout = async (dispatch) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
};



export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  let res;
  try {
    res = await userRequest.get("/products/findProducts");

    // console.log(res.data);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

//DELETE THE REDUX STOED PRODUCTS
export const deleteProducts = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    // console.log(res.data);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

//UPDATE THE PRODUCTS IN REDUX STOED
export const updateProducts = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    dispatch(updateProductSuccess({ id: id, product: product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

//ADD THE PRODUCTS IN REDUX STORE
export const addProducts = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
