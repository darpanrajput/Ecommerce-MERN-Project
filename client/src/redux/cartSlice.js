import { createSlice } from "@reduxjs/toolkit";
const cardSlice = createSlice({
  name: "cart",

  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    userId: "ramdom user id",
    isFetching: false,
    error: false
  },

  reducers: {
    //ADD PRODUCT TO THE CART
    addProduct: (state, action) => {
      state.userId = action.payload.userId;
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.qty;
    },

    //DELETE SINGLE PRODUCR IN THE CART BY ITS ID
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      const i = state.products.findIndex((item) => item._id === action.payload);
      state.total -= state.products[i].price * state.products[i].qty;

      state.quantity -= 1;

      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );

      state.userId = null;
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //EMPTY THE CART PRDUCTS BY DELETING EVERYTHING & SETTING EVERYTHING BACK TO NORMAL
    deleteCartStart: (state) => {
      state.isFetching = true;
      state.error = false;

    },
    deleteCartSuccess: (state) => {
      state.products = [];
      state.isFetching = false;
      state.error = false;
      state.userId = "EMPTY STRING";
      state.quantity = 0;
      state.total = 0;
    },
    deleteCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  addProduct,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,

  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure,

} = cardSlice.actions;
export default cardSlice.reducer;
