// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/Productslice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

// types for use in app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
