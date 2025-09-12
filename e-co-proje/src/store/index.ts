// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// types for use in app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
