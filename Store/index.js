import { configureStore } from "@reduxjs/toolkit";
import bookedTableReducer from "../Store/bookedTable-ui";
import ProductDetailsReducer from "./productDetails-ui";
import cartReducer_ui from "./cart_ui";
import cartReducer from "./cart";
import accountReducer from './account'
import categoryReducer from './category'
const store = configureStore({
  reducer: {
    bookedTable_ui: bookedTableReducer,
    productDetails_ui: ProductDetailsReducer,
    cart_ui:cartReducer_ui,
    cart:cartReducer,
    account:accountReducer,
    category:categoryReducer
  },
});

export default store;
