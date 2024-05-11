import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import blogReducer from "../features/blogs/blogSlice";
import contactReducer from "../features/contact/contactSlice";
import axios from "axios";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    contact: contactReducer,
    counter: counterReducer,
  },
});
