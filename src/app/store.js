import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import axios from "axios";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    counter: counterReducer,
  },
});
