import {configureStore} from '@reduxjs/toolkit';
import productReducer from "../redux/product/productSlice.js";

export const store = configureStore({
    reducer: {
        productStore: productReducer
    }
})