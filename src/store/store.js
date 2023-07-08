import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { authSlice } from "./auth";
import { modalSlice } from "./shared";
import { salesSlice } from "./sales/salesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
    sales: salesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["modal/openModal"],
        ignoredPaths: ["modal.modalProps.ModalContent"],
      },
    }),
});

export const useUser = () => useSelector((state) => state.auth);
export const useModal = () => useSelector((state) => state.modal);
export const useSales = () => useSelector((state) => state.sales);
