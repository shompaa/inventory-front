import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  saleCreated: false,
}

export const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    saleCreated: (state) => {
      state.saleCreated = true
    },
    saleReset: (state) => {
      state.saleCreated = false
    },
  },
})

export const { saleCreated, saleReset } = salesSlice.actions
