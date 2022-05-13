//Redux
import { combineReducers, configureStore } from "@reduxjs/toolkit";
//Slices
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import newProductReducer from "./newProductSlice";
//Quelle: https://github.com/kuehnert/2021-informatik-pk

//Reducer
export const rootReducer = combineReducers({
  products: productReducer,
  user: userReducer,
  newProduct: newProductReducer,
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
});

export default store;
