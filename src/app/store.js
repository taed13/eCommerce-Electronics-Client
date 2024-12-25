import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import blogReducer from "../features/blogs/blogSlice";
import contactReducer from "../features/contact/contactSlice";
import bCategoryReducer from "../features/bCategory/bCategorySlice";
import pCategoryReducer from "../features/pCategory/pCategorySlice";
import discountReducer from "../features/discount/discountSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        blog: blogReducer,
        contact: contactReducer,
        counter: counterReducer,
        bCategory: bCategoryReducer,
        pCategory: pCategoryReducer,
        discount: discountReducer,
    },
});
