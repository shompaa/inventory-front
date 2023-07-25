import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  productCreated: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productList: (state, action) => {
      state.data = action.payload;
    },
    productCreated: (state) => {
      state.productCreated = true;
    },
    productReset: (state) => {
      state.productCreated = false;
    },
  },
});

export const { productList, productCreated, productReset } =
  productsSlice.actions;
