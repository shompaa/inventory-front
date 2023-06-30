import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { authSlice } from "./auth";
import { modalSlice } from "./shared";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export const useUser = () => useSelector((state) => state.auth);
export const useModal = () => useSelector((state) => state.modal);
