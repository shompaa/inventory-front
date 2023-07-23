import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productCreated: false,
}

export const productsSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    productCreated: (state) => {
      state.productCreated = true
    },
    productReset: (state) => {
      state.productCreated = false
    },
  },
})

export const { productCreated, productReset } = productsSlice.actions
