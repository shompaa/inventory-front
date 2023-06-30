import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';
import { authSlice } from './auth'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const useUser = () => useSelector((state) => state.auth);